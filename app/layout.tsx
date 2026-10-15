import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AS PRO - Nettoyage Professionnel",
  description: "Un nettoyage professionnel pour des locaux impeccables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans bg-white`}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
