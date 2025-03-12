import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/custom-ui/NavBar";
import Providers from "./providers";
import Footer from "@/components/custom-ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Market",
  description: "Plateforme de mise en relation entre étudiants et entreprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen flex flex-col justify-between"}>
        <Providers>
          <NavBar />
          <main className="py-5">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
