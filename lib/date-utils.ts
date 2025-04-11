export function getTodayString(): string {
  const today = new Date()
  return today.toISOString().split("T")[0] // YYYY-MM-DD format
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export function formatTime(timeString: string): string {
  return timeString
}
