export type EntryStatus = "WAITING" | "COMPLETED"

export interface PuppyEntry {
  id: number
  puppyName: string
  ownerName: string
  service: string
  status: EntryStatus
  requestedServiceDate: string
  arrivalTime: string
}

export interface WaitingList {
  id: number
  date: string
  entries: PuppyEntry[]
}
