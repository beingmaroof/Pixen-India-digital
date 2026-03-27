import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Script from "next/script";
import { AuthProvider } from '@/contexts/AuthContext';
import FloatingSocialIcons from '@/components/FloatingSocialIcons';
import CursorFollower from '@/components/CursorFollower';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

const siteUrl = 'https://pixenindia.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pixen India Digital | Performance Digital Growth Agency",
    template: "%s | Pixen India Digital",
  },
  description:
    "India's performance-first digital growth agency. We build revenue-generating growth systems — not just marketing campaigns. Free Growth Audit for qualifying brands.",
  keywords: [
    "digital marketing agency India",
    "performance marketing",
    "growth marketing agency",
    "e-commerce marketing Delhi",
    "Meta ads Google ads agency",
    "social media marketing India",
    "CRO agency India",
    "lead generation agency",
  ],
  authors: [{ name: "Pixen India Digital", url: siteUrl }],
  creator: "Pixen India Digital",
  openGraph: {
    title: "Pixen India Digital | Performance Digital Growth Agency",
    description:
      "We build revenue-generating growth systems. Free Growth Audit for qualifying brands.",
    url: siteUrl,
    siteName: "Pixen India Digital",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Pixen India Digital — Performance Growth Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixen India Digital | Performance Digital Growth Agency",
    description:
      "We build revenue-generating growth systems. Free Growth Audit for qualifying brands.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  name: "Pixen India Digital",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-78277-17445",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "B/459, Gali no.6, Khadda Colony, Jaitpur",
    addressLocality: "South Delhi",
    addressRegion: "Delhi",
    postalCode: "110044",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/pixenindiadigital/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Organization Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>

      <body className={inter.className}>
        <AuthProvider>
          <CursorFollower />
          {children}
          <FloatingSocialIcons
            instagramUrl="https://www.instagram.com/pixenindiadigital/"
            whatsappUrl="https://wa.me/917827717445"
          />
        </AuthProvider>
      </body>
    </html>
  );
}