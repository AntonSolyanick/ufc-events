import { Navbar } from "@/widgets/Navbar";
import { Providers } from "./providers";

import "../styles/index.css";

import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "normal",
  variable: "--font-barlow-condensed",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${barlowCondensed.variable} `}
    >
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
