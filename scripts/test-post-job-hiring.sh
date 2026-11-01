#!/usr/bin/env bash
# End-to-end test of Post a Job, the publishing queue and hiring-now listings (local server on :3999).
set -u
export MSYS_NO_PATHCONV=1
B=${B:-http://localhost:3999}
cd "$(dirname "$0")/.."
D=.data; A=$D/cj-admin.txt; rm -f $A
ok(){ if [ "$1" = "$2" ]; then echo "  PASS  $3"; else echo "  FAIL  $3 (got '$1', want '$2')"; fi; }
code(){ curl -s -o /dev/null -w "%{http_code}" "$@"; }
loc(){ curl -s -o /dev/null -w "%{redirect_url}" "$@" | sed "s#$B##"; }
get(){ curl -s "$@" | sed "s/<!-- -->//g"; }
js(){ node -e "$1"; }
PW=$(grep ^ADMIN_PASSWORD .env.production.local | cut -d= -f2-)
curl -s -c $A -o /dev/null -X POST --data-urlencode "password=$PW" $B/api/admin/login

echo "== Post a job (employer)"
P(){ curl -s -X POST "$@" $B/api/post-job; }
BASE=(-F company='Test Foods' -F contactName='Bilal Test' -F phone='0301 5556677' -F title='Test Security Guard for Warehouse' -F jobType=security-guard -F city=multan -F area='Industrial Estate' -F employmentType=FULL_TIME -F validThrough=2026-12-20 -F salaryMin=32000 -F salaryMax=38000 -F experience='1 year as a guard' -F expMonths=12 -F eduLevel='high school' -F education='Matric' -F postalCode=60000 -F 'description=A food warehouse in the Multan industrial estate needs a trained guard for night shifts, call 0301 5556677 or see www.spam.com.')
ok "$(P "${BASE[@]}" -F real=yes | grep -c 'both boxes')" "1" "both confirmations required"
ok "$(P "${BASE[@]}" -F real=yes -F consent=yes | grep -o '"ok":true')" '"ok":true' "employer job submitted"
JID=$(js 'const j=JSON.parse(require("fs").readFileSync(".data/jobs.json","utf8")).filter(x=>x.title==="Test Security Guard for Warehouse").pop();console.log(j.id+"|"+j.status+"|"+/0301|spam/.test(j.description)+"|"+j.contact.phone)')
ok "$(echo $JID | cut -d'|' -f2)" "pending" "saved as pending"
ok "$(echo $JID | cut -d'|' -f3)" "false" "phone and link removed from public text"
ok "$(echo $JID | cut -d'|' -f4)" "0301 5556677" "contact kept privately"
ID=$(echo $JID | cut -d'|' -f1)
ok "$(code $B/jobs/$ID)" "404" "pending job not public"
ok "$(get -b $A $B/admin/jobs | grep -c 'Waiting for approval')" "1" "admin sees pending"
ok "$(loc -b $A -X POST -F id=$ID -F _action=approve $B/api/admin/jobs)" "/admin/jobs?msg=approved" "approve"
JP=$(get $B/jobs/$ID)
ok "$(code $B/jobs/$ID)" "200" "approved job public"
ok "$(echo "$JP" | grep -o '"postalCode":"60000"' | head -1)" '"postalCode":"60000"' "schema postalCode"
ok "$(echo "$JP" | grep -o '"addressRegion":"Punjab"' | head -1)" '"addressRegion":"Punjab"' "schema region"
ok "$(echo "$JP" | grep -o '"monthsOfExperience":12' | head -1)" '"monthsOfExperience":12' "schema experience"
ok "$(echo "$JP" | grep -o '"credentialCategory":"high school"' | head -1)" '"credentialCategory":"high school"' "schema education"
ok "$(echo "$JP" | grep -o '"minValue":32000,"maxValue":38000' | head -1)" '"minValue":32000,"maxValue":38000' "schema baseSalary"
ok "$(echo "$JP" | grep -c 'Job summary')" "1" "job summary table"
loc -b $A -X POST -F id=$ID -F _action=delete $B/api/admin/jobs >/dev/null

echo "== Queue"
Q=$(loc -b $A -X POST -F title='Test Queued Driver' -F jobType=driver -F city=lahore -F employmentType=FULL_TIME -F validThrough=2026-12-20 -F 'description=A family in Lahore needs a careful driver for school and office runs.' -F queue=on $B/api/admin/jobs)
ok "$Q" "/admin/jobs?msg=queued" "job added to queue"
QJ=$(js 'const j=JSON.parse(require("fs").readFileSync(".data/jobs.json","utf8")).find(x=>x.title==="Test Queued Driver");console.log(j.id+"|"+(j.publishAt>new Date().toISOString())+"|"+j.announced)')
QID=$(echo $QJ | cut -d'|' -f1)
ok "$(echo $QJ | cut -d'|' -f2)" "true" "release time in the future"
ok "$(code $B/jobs/$QID)" "404" "queued job hidden until release"
js 'const fs=require("fs");const f=".data/jobs.json";const r=JSON.parse(fs.readFileSync(f,"utf8"));r.forEach(j=>{if(j.title==="Test Queued Driver")j.publishAt=new Date(Date.now()-60000).toISOString()});fs.writeFileSync(f,JSON.stringify(r,null,1))'
ok "$(code $B/jobs/$QID)" "200" "visible once release time passes"
ok "$(curl -s $B/api/cron/publish | grep -o '"jobs":1')" '"jobs":1' "cron announces released job"
ok "$(curl -s $B/api/cron/publish | grep -o '"jobs":0')" '"jobs":0' "announced only once"
loc -b $A -X POST -F id=$QID -F _action=delete $B/api/admin/jobs >/dev/null

echo "== Hiring now"
ok "$(loc -b $A -X POST -F _action=activate -F role-cook=on -F min-cook=35000 -F max-cook=55000 -F city=chakwal -F city=lahore -F days=30 $B/api/admin/hiring)" "/admin/jobs?msg=confirm#hiring" "confirmation required"
ok "$(loc -b $A -X POST -F _action=activate -F role-cook=on -F min-cook=35000 -F max-cook=55000 -F city=chakwal -F city=lahore -F days=30 -F confirm=yes $B/api/admin/hiring)" "/admin/jobs?msg=active#hiring" "activate cook in 2 cities"
ok "$(js 'console.log(JSON.parse(require("fs").readFileSync(".data/pool-active.json","utf8")).filter(r=>r.role==="cook").length)')" "2" "2 listings queued"
ok "$(js 'const r=JSON.parse(require("fs").readFileSync(".data/pool-active.json","utf8"));const h={};r.forEach(x=>{h[x.publishAt.slice(0,13)]=(h[x.publishAt.slice(0,13)]||0)+1});console.log(Math.max(...Object.values(h))<=3)')" "true" "max 3 per hour"
ok "$(get $B/jobs/hiring-cook-chakwal | grep -c '"JobPosting"')" "0" "not in Google Jobs before release"
js 'const fs=require("fs");const f=".data/pool-active.json";const r=JSON.parse(fs.readFileSync(f,"utf8"));r.forEach(x=>x.publishAt=new Date(Date.now()-60000).toISOString());fs.writeFileSync(f,JSON.stringify(r,null,1))'
H=$(get $B/jobs/hiring-cook-chakwal)
ok "$(echo "$H" | grep -c '"JobPosting"')" "1" "JobPosting after release"
ok "$(echo "$H" | grep -o '"minValue":35000,"maxValue":55000' | head -1)" '"minValue":35000,"maxValue":55000' "salary range in schema"
ok "$(echo "$H" | grep -o '"name":"estaff.pk","sameAs"' | head -1)" '"name":"estaff.pk","sameAs"' "hiring organisation = estaff.pk"
ok "$(echo "$H" | grep -o '"addressRegion":"Punjab"' | head -1)" '"addressRegion":"Punjab"' "region"
ok "$(echo "$H" | grep -o '"monthsOfExperience":12' | head -1)" '"monthsOfExperience":12' "experience"
ok "$(echo "$H" | grep -o '"educationRequirements":"no requirements"' | head -1)" '"educationRequirements":"no requirements"' "education"
ok "$(echo "$H" | grep -c 'shared once you are shortlisted')" "1" "employer shared after shortlist"
ok "$(echo "$H" | grep -o '<title>[^<]*' | head -1)" "<title>Cook Jobs in Chakwal – Hiring Now, PKR 35,000–55,000 | estaff.pk" "hiring-now title"
ok "$(echo "$H" | grep -c 'content="index')" "1" "indexable"
ok "$(curl -s $B/api/cron/publish | grep -o '"listings":2')" '"listings":2' "cron announces 2 listings"
ok "$(get $B/jobs/hiring-cook-karachi | grep -c '"JobPosting"')" "0" "other cities stay ongoing"
ok "$(curl -s $B/sitemap.xml | grep -c 'hiring-cook-chakwal')" "1" "smaller city in sitemap now"
loc -b $A -X POST -F _action=stop -F role=cook $B/api/admin/hiring >/dev/null
ok "$(get $B/jobs/hiring-cook-chakwal | grep -c '"JobPosting"')" "0" "stop removes Google Jobs data"

echo "== Unique content"
ok "$(node -e '
const h=async u=>{const t=await (await fetch(u)).text();const a=t.indexOf("<article>"),z=t.indexOf("</article>");return t.slice(a,z).split("<!-- -->").join("").replace(/<[^>]+>/g," ").replace(/[ \n\t]+/g," ")};
(async()=>{const a=await h(process.argv[1]+"/jobs/hiring-driver-sialkot"),b=await h(process.argv[1]+"/jobs/hiring-driver-larkana");
const sh=t=>{const w=t.toLowerCase().split(" ");const s=new Set();for(let i=0;i+5<w.length;i++)s.add(w.slice(i,i+5).join(" "));return s};
const A=sh(a),Bs=sh(b);let n=0;A.forEach(x=>{if(Bs.has(x))n++});console.log(n/A.size<0.8)})()' $B)" "true" "two city pages job text is at least 20% city-specific"
