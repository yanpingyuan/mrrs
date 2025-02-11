import type { Metadata } from "next";
import './globals.css';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import { StyledRoot } from './styledRoot';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}> ) {
  const headerList = await headers();
 
  const pathname = headerList.get("x-current-path");
  
  if (pathname=== '/login'){
    return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>
  }
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body >
        <div className="mt-4 text-center">32423</div>
        <AppRouterCacheProvider>
          <StyledRoot>{children}</StyledRoot>
        </AppRouterCacheProvider>
      </body>
       
      {/* </body> */}
    </html>
  );
}
