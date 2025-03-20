"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Analytics loaded');
        }}
        onError={(e) => {
          console.error('Error loading Google Analytics:', e);
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            transport_url: 'https://www.google-analytics.com',
            first_party_collection: true,
            anonymize_ip: true,
            send_page_view: true,
            page_path: window.location.pathname,
            debug_mode: true
          });
        `}
      </Script>
    </>
  );
} 