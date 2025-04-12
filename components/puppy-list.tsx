"use client"

import { useState, useEffect } from "react"
import { PuppyEntry, EntryStatus } from "@/lib/types"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { CheckCircle2, Clock, User, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { waitingListService } from "@/lib/services/waiting-list"

interface PuppyListProps {
  entries: PuppyEntry[]
  onUpdateList: (entries: PuppyEntry[]) => void
  onUpdateStatus: (entryId: number, newStatus: EntryStatus) => Promise<void>
}

export default function PuppyList({ entries, onUpdateList, onUpdateStatus }: PuppyListProps) {
  const [selectedStatus, setSelectedStatus] = useState<EntryStatus | "ALL">("ALL")
  
  // Initialize counts based on initial entries
  const initialCounts = entries.reduce((acc, entry) => {
    if (entry.status === "WAITING") acc.waiting++
    if (entry.status === "COMPLETED") acc.completed++
    return acc
  }, { waiting: 0, completed: 0 })
  
  const [counts, setCounts] = useState(initialCounts)

  // Update counts whenever entries change
  useEffect(() => {
    const newCounts = entries.reduce((acc, entry) => {
      if (entry.status === "WAITING") acc.waiting++
      if (entry.status === "COMPLETED") acc.completed++
      return acc
    }, { waiting: 0, completed: 0 })
    setCounts(newCounts)
  }, [entries])

  const handleStatusChange = async (entryId: number, currentStatus: EntryStatus) => {
    try {
      const newStatus: EntryStatus = currentStatus === "WAITING" ? "COMPLETED" : "WAITING"
      const { error } = await waitingListService.updateEntryStatus(entryId, newStatus)
      
      if (error) {
        throw new Error(error)
      }

      await onUpdateStatus(entryId, newStatus)
      toast.success(`Status updated to ${newStatus.toLowerCase()}`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(entries)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onUpdateList(items)
  }

  const filteredEntries = selectedStatus === "ALL" 
    ? entries 
    : entries.filter(entry => entry.status === selectedStatus)

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Today's Appointments</h2>
          <p className="text-sm text-muted-foreground">
            {entries.length} appointment{entries.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedStatus === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("ALL")}
            style={selectedStatus === "ALL" ? { backgroundColor: 'var(--primary)', color: 'white' } : undefined}
          >
            All ({entries.length})
          </Button>
          <Button
            variant={selectedStatus === "WAITING" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("WAITING")}
            style={selectedStatus === "WAITING" ? { backgroundColor: 'var(--primary)', color: 'white' } : undefined}
          >
            Waiting ({counts.waiting})
          </Button>
          <Button
            variant={selectedStatus === "COMPLETED" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("COMPLETED")}
            style={selectedStatus === "COMPLETED" ? { backgroundColor: 'var(--primary)', color: 'white' } : undefined}
          >
            Completed ({counts.completed})
          </Button>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No {selectedStatus.toLowerCase()} appointments
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="appointments" isCombineEnabled={false}>
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="space-y-3"
              >
                {filteredEntries.map((entry, index) => {
                  console.log("Rendering entry:", entry)
                  return (
                    <Draggable 
                      key={entry.id} 
                      draggableId={String(entry.id)} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`group relative flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-muted/50 transition-colors ${
                            snapshot.isDragging ? 'bg-muted/80 shadow-lg' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div {...provided.dragHandleProps} className="cursor-grab">
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              entry.status === "WAITING" 
                                ? "bg-yellow-500" 
                                : "bg-green-500"
                            }`} />
                            <div className="space-y-1">
                              <h3 className="font-medium">{entry.puppyName}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" />
                                  <span>{entry.ownerName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{new Date(entry.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(entry.id, entry.status)}
                            className="hover:bg-muted/80"
                          >
                            {entry.status === "WAITING" ? "Complete" : "Reopen"}
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
