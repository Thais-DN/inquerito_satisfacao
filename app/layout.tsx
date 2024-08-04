import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inquérito de satisfação",
  description: "Aceda ao inquérito para sabermos sua opnião.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
