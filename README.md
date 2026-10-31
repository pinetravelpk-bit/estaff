# estaff.pk — Next.js theme

The approved responsive mint/navy design, spacious mega menu, public website and detailed administration demonstration. Native Next.js App Router 16.4.3 with React 19.2.6 and TypeScript. No Cloudflare, Vite or Vinext runtime is required.

## Install and run

Use Node.js 22.13 or newer. From the unzipped folder:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. For a production build:

```sh
npm run build
npm start
```

Deploy as a Next.js project to a Node-capable host or a compatible Next.js hosting platform. A basic PHP-only hosting plan cannot run the server. `output: standalone` is enabled for container/Node deployments; copy `public` and `.next/static` alongside the standalone server as described in Next.js hosting documentation. The source ZIP does not include node_modules or build output.

## Included

- Approved homepage, spacious desktop mega menu and mobile navigation.
- 18 service/planning pages and 19 specialist role guides.
- Eight industry guides and an industry directory.
- Home & Care only: two cities, 25 area overview guides and 250 role-area guides.
- Resources, FAQs, HTML directory and a 329-URL public sitemap.
- Admin at `/admin`, employer workspace, candidate workspace, CV and sample job interfaces.
- Unique page metadata, canonical URLs, Open Graph/Twitter metadata, matching visible FAQ/breadcrumb/service JSON-LD, robots.txt, sitemap.xml, llms.txt and llms-full.txt.
- Locally served fonts and WebP imagery; responsive and reduced-motion styles.

## Production indexing and local information

Keep `SITE_INDEXING_ENABLED=false` on staging. After deploying on the real estaff.pk domain, set SITE_URL to https://estaff.pk and SITE_INDEXING_ENABLED=true, then rebuild. The theme deliberately refuses to enable indexing on another hostname. Set only real business contact/address values in the environment. A populated phone, street and locality enable EmploymentAgency schema with matching visible contact details; otherwise Organisation schema is used. No local branch office is invented for an area page.

Verify robots.txt, sitemap.xml and canonical URLs after launch. Add your verification tokens and submit the sitemap in Google Search Console and Bing Webmaster Tools. The package does not connect these accounts automatically. Search rankings, AI citations and rich results are not guaranteed; these are technical/content foundations, not certification scores for AEO/GEO/AIO or other labels.

## Demonstration boundaries

Admin records/preferences are saved in localStorage. Sample CVs use browser IndexedDB. No shared database, authentication, role-based access, employer notifications, live vacancy feed, payroll payment or tax engine is connected. Admin, candidate, job and workflow pages remain noindex. No live vacancies emit JobPosting schema. Use fictional data when reviewing workflows; production HR data needs an authenticated backend and secure file storage.

EOR and overseas pages are enquiry-planning pages only. They do not claim verified EOR delivery, an OEP licence or visa-processing authority. Availability, placement fees and replacement terms must be agreed separately.

## Editing

`lib/content.ts`: core services and locations. `lib/business.ts`: business services and industries. `lib/home-care.ts`: approved household roles, local notes and layouts. `lib/editorial.ts`: editorial detail. `lib/navigation.ts`: mega menu. `lib/seo.ts`: metadata and schema. `app/globals.css`: visual theme. Images are illustrative, including AI-generated staffing compositions; they are not actual candidate portraits.
