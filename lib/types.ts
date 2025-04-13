export type EntryStatus = "WAITING" | "COMPLETED"

export interface PuppyEntry {
  id: number
  waitingListId: number
  ownerName: string
  puppyName: string
  serviceRequired: string
  arrivalTime: string
  status: 'WAITING' | 'COMPLETED'
  rank: number
}

export interface WaitingList {
  id: number
  date: string
  entries: PuppyEntry[]
}
