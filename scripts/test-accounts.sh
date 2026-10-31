#!/usr/bin/env bash
# End-to-end test of job seeker and agency accounts against a local server.
# Usage: bash scripts/test-accounts.sh   (server on http://localhost:3999, test data in .data/)
set -u
export MSYS_NO_PATHCONV=1
B=${B:-http://localhost:3999}
cd "$(dirname "$0")/.."
D=.data; A=$D/cj-admin.txt; S1=$D/cj-s1.txt; S2=$D/cj-s2.txt; AG=$D/cj-ag.txt; rm -f $A $S1 $S2 $AG
ok(){ if [ "$1" = "$2" ]; then echo "  PASS  $3"; else echo "  FAIL  $3 (got '$1', want '$2')"; fi; }
loc(){ curl -s -o /dev/null -w "%{redirect_url}" "$@" | sed "s#$B##"; }
tok(){ node -e 'const t=JSON.parse(require("fs").readFileSync(".data/tokens.json","utf8"));const u=JSON.parse(require("fs").readFileSync(".data/users.json","utf8")).find(x=>x.email===process.argv[1]);const k=t.filter(x=>x.userId===u.id&&x.kind===process.argv[2]).pop();console.log(k?k.token:"")' "$1" "$2"; }
PW=$(grep ^ADMIN_PASSWORD .env.production.local | cut -d= -f2-)
curl -s -c $A -o /dev/null -X POST --data-urlencode "password=$PW" $B/api/admin/login
E1="seeker1.$RANDOM@example.com"; E2="seeker2.$RANDOM@example.com"; EA="agency.$RANDOM@example.com"

echo "== Job seeker registration"
ok "$(loc -c $S1 -X POST -F role=seeker -F name='Sana Test' -F email=$E1 -F phone='0301 1112233' -F password=Passw0rd1 -F password2=Passw0rd1 -F terms=yes $B/api/account/register)" "/account?msg=welcome" "register seeker"
ok "$(loc -X POST -F role=seeker -F name='Dup' -F email=$E1 -F phone='0301 1112233' -F password=Passw0rd1 -F password2=Passw0rd1 -F terms=yes $B/api/account/register)" "/account/register?type=seeker&error=exists" "duplicate email rejected"
ok "$(loc -X POST -F role=seeker -F name='Weak' -F email=x$E1 -F phone='0301 1112233' -F password=short -F password2=short -F terms=yes $B/api/account/register)" "/account/register?type=seeker&error=password" "weak password rejected"
ok "$(curl -s -b $S1 $B/account | grep -c 'Hello, Sana')" "1" "dashboard shows name"
ok "$(curl -s -o /dev/null -w '%{redirect_url}' $B/account | sed "s#$B##")" "/account/login" "dashboard needs sign-in"
ok "$(tail -1 $D/mail.log | grep -c 'Confirm your email')" "1" "verification email queued (SMTP off)"
T=$(tok $E1 verify); ok "$(loc "$B/api/account/verify?token=$T")" "/account?msg=verified" "email verification link"
ok "$(loc "$B/api/account/verify?token=$T")" "/account?msg=badlink" "link cannot be reused"

echo "== Profile, CV and alerts"
ok "$(loc -b $S1 -X POST -F name='Sana Test' -F phone='0301 1112233' -F city=lahore -F jobType=cook -F experience='3–5 years' -F skills='Pakistani cooking, see www.spam.com' -F about='Cook with 5 years experience in family homes.' -F "cv=@$D/test-cv.pdf;type=application/pdf" $B/api/account/profile)" "/account?tab=profile&msg=saved" "profile + CV saved"
CV=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(".data/users.json","utf8")).find(x=>x.email===process.argv[1]).cvFile)' $E1)
ok "$(curl -s -b $S1 -o /dev/null -w '%{http_code}' $B/api/account/cv/$CV)" "200" "seeker downloads own CV"
ok "$(curl -s -o /dev/null -w '%{http_code}' $B/api/account/cv/$CV)" "404" "CV hidden when signed out"
ok "$(loc -b $S1 -X POST -F _action=alerts -F alertsOn=on -F alertTypes=cook -F alertCities=lahore $B/api/account/profile)" "/account?tab=alerts&msg=saved" "alerts saved"

echo "== Admin posts a matching job -> alert email"
before=$(wc -l < $D/mail.log)
curl -s -b $A -o /dev/null -X POST -F title='TEST Family cook Lahore' -F jobType=cook -F city=lahore -F employmentType=FULL_TIME -F validThrough=2026-12-31 -F description='TEST JOB for account tests: family cook needed for daily meals in Lahore.' $B/api/admin/jobs
JOB=$(node -e 'const j=JSON.parse(require("fs").readFileSync(".data/jobs.json","utf8")).filter(x=>x.title==="TEST Family cook Lahore").pop();console.log(j.id)')
ok "$(tail -n +$((before+1)) $D/mail.log | grep -c "$E1")" "1" "job alert sent to matching seeker"

echo "== Apply while signed in (uses saved CV), duplicate blocked, status tracking"
ok "$(curl -s -b $S1 -X POST -F jobId=$JOB -F name='Sana Test' -F phone='0301 1112233' -F city=Lahore -F role=Cook -F consent=yes $B/api/apply)" '{"ok":true,"account":true}' "apply signed in"
ok "$(curl -s -b $S1 -o /dev/null -w '%{http_code}' -X POST -F jobId=$JOB -F name='Sana Test' -F phone='0301 1112233' -F city=Lahore -F role=Cook -F consent=yes $B/api/apply)" "409" "second application blocked"
APP=$(node -e 'const a=JSON.parse(require("fs").readFileSync(".data/applications.json","utf8")).filter(x=>x.jobId===process.argv[1]).pop();console.log(a.id+" "+a.cvFile)' $JOB)
ok "$(echo $APP | cut -d' ' -f2)" "$CV" "saved CV attached to application"
ok "$(curl -s -b $S1 $B/account | grep -c 'TEST Family cook Lahore')" "1" "application listed in account"
curl -s -b $A -o /dev/null -X POST -F kind=application -F id=$(echo $APP|cut -d' ' -f1) -F status=shortlisted -F _action=save $B/api/admin/records
ok "$(curl -s -b $S1 $B/account | grep -o '>Shortlisted<' | head -1)" ">Shortlisted<" "status update visible to seeker"
ok "$(tail -1 $D/mail.log | grep -c 'Update on your application')" "1" "status email queued"

echo "== Agency registration, approval, directory"
ok "$(loc -c $AG -X POST -F role=agency -F agencyName='Test Staffing https://spam.example.com' -F name='Ali Agent' -F email=$EA -F phone='0333 4445566' -F city=karachi -F password=Passw0rd1 -F password2=Passw0rd1 -F terms=yes $B/api/account/register)" "/account?msg=welcome" "register agency"
ok "$(curl -s -b $AG $B/account | grep -c 'waiting for approval')" "1" "agency sees pending status"
ok "$(loc -b $AG -X POST -F title='Driver' -F jobType=driver -F city=karachi -F validThrough=2026-12-31 -F description='Need a driver for daily office and school runs in Karachi.' $B/api/account/jobs)" "/account?tab=jobs&msg=notapproved" "pending agency cannot post"
ok "$(loc -b $AG -X POST -F name='Test Staffing Karachi' -F phone='0333 4445566' -F email=$EA -F city=karachi -F about='We place drivers and cooks. Visit https://mysite.pk or www.mysite.com for more.' -F services=domestic-staff -F services=corporate-recruitment -F cities=karachi -F cities=hyderabad $B/api/account/agency)" "/account?tab=profile&msg=saved" "agency profile saved"
node -e 'const a=JSON.parse(require("fs").readFileSync(".data/agencies.json","utf8")).pop();const bad=/https?:|www\.|mysite/i.test(a.about+a.name);console.log(bad?"  FAIL  links stripped":"  PASS  links stripped from name and about ("+a.about+")")'
AGID=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(".data/users.json","utf8")).find(x=>x.email===process.argv[1]).id)' $EA)
ok "$(curl -s $B/agencies | grep -c 'Test Staffing Karachi')" "0" "not listed before approval"
curl -s -b $A -o /dev/null -X POST -F id=$AGID -F _action=approve -F _back=/admin/accounts?tab=agencies $B/api/admin/accounts
SLUG=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(".data/agencies.json","utf8")).find(x=>x.userId===process.argv[1]).slug)' $AGID)
ok "$(curl -s $B/agencies | grep -c 'Test Staffing Karachi')" "1" "listed after approval"
ok "$(curl -s -o /dev/null -w '%{http_code}' $B/agencies/$SLUG)" "200" "agency profile page"
ok "$(curl -s $B/agencies/$SLUG | grep -c '"EmploymentAgency"')" "1" "agency schema"
ok "$(curl -s $B/agencies/$SLUG | grep -ci 'mysite')" "0" "no website link on profile"

echo "== Agency posts a job, receives an applicant, manages it"
ok "$(loc -b $AG -X POST -F title='TEST Agency driver Karachi' -F jobType=driver -F city=karachi -F validThrough=2026-12-31 -F description='TEST JOB: need a driver for daily office and school runs in Karachi.' $B/api/account/jobs)" "/account?tab=jobs&msg=created" "approved agency posts job"
AJOB=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(".data/jobs.json","utf8")).find(x=>x.title==="TEST Agency driver Karachi").id)')
ok "$(curl -s $B/jobs/$AJOB | grep -c 'Test Staffing Karachi')" "1" "job shows agency as employer"
loc -c $S2 -X POST -F role=seeker -F name='Umar Test' -F email=$E2 -F phone='0302 2223344' -F password=Passw0rd1 -F password2=Passw0rd1 -F terms=yes $B/api/account/register >/dev/null
ok "$(curl -s -b $S2 -X POST -F jobId=$AJOB -F name='Umar Test' -F phone='0302 2223344' -F city=Karachi -F role=Driver -F consent=yes -F "cv=@$D/test-cv.pdf;type=application/pdf" $B/api/apply)" '{"ok":true,"account":true}' "second seeker applies to agency job"
ok "$(curl -s -b $AG "$B/account?tab=applicants" | grep -c 'Umar Test')" "1" "agency sees its applicant"
ok "$(curl -s -b $AG "$B/account?tab=applicants" | grep -c 'Sana Test')" "0" "agency cannot see other jobs' applicants"
ACV=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(".data/applications.json","utf8")).find(x=>x.jobId===process.argv[1]).cvFile)' $AJOB)
ok "$(curl -s -b $AG -o /dev/null -w '%{http_code}' $B/api/account/cv/$ACV)" "200" "agency downloads its applicant's CV"
ok "$(curl -s -b $AG -o /dev/null -w '%{http_code}' $B/api/account/cv/$CV)" "404" "agency blocked from other CVs"
ok "$(curl -s -b $S1 -o /dev/null -w '%{http_code}' $B/api/account/cv/$ACV)" "404" "seeker blocked from another seeker's CV"
AAPP=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(".data/applications.json","utf8")).find(x=>x.jobId===process.argv[1]).id)' $AJOB)
ok "$(loc -b $AG -X POST -F id=$AAPP -F status=shortlisted $B/api/account/applications)" "/account?tab=applicants&msg=saved" "agency shortlists applicant"
ok "$(curl -s -b $S2 $B/account | grep -o '>Shortlisted<' | head -1)" ">Shortlisted<" "applicant sees agency's update"
ok "$(loc -b $S1 -X POST -F id=$AAPP -F status=rejected $B/api/account/applications)" "/account/login" "seeker cannot use agency actions"

echo "== Unsubscribe, password reset, suspend"
UID1=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(".data/users.json","utf8")).find(x=>x.email===process.argv[1]).id)' $E1)
U=$(grep -o "api/alerts/unsubscribe?u=$UID1&amp;s=[a-f0-9]*\|api/alerts/unsubscribe?u=$UID1&s=[a-f0-9]*" $D/mail.log | head -1)
node -e 'const l=require("fs").readFileSync(".data/mail.log","utf8");'
SIG=$(node -e 'const c=require("crypto");const s=(process.env.USER_SECRET||"");' ; true)
ok "$(curl -s "$B/api/alerts/unsubscribe?u=$UID1&s=bad" | grep -c 'Link not valid')" "1" "bad unsubscribe link rejected"
loc -X POST -F email=$E1 $B/api/account/forgot >/dev/null
T=$(tok $E1 reset); ok "$(loc -X POST -F token=$T -F password=NewPassw0rd -F password2=NewPassw0rd $B/api/account/reset)" "/account/login?msg=reset" "password reset"
ok "$(loc -X POST -F email=$E1 -F password=Passw0rd1 $B/api/account/login)" "/account/login?error=1" "old password no longer works"
ok "$(loc -X POST -F email=$E1 -F password=NewPassw0rd $B/api/account/login)" "/account" "new password works"
curl -s -b $A -o /dev/null -X POST -F id=$AGID -F _action=suspend -F _back=/admin/accounts?tab=agencies $B/api/admin/accounts
ok "$(curl -s -o /dev/null -w '%{http_code}' $B/agencies/$SLUG)" "404" "suspended agency removed from directory"
ok "$(curl -s $B/jobs | grep -c 'TEST Agency driver Karachi')" "0" "suspended agency's jobs closed"
ok "$(loc -X POST -F email=$EA -F password=Passw0rd1 $B/api/account/login)" "/account/login?error=suspended" "suspended agency cannot sign in"

echo "== Cleanup"
for e in $E1 $E2 $EA; do I=$(node -e 'const u=JSON.parse(require("fs").readFileSync(".data/users.json","utf8")).find(x=>x.email===process.argv[1]);console.log(u?u.id:"")' $e); [ -n "$I" ] && curl -s -b $A -o /dev/null -X POST -F id=$I -F _action=delete $B/api/admin/accounts; done
for j in $JOB $AJOB; do curl -s -b $A -o /dev/null -X POST -F id=$j -F _action=delete $B/api/admin/jobs; done
echo "  done"
