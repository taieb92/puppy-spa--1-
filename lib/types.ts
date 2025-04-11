export interface PuppyEntry {
  id: string
  puppyName: string
  ownerName: string
  service: string
  arrivalTime: string
  serviced: boolean
}

export interface WaitingList {
  date: string // YYYY-MM-DD format
  entries: PuppyEntry[]
}
