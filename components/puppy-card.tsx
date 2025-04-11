"use client"

import type { PuppyEntry } from "@/lib/types"
import { formatTime } from "@/lib/date-utils"
import { Check, GripVertical, Scissors, Clock, User } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function PuppyCard({
  entry,
  onToggleServiced,
  disableControls = false,
}: {
  entry: PuppyEntry
  onToggleServiced: () => void
  disableControls?: boolean
}) {
  // Determine background color based on index (for visual variety)
  const getBgColor = () => {
    const colors = ["#FFD166", "#06D6A0", "#FF9671"]
    const hash = entry.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <div className={`card transition-all ${entry.serviced ? "bg-muted/30" : "bg-white"}`}>
      <div className="flex items-center gap-6">
        {!disableControls && (
          <div className="text-muted-foreground">
            <GripVertical size={24} />
          </div>
        )}

        <div className="h-16 w-16 rounded-full flex-shrink-0" style={{ backgroundColor: getBgColor() }}>
          <div className="h-full w-full flex items-center justify-center text-2xl font-bold">
            {entry.puppyName.charAt(0)}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h3 className="font-bold text-xl">
              {entry.puppyName}
              {entry.serviced && (
                <Badge variant="outline" className="ml-2 bg-black/5 text-black border-black/10">
                  Serviced
                </Badge>
              )}
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={16} />
              <span>{entry.ownerName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Scissors size={16} />
              <span>{entry.service}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={16} />
              <span>Arrived at {formatTime(entry.arrivalTime)}</span>
            </div>
          </div>
        </div>

        {!disableControls && (
          <Button
            variant={entry.serviced ? "outline" : "default"}
            size="lg"
            className={`rounded-full min-w-[120px] ${
              entry.serviced ? "border-black/20 text-black hover:bg-black/5" : "bg-black hover:bg-black/90 text-white"
            }`}
            onClick={onToggleServiced}
          >
            {entry.serviced ? (
              <>Undo</>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Done
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
