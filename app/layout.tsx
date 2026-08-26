import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:{default:"AmakTech Solutions | Transforming Ideas into Digital Solutions",template:"%s | AmakTech Solutions"},description:"Professional graphic design, digital branding, website design, software development and technology solutions by AmakTech Solutions."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
