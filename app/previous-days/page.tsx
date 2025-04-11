"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import PuppyList from "@/components/puppy-list"
import { Button } from "@/components/ui/button"
import { formatDate, getTodayString } from "@/lib/date-utils"
import type { PuppyEntry, WaitingList } from "@/lib/types"
import { getWaitingListForDate, getAllWaitingListDates, saveWaitingList } from "@/lib/storage-utils"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function PreviousDays() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [waitingList, setWaitingList] = useState<WaitingList | null>(null)
  const [availableDates, setAvailableDates] = useState<string[]>([])

  useEffect(() => {
    // Load all available dates
    const dates = getAllWaitingListDates()
    setAvailableDates(dates)

    // Load selected date's waiting list
    if (selectedDate) {
      const dateString = formatDateForStorage(selectedDate)
      const list = getWaitingListForDate(dateString)
      setWaitingList(list)
    }
  }, [selectedDate])

  const formatDateForStorage = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const handleUpdateList = (updatedEntries: PuppyEntry[]) => {
    if (!waitingList) return

    const updatedList = {
      ...waitingList,
      entries: updatedEntries,
    }

    saveWaitingList(updatedList)
    setWaitingList(updatedList)
  }

  const isDateWithData = (date: Date) => {
    const dateString = formatDateForStorage(date)
    return availableDates.includes(dateString)
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

      <h1 className="text-4xl md:text-5xl font-bold mb-12">Previous Days</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
            modifiers={{
              hasData: (date) => isDateWithData(date),
            }}
            modifiersClassNames={{
              hasData: "bg-[#FFD166] font-bold",
            }}
            disabled={{
              after: new Date(),
            }}
          />
          <div className="mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FFD166]"></div>
              <span>Days with waiting lists</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {waitingList ? (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold">{formatDate(waitingList.date)}</h2>
                <p className="text-muted-foreground text-lg">{waitingList.entries.length} puppies on the list</p>
              </div>

              <PuppyList
                entries={waitingList.entries}
                onUpdateList={handleUpdateList}
                isHistorical={waitingList.date !== getTodayString()}
              />
            </div>
          ) : (
            <div className="card p-10 text-center h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">No Waiting List Found</h2>
              <p className="text-muted-foreground text-lg">There is no waiting list for the selected date.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
