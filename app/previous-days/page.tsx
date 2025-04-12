"use client"

import { useState, useEffect } from "react"
import { PuppyEntry, WaitingList } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import PuppyList from "@/components/puppy-list"
import AddPuppyForm from "@/components/add-puppy-form"
import { Calendar, ChevronLeft, Plus } from "lucide-react"
import { waitingListService } from "@/lib/services/waiting-list"
import Link from "next/link"

export default function PreviousDaysPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [entries, setEntries] = useState<PuppyEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [daysWithLists, setDaysWithLists] = useState<string[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadMonthData()
  }, [currentMonth])

  const loadMonthData = async () => {
    try {
      setIsLoading(true)
      const year = currentMonth.getFullYear()
      const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
      const { data, error } = await waitingListService.getListsByMonth(`${year}-${month}`)
      
      if (error) {
        throw new Error(error)
      }

      setDaysWithLists(data || [])
    } catch (error) {
      console.error('Error loading month data:', error)
      toast.error('Failed to load month data')
    } finally {
      setIsLoading(false)
    }
  }

  const loadDayData = async (date: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await waitingListService.getListByDate(date)
      
      if (error) {
        throw new Error(error)
      }

      if (data) {
        const { data: entries, error: entriesError } = await waitingListService.getEntriesByListId(data.id)
        if (entriesError) {
          throw new Error(entriesError)
        }
        setEntries(entries || [])
      } else {
        setEntries([])
      }
    } catch (error) {
      console.error('Error loading day data:', error)
      toast.error('Failed to load day data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    loadDayData(date)
  }

  const handleUpdateStatus = async (entryId: number, newStatus: "WAITING" | "COMPLETED") => {
    try {
      const { error } = await waitingListService.updateEntryStatus(entryId, newStatus)
      if (error) {
        throw new Error(error)
      }

      setEntries(prev => 
        prev.map(entry => 
          entry.id === entryId 
            ? { ...entry, status: newStatus }
            : entry
        )
      )
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleUpdateList = async (updatedEntries: PuppyEntry[]) => {
    try {
      const updatePromises = updatedEntries.map((entry, index) => 
        waitingListService.updateEntryRank(entry.id, index + 1)
      )
      
      await Promise.all(updatePromises)
      setEntries(updatedEntries)
    } catch (error) {
      console.error('Error updating list:', error)
      toast.error('Failed to update list order')
    }
  }

  const isDateWithData = (date: string) => {
    return daysWithLists.includes(date)
  }

  const handleAddPuppy = async (entry: Omit<PuppyEntry, "id" | "status" | "rank">) => {
    try {
      if (!selectedDate) {
        throw new Error('No date selected')
      }

      const { data: list, error: listError } = await waitingListService.getListByDate(selectedDate)
      if (listError) {
        throw new Error(listError)
      }

      if (!list) {
        throw new Error('No waiting list found for this date')
      }

      const { data: newEntry, error: entryError } = await waitingListService.createEntry({
        ...entry,
        waitingListId: list.id
      })
      
      if (entryError) {
        throw new Error(entryError)
      }

      setEntries(prev => [...prev, newEntry])
      setShowAddForm(false)
      toast.success('Puppy added successfully')
    } catch (error) {
      console.error('Error adding puppy:', error)
      toast.error('Failed to add puppy')
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

      <h1 className="text-4xl md:text-5xl font-bold mb-12">Previous Days</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-sm text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, index) => {
              const date = new Date(currentMonth)
              date.setDate(index - date.getDay() + 1)
              const dateString = date.toISOString().split('T')[0]
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
              
              return (
                <div
                  key={index}
                  className={`aspect-square p-2 rounded-lg border ${
                    !isCurrentMonth
                      ? 'bg-transparent border-transparent'
                      : isDateWithData(dateString)
                      ? 'bg-primary/10 border-primary cursor-pointer hover:bg-primary/20'
                      : 'bg-muted/50 border-border cursor-not-allowed'
                  }`}
                  onClick={() => isCurrentMonth && isDateWithData(dateString) && handleDateSelect(dateString)}
                >
                  {isCurrentMonth && (
                    <div className="h-full flex flex-col items-center justify-center">
                      <span className="text-sm font-medium">
                        {date.getDate()}
                      </span>
                      {isDateWithData(dateString) && (
                        <Calendar className="h-4 w-4 mt-1 text-primary" />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span>Days with waiting lists</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedDate ? (
            <div>
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h2>
                    <p className="text-muted-foreground text-lg">{entries.length} puppies on the list</p>
                  </div>
                  <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                    <Plus size={20} />
                    Add Puppy
                  </Button>
                </div>
              </div>

              {showAddForm && (
                <div className="mb-8">
                  <AddPuppyForm onSubmit={handleAddPuppy} />
                </div>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <PuppyList
                  entries={entries}
                  onUpdateList={handleUpdateList}
                  onUpdateStatus={handleUpdateStatus}
                />
              )}
            </div>
          ) : (
            <div className="card p-10 text-center h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">No Date Selected</h2>
              <p className="text-muted-foreground text-lg">Please select a date to view its waiting list.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
