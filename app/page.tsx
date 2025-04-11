"use client"

import { useEffect, useState } from "react"
import PuppyList from "@/components/puppy-list"
import AddPuppyForm from "@/components/add-puppy-form"
import { Button } from "@/components/ui/button"
import { formatDate, getTodayString } from "@/lib/date-utils"
import type { PuppyEntry, WaitingList } from "@/lib/types"
import { getWaitingListForDate, createNewDayList, saveWaitingList } from "@/lib/storage-utils"
import { Calendar, Clock, Scissors } from "lucide-react"

export default function Home() {
  const [todaysList, setTodaysList] = useState<WaitingList | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load today's waiting list
    const today = getTodayString()
    const list = getWaitingListForDate(today)
    setTodaysList(list)
    setIsLoading(false)
  }, [])

  const handleCreateNewDay = () => {
    const newList = createNewDayList()
    setTodaysList(newList)
  }

  const handleAddPuppy = (puppy: PuppyEntry) => {
    if (!todaysList) return

    const updatedList = {
      ...todaysList,
      entries: [...todaysList.entries, puppy],
    }

    saveWaitingList(updatedList)
    setTodaysList(updatedList)
  }

  const handleUpdateList = (updatedEntries: PuppyEntry[]) => {
    if (!todaysList) return

    const updatedList = {
      ...todaysList,
      entries: updatedEntries,
    }

    saveWaitingList(updatedList)
    setTodaysList(updatedList)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>
  }

  return (
    <main>
      <div className="container mx-auto px-6 py-16 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Manage Your <br />
              Puppy Spa <br />
              Waiting List
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              A simple and efficient way to manage your daily puppy spa appointments and keep track of your clients.
            </p>

            {!todaysList && (
              <Button
                onClick={handleCreateNewDay}
                size="lg"
                className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-6 h-auto text-lg"
              >
                Create Today&apos;s List
              </Button>
            )}
          </div>

          <div className="md:col-span-5">
            <div className="pill">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{formatDate(getTodayString())}</span>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Scissors className="h-5 w-5" />
                  <span className="font-medium">Walk-in Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {todaysList ? (
          <>
            <AddPuppyForm onAddPuppy={handleAddPuppy} />

            <div className="mt-16">
              <PuppyList entries={todaysList.entries} onUpdateList={handleUpdateList} />
            </div>
          </>
        ) : (
          <div className="card p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">No Waiting List for Today</h2>
            <p className="mb-6 text-muted-foreground">Create a new waiting list to start adding puppies.</p>
            <Button
              onClick={handleCreateNewDay}
              size="lg"
              className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-6 h-auto text-lg"
            >
              Create Today&apos;s List
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
