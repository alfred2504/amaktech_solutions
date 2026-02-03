import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Amaktech Solutions | Technology & Digital Services',
    description: 'AmakTech Solutions provides graphics design, curriculum vitae and resume designing and email designing services',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen flex flex-col">
<Header />
<main className="flex-grow max-w-6xl mx-auto p-8">{children}</main>
<Footer />
</body>
</html>
)
}