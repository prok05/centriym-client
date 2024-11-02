import type { Metadata } from "next";
import { Inter, Arimo } from "next/font/google";
import "./globals.css";
import 'react-big-calendar/lib/css/react-big-calendar.css'


const inter = Inter({ subsets: ["cyrillic"] });
const arimo = Arimo({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Centriym",
  description: "Centriyum platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={arimo.className}>{children}</body>
    </html>
  );
}
