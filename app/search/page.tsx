"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { PuppyEntry, WaitingList } from "@/lib/types"
import { searchAllWaitingLists } from "@/lib/storage-utils"
import { formatDate } from "@/lib/date-utils"
import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"
import PuppyCard from "@/components/puppy-card"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<{ entry: PuppyEntry; list: WaitingList }[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (searchTerm.trim().length === 0) return

    const results = searchAllWaitingLists(searchTerm)
    setSearchResults(results)
    setHasSearched(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <main className="container mx-auto px-6 py-16 max-w-[1200px]">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="pl-0 flex items-center gap-2 hover:bg-transparent hover:text-black">
            <ChevronLeft size={20} />
            <span>Back to Today</span>
          </Button>
        </Link>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-12">Search Puppy Records</h1>

      <div className="card mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by puppy or owner name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-full h-14"
          />
          <Button onClick={handleSearch} className="bg-black hover:bg-black/90 text-white rounded-full" size="lg">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>

      {hasSearched && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {searchResults.length} {searchResults.length === 1 ? "Result" : "Results"} Found
          </h2>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <div key={index} className="card">
                  <div className="mb-3 text-base font-medium">Visit Date: {formatDate(result.list.date)}</div>
                  <PuppyCard entry={result.entry} onToggleServiced={() => {}} disableControls={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">
              <p className="text-lg mb-2">No puppies found matching &quot;{searchTerm}&quot;</p>
              <p className="text-muted-foreground">Try using a different search term or check the spelling</p>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
