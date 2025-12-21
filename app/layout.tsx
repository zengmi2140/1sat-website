import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Mono, Libre_Baskerville } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const _libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "亿聪哲史",
  description:
    "Bitcoin is the signal. Everything else is noise. A Chinese Bitcoin podcast focused on protocol, code, and self-sovereignty.",
  generator: "v0.app",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
