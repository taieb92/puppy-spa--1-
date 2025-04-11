"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, Search, ArrowRight } from "lucide-react"

export default function PuppySpaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Puppy.Spa</h1>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`text-lg ${isActive("/") ? "font-bold" : "text-muted-foreground hover:text-black"}`}
              >
                Today
              </Link>
              <Link
                href="/previous-days"
                className={`text-lg ${isActive("/previous-days") ? "font-bold" : "text-muted-foreground hover:text-black"}`}
              >
                Previous Days
              </Link>
              <Link
                href="/search"
                className={`text-lg ${isActive("/search") ? "font-bold" : "text-muted-foreground hover:text-black"}`}
              >
                Search
              </Link>
              <Link href="/" className="bg-black text-white rounded-full px-6 py-3 flex items-center gap-2">
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </nav>

            <nav className="md:hidden flex gap-6">
              <Link href="/" className={`${isActive("/") ? "text-black" : "text-muted-foreground"}`}>
                <Home size={24} />
              </Link>
              <Link
                href="/previous-days"
                className={`${isActive("/previous-days") ? "text-black" : "text-muted-foreground"}`}
              >
                <Calendar size={24} />
              </Link>
              <Link href="/search" className={`${isActive("/search") ? "text-black" : "text-muted-foreground"}`}>
                <Search size={24} />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center md:text-left max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Puppy.Spa</h3>
              <p className="text-muted-foreground">
                Making puppy grooming a delightful experience for both pets and their owners.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-muted-foreground hover:text-black">
                  Today's List
                </Link>
                <Link href="/previous-days" className="text-muted-foreground hover:text-black">
                  Previous Days
                </Link>
                <Link href="/search" className="text-muted-foreground hover:text-black">
                  Search Records
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <p className="text-muted-foreground">123 Puppy Lane</p>
              <p className="text-muted-foreground">Dogtown, CA 90210</p>
              <p className="text-muted-foreground">info@puppyspa.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-muted-foreground">
            <p>© {new Date().getFullYear()} Puppy Spa Waiting List Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
