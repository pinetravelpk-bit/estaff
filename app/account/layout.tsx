import type {Metadata} from 'next';
import {Header,Footer} from '../../components/ui';
import './account.css';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:{default:'My account',template:'%s · estaff.pk'},robots:{index:false,follow:false}};

export default function AccountLayout({children}:{children:React.ReactNode}){return <><Header/><main className="acc">{children}</main><Footer/></>;}
