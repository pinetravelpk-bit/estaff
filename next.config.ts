import type {NextConfig} from 'next';
const config:NextConfig={
  poweredByHeader:false,
  output:'standalone',
  experimental:{cpus:2},
  async headers(){return [
    {source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'Strict-Transport-Security',value:'max-age=31536000; includeSubDomains'},{key:'X-Frame-Options',value:'SAMEORIGIN'},{key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=(), usb=()'},{key:'Content-Security-Policy',value:"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"}]},
    {source:'/admin/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'},{key:'Cache-Control',value:'private, no-store'}]},
    {source:'/admin',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'},{key:'Cache-Control',value:'private, no-store'}]},
  ];},
  // Old demo pages now point to the real features.
  async redirects(){return [
    {source:'/workspace',destination:'/hire',permanent:true},
    {source:'/candidate',destination:'/jobs/apply',permanent:true},
  ];},
};
export default config;
