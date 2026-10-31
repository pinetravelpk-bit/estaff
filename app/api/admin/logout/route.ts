import {NextResponse} from 'next/server';
import {go} from '../../../../lib/http';
import {COOKIE} from '../../../../lib/auth';

export const dynamic='force-dynamic';
export async function POST(req:Request){const res=go('/admin');res.cookies.set(COOKIE,'',{path:'/',maxAge:0});return res;}
