#!/usr/bin/env bash
# Local test of the dashboard's Blog, Images and SEO screens. Usage: bash scripts/test-admin-website.sh
set -u
export MSYS_NO_PATHCONV=1
B=${B:-http://localhost:3999}
cd "$(dirname "$0")/.."
PW=$(grep ^ADMIN_PASSWORD .env.production.local | cut -d= -f2-)
J=.data/cj.txt; rm -f $J
curl -s -c $J -o /dev/null -X POST --data-urlencode "password=$PW" $B/api/admin/login
code(){ curl -s -b $J -o /dev/null -w "%{http_code} %{redirect_url}" "$@"; echo; }

echo "== Images"
node -e 'const b=Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==","base64");require("fs").writeFileSync(".data/test.png",b)'
code -X POST -F _action=upload -F alt="Test image" -F "file=@.data/test.png;type=image/png" $B/api/admin/media
IMG=$(curl -s -b $J $B/admin/media | grep -o '/media/img-[a-f0-9]*\.png' | head -1); echo "image: $IMG -> $(curl -s -o /dev/null -w '%{http_code} %{content_type}' $B$IMG)"
code -X POST -F _action=upload -F "file=@.data/test-cv.pdf;type=application/pdf" $B/api/admin/media

echo "== Blog: new post"
BODY=$'## First heading\nThis is a test post with **bold** text and a [link](/jobs).\n\n- one\n- two\n\n![pic]('"$IMG"$')\n\n<script>alert(1)</script>'
code -X POST -F title="Test post from dashboard" -F description="A test post written from the estaff.pk dashboard to check publishing works end to end." -F category=News -F status=published -F image="$IMG" -F "body=$BODY" -F _action=save $B/api/admin/posts
P=$(curl -s $B/blog/test-post-from-dashboard); echo "post page: h2=$(echo "$P"|grep -c 'id="first-heading"') bold=$(echo "$P"|grep -c '<strong>bold</strong>') img=$(echo "$P"|grep -c "$IMG") script-escaped=$(echo "$P"|grep -c '&lt;script&gt;') raw-script=$(echo "$P"|grep -c '<script>alert')"
echo "in blog list: $(curl -s $B/blog | grep -c 'Test post from dashboard')  in sitemap: $(curl -s $B/sitemap.xml | grep -c 'test-post-from-dashboard')"
echo "== Blog: edit built-in title, then hide, then restore"
S=how-to-hire-a-home-cook-in-islamabad-rawalpindi
code -X POST -F oldSlug=$S -F builtIn=1 -F title="EDITED cook guide title" -F description="An edited description for the built-in cook guide, long enough to pass the check." -F category="Household hiring" -F status=published -F _action=save $B/api/admin/posts
echo "edited title live: $(curl -s $B/blog/$S | grep -c 'EDITED cook guide title')"
code -X POST -F oldSlug=$S -F builtIn=1 -F title="EDITED cook guide title" -F description="An edited description for the built-in cook guide, long enough to pass the check." -F status=hidden -F _action=save $B/api/admin/posts
echo "hidden -> $(curl -s -o /dev/null -w '%{http_code}' $B/blog/$S)"
code -X POST -F oldSlug=$S -F _action=reset $B/api/admin/posts
echo "restored -> $(curl -s -o /dev/null -w '%{http_code}' $B/blog/$S) original title: $(curl -s $B/blog/$S | grep -c 'How to Hire a Home Cook')"
code -X POST -F oldSlug=test-post-from-dashboard -F _action=delete $B/api/admin/posts
echo "deleted post -> $(curl -s -o /dev/null -w '%{http_code}' $B/blog/test-post-from-dashboard)"

echo "== SEO"
code -X POST -F path=/about -F title="SEO OVERRIDE TITLE" -F description="SEO override description for the about page test." -F _action=save $B/api/admin/seo
echo "override title: $(curl -s $B/about | grep -o '<title>[^<]*' )"
code -X POST -F path=/glossary -F noindex=on -F _action=save $B/api/admin/seo
echo "noindex: $(curl -s $B/glossary | grep -o '<meta name="robots" content="[^"]*"')"
code -X POST -F path=/about -F _action=remove $B/api/admin/seo
code -X POST -F path=/glossary -F _action=remove $B/api/admin/seo
echo "after remove: $(curl -s $B/about | grep -o '<title>[^<]*')"
code -X POST -F _form=seo --form-string seo.googleVerification='<meta name="google-site-verification" content="abc123TEST" />' -F seo.titleSuffix=estaff.pk -F seo.defaultImage=/images/hero-reference.webp $B/api/admin/settings
echo "verification tag: $(curl -s $B/ | grep -o 'google-site-verification" content="[^"]*"')"
code -X POST -F _form=seo -F seo.googleVerification= -F seo.titleSuffix=estaff.pk -F seo.defaultImage=/images/hero-reference.webp $B/api/admin/settings
echo "== cleanup image"
F=${IMG#/media/}; code -X POST -F _action=delete -F file=$F $B/api/admin/media
