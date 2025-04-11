"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import type { PuppyEntry } from "@/lib/types"
import { getCurrentTime } from "@/lib/date-utils"
import { PlusCircle } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

export default function AddPuppyForm({
  onAddPuppy,
}: {
  onAddPuppy: (puppy: PuppyEntry) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [puppyName, setPuppyName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [service, setService] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!puppyName.trim() || !ownerName.trim() || !service.trim()) {
      return
    }

    const newPuppy: PuppyEntry = {
      id: uuidv4(),
      puppyName: puppyName.trim(),
      ownerName: ownerName.trim(),
      service: service.trim(),
      arrivalTime: getCurrentTime(),
      serviced: false,
    }

    onAddPuppy(newPuppy)

    // Reset form
    setPuppyName("")
    setOwnerName("")
    setService("")
    setIsExpanded(false)
  }

  return (
    <div className="card">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-black hover:bg-black/90 text-white h-14 text-lg rounded-full"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New Puppy to Waiting List
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold">Add New Puppy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="puppyName" className="text-base">
                Puppy Name
              </Label>
              <Input
                id="puppyName"
                value={puppyName}
                onChange={(e) => setPuppyName(e.target.value)}
                placeholder="Enter puppy name"
                className="rounded-full h-14"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName" className="text-base">
                Owner Name
              </Label>
              <Input
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter owner name"
                className="rounded-full h-14"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="text-base">
              Service Required
            </Label>
            <Input
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="e.g. Bath, Haircut, Nail Trimming"
              className="rounded-full h-14"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(false)}
              className="rounded-full border-black text-black hover:bg-black/5"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-black hover:bg-black/90 text-white rounded-full">
              Add to Waiting List
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
