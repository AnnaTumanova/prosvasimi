'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Script from 'next/script';

function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + searchParams.toString();
      window.gtag('config', 'G-CKGBHFBG38', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-CKGBHFBG38"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-CKGBHFBG38');
        `}
      </Script>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </>
  );
}

declare global {
  interface Window {
    gtag: (command: string, id: string, config?: any) => void;
    dataLayer: any[];
  }
}
