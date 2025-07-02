import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TaxSync Pro - India's First Gujarati-Enabled Stock Market Tax Automation Platform",
  description: "Automate tax calculations, maximize savings. Made in Ahmedabad for Gujarat's CAs.",
  keywords: "tax automation, capital gains, chartered accountant, Gujarat, Ahmedabad, stock market, tax calculator",
  authors: [{ name: "TaxSync Pro Team" }],
  creator: "TaxSync Pro",
  publisher: "TaxSync Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://taxsyncpro.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "gu-IN": "/gu-IN",
    },
  },
  openGraph: {
    title: "TaxSync Pro - Tax Automation for Gujarat CAs",
    description: "India's First Gujarati-Enabled Stock Market Tax Automation Platform",
    url: "https://taxsyncpro.com",
    siteName: "TaxSync Pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaxSync Pro - Tax Automation Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxSync Pro - Tax Automation for Gujarat CAs",
    description: "India's First Gujarati-Enabled Stock Market Tax Automation Platform",
    images: ["/twitter-image.png"],
    creator: "@taxsyncpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TaxSync Pro" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
