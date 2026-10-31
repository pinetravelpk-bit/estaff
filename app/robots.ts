import type {MetadataRoute} from 'next';import {indexingEnabled,absolute} from '../lib/seo';
export default function robots():MetadataRoute.Robots{return indexingEnabled?{rules:[{userAgent:'*',allow:'/',disallow:['/api/','/admin']}],sitemap:absolute('/sitemap.xml')}:{rules:[{userAgent:'*',disallow:'/'}]};}
