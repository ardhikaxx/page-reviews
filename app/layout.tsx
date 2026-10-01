import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://page-reviews.vercel.app"),
  title: {
    default: "Testimoni & Review Klien | Yanuar Ardhika",
    template: "%s | Yanuar Ardhika",
  },
  description: "Kumpulan testimoni dan ulasan otentik dari klien yang telah bekerja sama dan menggunakan jasa profesional Yanuar Ardhika.",
  keywords: [
    "testimoni jasa",
    "review klien",
    "yanuar ardhika",
    "portofolio web developer",
    "jasa website",
    "ulasan klien"
  ],
  authors: [{ name: "Yanuar Ardhika", url: "https://yanuar-ardhika.vercel.app" }],
  creator: "Yanuar Ardhika",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://page-reviews.vercel.app",
    title: "Testimoni & Review Klien | Yanuar Ardhika",
    description: "Kumpulan ulasan dan testimoni otentik dari klien yang telah bekerja sama dan menggunakan jasa profesional Yanuar Ardhika.",
    siteName: "Testimoni Jasa - Yanuar Ardhika",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimoni & Review Klien | Yanuar Ardhika",
    description: "Kumpulan ulasan dan testimoni otentik dari klien yang telah bekerja sama dan menggunakan jasa profesional Yanuar Ardhika.",
    creator: "@ardhikaxx",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth dark" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-black text-neutral-100 antialiased min-h-screen flex flex-col selection:bg-red-900 selection:text-white relative`}>
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: 'radial-gradient(circle at bottom center, #880808 0%, #000000 70%)' }} />
        <main className="flex-grow">
          {children}
        </main>

        <Toaster position="bottom-center" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
