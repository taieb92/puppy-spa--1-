import type { PuppyEntry, WaitingList } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL 

interface ApiResponse<T> {
  data: T | null
  error: string | null
}

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Origin': typeof window !== 'undefined' ? window.location.origin : '',
  'Referer': typeof window !== 'undefined' ? window.location.href : '',
})

export const waitingListService = {
  // List operations
  async createList(date: string): Promise<ApiResponse<WaitingList>> {
    try {
      const response = await fetch(`${BASE_URL}/waiting-lists`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ date })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      console.error('Error creating waiting list:', error)
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  async getListByDate(date: string): Promise<ApiResponse<WaitingList>> {
    try {
      const response = await fetch(`${BASE_URL}/waiting-lists/date/${date}`, {
        headers: getHeaders(),
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching waiting list:', error)
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Entry operations
  async createEntry(entry: Omit<PuppyEntry, "id" | "status" | "rank">): Promise<ApiResponse<PuppyEntry>> {
    try {
      console.log('Raw entry data:', entry); // Debug log

      // Validate serviceRequired
      if (!entry.serviceRequired || typeof entry.serviceRequired !== 'string') {
        console.error('Invalid serviceRequired:', entry.serviceRequired); // Debug log
        throw new Error('Service required is mandatory and must be a string');
      }

      // Format arrivalTime to ISO 8601
      let formattedArrivalTime: string;
      try {
        const date = new Date(entry.arrivalTime);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date format');
        }
        formattedArrivalTime = date.toISOString();
      } catch (error) {
        throw new Error('Invalid arrival time format. Must be a valid date string');
      }

      const formattedEntry = {
        waitingListId: entry.waitingListId,
        ownerName: entry.ownerName,
        puppyName: entry.puppyName,
        serviceRequired: entry.serviceRequired,
        arrivalTime: formattedArrivalTime
      };

      console.log('Formatted entry data:', formattedEntry); // Debug log

      const response = await fetch(`${BASE_URL}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedEntry)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error('Error creating entry:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async getEntriesByListId(listId: number): Promise<ApiResponse<PuppyEntry[]>> {
    try {
      const response = await fetch(`${BASE_URL}/entries/list?listId=${listId}`, {
        headers: getHeaders(),
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching entries:', error)
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  async updateEntryStatus(entryId: number, status: "WAITING" | "COMPLETED"): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${BASE_URL}/entries/${entryId}/status`, {
        method: 'PUT',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ status })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return { data: null, error: null }
    } catch (error) {
      console.error('Error updating entry status:', error)
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  async updateEntryRank(entryId: number, rank: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${BASE_URL}/entries/${entryId}/rank`, {
        method: 'PUT',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ rank })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return { data: null, error: null }
    } catch (error) {
      console.error('Error updating entry rank:', error)
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Search operations
  async searchEntries(query: string): Promise<ApiResponse<PuppyEntry[]>> {
    try {
      const response = await fetch(`${BASE_URL}/entries/list?q=${encodeURIComponent(query)}`, {
        headers: getHeaders(),
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      console.error('Error searching entries:', error)
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  async getListsByMonth(month: string): Promise<ApiResponse<{ month: string; waitingLists: WaitingList[] }>> {
    try {
      const response = await fetch(`${BASE_URL}/waiting-lists/month/${month}`, {
        headers: getHeaders(),
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching lists by month:', error)
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },
} 