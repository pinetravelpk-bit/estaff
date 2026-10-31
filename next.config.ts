import type {NextConfig} from 'next';
const config:NextConfig={
  poweredByHeader:false,
  output:'standalone',
  experimental:{cpus:2},
  async headers(){return [
    {source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}]},
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
