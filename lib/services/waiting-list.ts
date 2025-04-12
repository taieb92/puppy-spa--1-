import type { PuppyEntry, WaitingList } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

interface ApiResponse<T> {
  data: T
  error?: string
}

export const waitingListService = {
  // List operations
  createList: async (date: string): Promise<ApiResponse<WaitingList>> => {
    try {
      const response = await fetch(`${BASE_URL}/waiting-lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create list: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: {} as WaitingList, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }
  },

  getListByDate: async (date: string): Promise<ApiResponse<WaitingList>> => {
    try {
      const response = await fetch(`${BASE_URL}/waiting-lists/date/${date}`)

      if (!response.ok) {
        throw new Error(`Failed to get list: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: {} as WaitingList, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }
  },

  // Entry operations
  createEntry: async (entry: Omit<PuppyEntry, "id" | "status" | "rank"> & { waitingListId: number }): Promise<ApiResponse<PuppyEntry>> => {
    try {
      const response = await fetch(`${BASE_URL}/waiting-list-entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waitingListId: entry.waitingListId,
          ownerName: entry.ownerName,
          puppyName: entry.puppyName,
          serviceRequired: entry.service,
          arrivalTime: new Date(`${entry.requestedServiceDate}T${entry.arrivalTime}`).toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create entry: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: {} as PuppyEntry, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }
  },

  getEntriesByListId: async (listId: number): Promise<ApiResponse<PuppyEntry[]>> => {
    try {
      const response = await fetch(`${BASE_URL}/waiting-list-entries/list/${listId}`)

      if (!response.ok) {
        throw new Error(`Failed to get entries: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: [], 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }
  },

  updateEntryStatus: async (entryId: number, status: "WAITING" | "COMPLETED"): Promise<ApiResponse<PuppyEntry>> => {
    try {
      const response = await fetch(`${BASE_URL}/waiting-list-entries/${entryId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update entry status: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: {} as PuppyEntry, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }
  },

  updateEntryRank: async (entryId: number, rank: number): Promise<ApiResponse<PuppyEntry>> => {
    try {
      const response = await fetch(`${BASE_URL}/waiting-list-entries/${entryId}/rank`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rank }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update entry rank: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: {} as PuppyEntry, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }
  },

  // Search operations
  searchEntries: async (query: string): Promise<ApiResponse<{ entry: PuppyEntry; list: WaitingList }[]>> => {
    try {
      const response = await fetch(`${BASE_URL}/search/entries?q=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error(`Failed to search entries: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: [], 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }
  },

  getListsByMonth: async (month: string): Promise<ApiResponse<string[]>> => {
    try {
      const response = await fetch(`/api/waiting-lists/month/${month}`)
      const data = await response.json()
      
      if (!response.ok) {
        return { data: [], error: data.error || 'Failed to fetch waiting lists for month' }
      }
      
      return { data: data || [] }
    } catch (error) {
      console.error('Error fetching waiting lists for month:', error)
      return { data: [], error: 'Failed to fetch waiting lists for month' }
    }
  },
} 