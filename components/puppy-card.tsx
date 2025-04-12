"use client"

import { useEffect } from "react"
import { PuppyEntry, EntryStatus } from "@/lib/types"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Clock, User } from "lucide-react"

interface PuppyCardProps {
  entry: PuppyEntry
  onStatusChange?: () => void
  disableControls?: boolean
}

const statusColors = {
  WAITING: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-green-100 text-green-800"
}

const statusLabels = {
  WAITING: "Waiting",
  COMPLETED: "Completed"
}

export default function PuppyCard({ entry, onStatusChange, disableControls }: PuppyCardProps) {
  useEffect(() => {
    console.log("PuppyCard received entry:", entry)
  }, [entry])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{entry.puppyName}</h3>
          <Badge variant="outline" className={statusColors[entry.status]}>
            {statusLabels[entry.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{entry.ownerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{new Date(entry.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </CardContent>
      {!disableControls && onStatusChange && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={onStatusChange}
          >
            {entry.status === "WAITING" ? "Mark as Completed" : "Mark as Waiting"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
