import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Memories Annette",
  description: "Lasst uns Erinnerungen sammeln",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={""}>{children}</body>
    </html>
  );
}
