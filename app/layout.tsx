import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PuppySpaLayout from "@/components/puppy-spa-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Puppy Spa",
  description: "Manage your puppy spa waiting list",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PuppySpaLayout>
            {children}
          </PuppySpaLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'