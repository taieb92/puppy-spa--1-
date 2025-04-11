import type { PuppyEntry, WaitingList } from "./types"
import { getTodayString } from "./date-utils"

const STORAGE_KEY = "puppy-spa-waiting-lists"

// Get all waiting lists from localStorage
export function getAllWaitingLists(): WaitingList[] {
  if (typeof window === "undefined") return []

  const listsJson = localStorage.getItem(STORAGE_KEY)
  if (!listsJson) return []

  try {
    return JSON.parse(listsJson)
  } catch (error) {
    console.error("Error parsing waiting lists from localStorage:", error)
    return []
  }
}

// Save all waiting lists to localStorage
export function saveAllWaitingLists(lists: WaitingList[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  } catch (error) {
    console.error("Error saving waiting lists to localStorage:", error)
  }
}

// Get a waiting list for a specific date
export function getWaitingListForDate(date: string): WaitingList | null {
  const allLists = getAllWaitingLists()
  return allLists.find((list) => list.date === date) || null
}

// Save a waiting list (creates or updates)
export function saveWaitingList(list: WaitingList): void {
  const allLists = getAllWaitingLists()
  const existingIndex = allLists.findIndex((l) => l.date === list.date)

  if (existingIndex >= 0) {
    allLists[existingIndex] = list
  } else {
    allLists.push(list)
  }

  saveAllWaitingLists(allLists)
}

// Create a new day's waiting list
export function createNewDayList(): WaitingList {
  const today = getTodayString()
  const newList: WaitingList = {
    date: today,
    entries: [],
  }

  saveWaitingList(newList)
  return newList
}

// Get all dates that have waiting lists
export function getAllWaitingListDates(): string[] {
  const allLists = getAllWaitingLists()
  return allLists
    .map((list) => list.date)
    .sort((a, b) => {
      // Sort in descending order (newest first)
      return new Date(b).getTime() - new Date(a).getTime()
    })
}

// Search all waiting lists for a puppy or owner
export function searchAllWaitingLists(searchTerm: string): { entry: PuppyEntry; list: WaitingList }[] {
  const allLists = getAllWaitingLists()
  const results: { entry: PuppyEntry; list: WaitingList }[] = []

  const term = searchTerm.toLowerCase().trim()

  allLists.forEach((list) => {
    list.entries.forEach((entry) => {
      if (entry.puppyName.toLowerCase().includes(term) || entry.ownerName.toLowerCase().includes(term)) {
        results.push({ entry, list })
      }
    })
  })

  return results
}
