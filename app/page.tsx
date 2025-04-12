"use client"

import { useState, useEffect } from "react"
import { PuppyEntry, WaitingList } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import PuppyList from "@/components/puppy-list"
import AddPuppyForm from "@/components/add-puppy-form"
import { waitingListService } from "@/lib/services/waiting-list"
import { EmptyState } from "@/components/ui/empty-state"

export default function Home() {
  const [waitingList, setWaitingList] = useState<WaitingList | null>(null)
  const [entries, setEntries] = useState<PuppyEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadTodaysList()
  }, [])

  const loadTodaysList = async () => {
    try {
      setIsLoading(true)
      const today = new Date().toISOString().split('T')[0]
      
      // Get or create waiting list for today
      const { data: list, error: listError } = await waitingListService.getListByDate(today)
      if (listError) {
        throw new Error(listError)
      }

      if (list) {
        setWaitingList(list)
        // Get entries for the list
        const { data: listEntries, error: entriesError } = await waitingListService.getEntriesByListId(list.id)
        if (entriesError) {
          throw new Error(entriesError)
        }
        setEntries(listEntries || [])
      } else {
        setWaitingList(null)
        setEntries([])
      }
    } catch (error) {
      console.error('Error loading today\'s list:', error)
      toast.error('Failed to load today\'s list')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNewDay = async () => {
    try {
      setIsCreating(true)
      const today = new Date().toISOString().split('T')[0]
      
      const { data: newList, error } = await waitingListService.createList(today)
      if (error) {
        throw new Error(error)
      }

      setWaitingList(newList)
      setEntries([])
      toast.success('New day created successfully')
    } catch (error) {
      console.error('Error creating new day:', error)
      toast.error('Failed to create new day')
    } finally {
      setIsCreating(false)
    }
  }

  const handleAddPuppy = async (entry: Omit<PuppyEntry, "id" | "status" | "rank">) => {
    try {
      if (!waitingList) {
        throw new Error('No waiting list found')
      }

      const { data: newEntry, error } = await waitingListService.createEntry({
        ...entry,
        waitingListId: waitingList.id
      })
      
      if (error) {
        throw new Error(error)
      }

      setEntries(prev => [...prev, newEntry])
      toast.success('Puppy added successfully')
    } catch (error) {
      console.error('Error adding puppy:', error)
      toast.error('Failed to add puppy')
    }
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
      // Update ranks for all entries
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Puppy Spa</h1>
        {!waitingList && (
          <Button 
            onClick={handleCreateNewDay} 
            disabled={isCreating}
            className="bg-black text-white rounded-full px-6 py-3 flex items-center gap-2"
          >
            {isCreating ? 'Creating...' : 'Start New Day'}
          </Button>
        )}
      </div>

      {waitingList ? (
        <div className="space-y-8">
          <AddPuppyForm onSubmit={handleAddPuppy} />
          <PuppyList 
            entries={entries}
            onUpdateList={handleUpdateList}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      ) : (
        <EmptyState
          title="No Active Waiting List"
          description="Start a new day to begin managing your puppy spa appointments. Create a waiting list to track appointments and manage your schedule efficiently."
          buttonText="Start New Day"
          onButtonClick={handleCreateNewDay}
          isLoading={isCreating}
        />
      )}
    </main>
  )
}
