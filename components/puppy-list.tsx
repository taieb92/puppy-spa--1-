"use client"

import { useState } from "react"
import type { PuppyEntry } from "@/lib/types"
import PuppyCard from "./puppy-card"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Button } from "./ui/button"

export default function PuppyList({
  entries,
  onUpdateList,
  isHistorical = false,
}: {
  entries: PuppyEntry[]
  onUpdateList: (updatedEntries: PuppyEntry[]) => void
  isHistorical?: boolean
}) {
  const [filter, setFilter] = useState<"all" | "waiting" | "serviced">("all")

  const filteredEntries = entries.filter((entry) => {
    if (filter === "all") return true
    if (filter === "waiting") return !entry.serviced
    if (filter === "serviced") return entry.serviced
    return true
  })

  const handleToggleServiced = (index: number) => {
    const entryIndex = entries.findIndex((e) => e.id === filteredEntries[index].id)
    if (entryIndex === -1) return

    const updatedEntries = [...entries]
    updatedEntries[entryIndex] = {
      ...updatedEntries[entryIndex],
      serviced: !updatedEntries[entryIndex].serviced,
    }

    onUpdateList(updatedEntries)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    // Find the actual indices in the original entries array
    const sourceEntryId = filteredEntries[sourceIndex].id
    const destEntryId = filteredEntries[destinationIndex].id

    const sourceOriginalIndex = entries.findIndex((e) => e.id === sourceEntryId)
    const destOriginalIndex = entries.findIndex((e) => e.id === destEntryId)

    // Reorder the original entries array
    const updatedEntries = [...entries]
    const [removed] = updatedEntries.splice(sourceOriginalIndex, 1)
    updatedEntries.splice(destOriginalIndex, 0, removed)

    onUpdateList(updatedEntries)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">
          {filteredEntries.length} {filteredEntries.length === 1 ? "Puppy" : "Puppies"}
          {filter === "waiting" ? " Waiting" : filter === "serviced" ? " Serviced" : ""}
        </h2>

        <div className="flex items-center gap-2 bg-muted p-1 rounded-full">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className={`rounded-full ${filter === "all" ? "bg-white shadow-sm" : ""}`}
          >
            All
          </Button>
          <Button
            variant={filter === "waiting" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("waiting")}
            className={`rounded-full ${filter === "waiting" ? "bg-white shadow-sm" : ""}`}
          >
            Waiting
          </Button>
          <Button
            variant={filter === "serviced" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("serviced")}
            className={`rounded-full ${filter === "serviced" ? "bg-white shadow-sm" : ""}`}
          >
            Serviced
          </Button>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-lg">
            No puppies {filter === "waiting" ? "waiting" : filter === "serviced" ? "serviced" : ""} yet
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="puppies" isDropDisabled={isHistorical}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                {filteredEntries.map((entry, index) => (
                  <Draggable key={entry.id} draggableId={entry.id} index={index} isDragDisabled={isHistorical}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <PuppyCard
                          entry={entry}
                          onToggleServiced={() => handleToggleServiced(index)}
                          disableControls={isHistorical}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
