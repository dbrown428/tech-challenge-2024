import type { Metadata } from "next";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Technical Challenge - Danica Brown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* inter.className */}
      <body className=''>{children}</body>
    </html>
  );
}
