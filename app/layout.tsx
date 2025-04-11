import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import PuppySpaLayout from "@/components/puppy-spa-layout"

// Load Outfit font using Next.js font system
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Puppy Spa - Waiting List Manager",
  description: "Manage your puppy spa waiting list with ease",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <PuppySpaLayout>{children}</PuppySpaLayout>
      </body>
    </html>
  )
}


import './globals.css'