import type { Metadata } from "next";
import "./globals.css";

import TopNavbar from "./components/TopNavbar";

export const metadata: Metadata = {
  title: "Ebra hiring task",
  description: "Developed by Feras Alhazmi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopNavbar />
        {children}
      </body>
    </html>
  );
}
