import "./globals.css";
import { type ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Thinkdigi Growth Ecosystem",
  description:
    "Funding · Tools · Expertise — Pay&Earn financing for eCommerce.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <body className="min-h-screen flex flex-col">
  <NavBar />
        <div className="pt-16 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
