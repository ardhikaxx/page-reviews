import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Testimoni & Portofolio | Yanuar Ardhika",
  description: "Kumpulan testimoni dan ulasan dari client yang telah bekerja sama dan menggunakan jasa Yanuar Ardhika.",
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
      </body>
    </html>
  );
}
