import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MSWComponent } from './_component/MSWComponent';
import AuthSession from './_component/AuthSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'X. 무슨 일이 일어나고 있나요?',
    description: 'X.com inspire',
};

// 최상위 RootLayout 담당
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MSWComponent />
                <AuthSession>{children}</AuthSession>
            </body>
        </html>
    );
}
