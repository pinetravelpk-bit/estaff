#!/usr/bin/env bash
# End-to-end test of ongoing recruitment listings, sharing and reviews against a local server.
# Usage: bash scripts/test-pool-reviews.sh   (server on http://localhost:3999, test data in .data/)
set -u
export MSYS_NO_PATHCONV=1
B=${B:-http://localhost:3999}
cd "$(dirname "$0")/.."
D=.data; A=$D/cj-admin.txt; rm -f $A
ok(){ if [ "$1" = "$2" ]; then echo "  PASS  $3"; else echo "  FAIL  $3 (got '$1', want '$2')"; fi; }
code(){ curl -s -o /dev/null -w "%{http_code}" "$@"; }
get(){ curl -s "$@" | sed "s/<!-- -->//g"; }
loc(){ curl -s -o /dev/null -w "%{redirect_url}" "$@" | sed "s#$B##"; }
PW=$(grep ^ADMIN_PASSWORD .env.production.local | cut -d= -f2-)
curl -s -c $A -o /dev/null -X POST --data-urlencode "password=$PW" $B/api/admin/login

echo "== Ongoing recruitment listings"
P=$(get $B/jobs)
ok "$(echo "$P" | grep -o 'Ongoing recruitment' | head -1)" "Ongoing recruitment" "/jobs shows ongoing section"
ok "$(echo "$P" | grep -o '2,760 roles' | head -1)" "2,760 roles" "2,760 listings (26 roles x 106 cities + 4 remote)"
ok "$(echo "$P" | grep -c 'Page 1 of 115')" "1" "paginated, 24 per page"
ok "$(code $B/jobs?page=2)" "200" "page 2"
ok "$(curl -s "$B/jobs?city=rahim-yar-khan&type=security-guard" | grep -c 'Security Guard Jobs in Rahim Yar Khan')" "1" "filter by city and new role"
J=$(curl -s $B/jobs/hiring-cook-lahore)
ok "$(code $B/jobs/hiring-cook-lahore)" "200" "pool job page"
ok "$(echo "$J" | grep -c 'content="index')" "1" "main-city listing is indexable"
ok "$(curl -s $B/jobs/hiring-cook-chakwal | grep -c 'noindex')" "1" "smaller-city listing is noindex"
ok "$(echo "$J" | grep -c '"JobPosting"')" "0" "no JobPosting schema on pool job"
ok "$(echo "$J" | grep -c 'How this listing works')" "1" "explains it is not a single vacancy"
ok "$(code $B/jobs/hiring-security-guard-rahim-yar-khan)" "200" "multi-word city slug"
ok "$(code $B/jobs/hiring-virtual-assistant-pakistan)" "200" "remote listing"
ok "$(code $B/jobs/hiring-virtual-assistant-lahore)" "404" "remote role not per city"
ok "$(code $B/jobs/hiring-cook-atlantis)" "404" "unknown city 404"
ok "$(get $B/jobs/city/multan | grep -c 'Ongoing recruitment in Multan')" "1" "city job page lists ongoing roles"
ok "$(curl -s $B/jobs/role/driver | grep -c 'hiring-driver-quetta')" "1" "role page links every city"
ok "$(curl -s $B/sitemap.xml | grep -o 'hiring-[a-z-]*' | wc -l | tr -d ' ')" "316" "316 main-city + remote listings in sitemap"
ok "$(curl -s $B/sitemap.xml | grep -c 'hiring-cook-chakwal')" "0" "smaller cities not in sitemap"

echo "== Applying"
ok "$(curl -s -X POST -F jobId=hiring-cook-lahore -F name='Pool Tester' -F phone='0300 1234567' -F city=Lahore -F role=Cook -F consent=yes $B/api/apply | grep -o '"ok":true')" '"ok":true' "apply to pool listing"
ok "$(curl -s -X POST -F jobId=hiring-cook-lahore -F name='No Consent' -F phone='0300 1234568' $B/api/apply | grep -c 'share your profile')" "1" "consent required"
APP=$(node -e 'const a=JSON.parse(require("fs").readFileSync(".data/applications.json","utf8")).filter(x=>x.name==="Pool Tester").pop();console.log(a.id+" "+a.shareConsent+" "+a.jobTitle)')
ok "$(echo $APP | cut -d' ' -f2)" "true" "share consent stored"
ok "$(echo $APP | cut -d' ' -f3-)" "Cook Jobs in Lahore" "job title stored"
ID=$(echo $APP | cut -d' ' -f1)
AP=$(get -b $A "$B/admin/applications?job=pool&city=Lahore")
ok "$(echo "$AP" | grep -o '<h3>Pool Tester' | wc -l)" "1" "admin filter: ongoing + city"
ok "$(echo "$AP" | grep -o '>Copy for WhatsApp<' | wc -l)" "1" "WhatsApp copy button"
ok "$(loc -b $A -X POST -F id=$ID -F to=client@example.com -F _back=/admin/applications $B/api/admin/share)" "/admin/applications?msg=nomail" "share blocked until email is connected"
ok "$(loc -b $A -X POST -F id=$ID -F to=bad -F _back=/admin/applications $B/api/admin/share)" "/admin/applications?msg=bademail" "bad client email rejected"
ok "$(code -X POST -F id=$ID -F to=client@example.com $B/api/admin/share)" "303" "share needs admin (redirects to login)"

echo "== Admin on/off control"
ok "$(get -b $A $B/admin/jobs | grep -c 'Ongoing recruitment (2,760 listings live)')" "1" "admin shows count"
ROLES=$(node -e 'const s=require("fs").readFileSync("lib/pool.ts","utf8");console.log([...s.matchAll(/\{slug:.([a-z-]+).,title/g)].map(m=>"-F show="+m[1]).filter(x=>!x.endsWith("=gardener")).join(" "))')
ok "$(loc -b $A -X POST -F _form=pool -F enabled=on $ROLES -F hideCity=quetta $B/api/admin/settings)" "/admin/jobs?msg=pool" "hide gardener and Quetta"
ok "$(code $B/jobs/hiring-gardener-lahore)" "404" "hidden role gone"
ok "$(code $B/jobs/hiring-cook-quetta)" "404" "hidden city gone"
ALL=$(node -e 'const s=require("fs").readFileSync("lib/pool.ts","utf8");console.log([...s.matchAll(/\{slug:.([a-z-]+).,title/g)].map(m=>"-F show="+m[1]).join(" "))')
IDX=$(for c in islamabad rawalpindi lahore karachi faisalabad multan peshawar gujranwala sialkot hyderabad quetta bahawalpur; do printf -- "-F indexCity=%s " $c; done)
loc -b $A -X POST -F _form=pool -F enabled=on $ALL $IDX $B/api/admin/settings >/dev/null
ok "$(code $B/jobs/hiring-cook-quetta)" "200" "restored"

echo "== Reviews"
E="rev.$RANDOM@example.com"
R(){ curl -s -X POST "$@" $B/api/reviews; }
ok "$(R -F name='Ali Raza' -F email=$E -F rating=5 -F kind=employer -F title='Great cook' -F text='Found a reliable cook in a week, see www.spam.com for more.' -F honest=yes | grep -o '"ok":true')" '"ok":true' "submit review"
ok "$(R -F name='Ali Raza' -F email=$E -F rating=4 -F kind=employer -F text='Second try at reviewing the same thing again.' -F honest=yes | grep -c 'already reviewed')" "1" "one review per person"
ok "$(R -F name='X' -F email=x$E -F rating=6 -F kind=employer -F text='Rating out of range for this test.' -F honest=yes | grep -c 'star rating')" "1" "rating must be 1-5"
ok "$(R -F name='Short' -F email=s$E -F rating=3 -F kind=other -F text='too short' -F honest=yes | grep -c '20 characters')" "1" "text too short rejected"
ok "$(R -F name='No Honest' -F email=h$E -F rating=3 -F kind=other -F text='This review has no honesty confirmation.' | grep -c 'own experience')" "1" "honesty confirmation required"
RID=$(node -e 'const r=JSON.parse(require("fs").readFileSync(".data/reviews.json","utf8")).find(x=>x.email===process.argv[1]);console.log(r.id+" "+r.status+" "+(r.text.includes("spam")?"link":"clean"))' $E)
ok "$(echo $RID | cut -d' ' -f2)" "pending" "held for approval"
ok "$(echo $RID | cut -d' ' -f3)" "clean" "links stripped"
ok "$(curl -s $B/reviews | grep -c 'Great cook')" "0" "not public before approval"
ok "$(curl -s -b $A $B/admin/reviews | grep -c 'Great cook')" "1" "admin sees pending review"
ok "$(loc -b $A -X POST -F id=$(echo $RID | cut -d' ' -f1) -F _action=approve -F reply='Thank you, Ali!' -F _back=/admin/reviews $B/api/admin/reviews)" "/admin/reviews?msg=saved" "approve with reply"
RP=$(curl -s $B/reviews)
ok "$(echo "$RP" | grep -c 'Great cook')" "1" "public after approval"
ok "$(echo "$RP" | grep -c 'Ali R\.')" "1" "surname shortened"
ok "$(echo "$RP" | grep -c 'Thank you, Ali!')" "1" "reply shown"
ok "$(echo "$RP" | grep -c "$E")" "0" "email never shown"
ok "$(echo "$RP" | grep -c 'AggregateRating')" "0" "no self-serving star markup"
SLUG=$(node -e 'const a=JSON.parse(require("fs").readFileSync(".data/agencies.json","utf8")).find(x=>x.status==="approved");console.log(a?a.slug:"")')
if [ -n "$SLUG" ]; then
  ok "$(R -F agency=$SLUG -F name='Hina Shah' -F email=a$E -F rating=4 -F kind=job-seeker -F text='The agency called me back quickly and was clear about the job.' -F honest=yes | grep -o '"ok":true')" '"ok":true' "review an agency"
  AR=$(node -e 'const r=JSON.parse(require("fs").readFileSync(".data/reviews.json","utf8")).find(x=>x.email===process.argv[1]);console.log(r.id)' a$E)
  loc -b $A -X POST -F id=$AR -F _action=approve -F _back=/admin/reviews $B/api/admin/reviews >/dev/null
  AP2=$(curl -s $B/agencies/$SLUG)
  ok "$(echo "$AP2" | grep -c 'AggregateRating')" "1" "agency page has rating markup"
  ok "$(echo "$AP2" | grep -c 'Hina S\.')" "1" "agency review shown"
  ok "$(curl -s $B/agencies | grep -c 'agency-rating')" "1" "stars on directory card"
else echo "  SKIP  no approved agency in test data"; fi
ok "$(code $B/admin/reviews)" "307" "admin reviews needs sign-in"
