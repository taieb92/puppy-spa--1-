"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { PuppyEntry } from "@/lib/types"

interface AddPuppyFormProps {
  onSubmit: (entry: Omit<PuppyEntry, "id" | "status" | "rank">) => Promise<void>
  waitingListId: number
}

interface FormData {
  puppyName: string
  ownerName: string
  serviceRequired: string
  arrivalTime: string
}

export default function AddPuppyForm({ onSubmit, waitingListId }: AddPuppyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    puppyName: "",
    ownerName: "",
    serviceRequired: "",
    arrivalTime: new Date().toISOString().split('T')[1].substring(0, 5)
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      await onSubmit({
        ...formData,
        waitingListId,
        arrivalTime: `${new Date().toISOString().split('T')[0]}T${formData.arrivalTime}:00Z`
      })
      setFormData({
        puppyName: "",
        ownerName: "",
        serviceRequired: "",
        arrivalTime: new Date().toISOString().split('T')[1].substring(0, 5)
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to add puppy')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="puppyName">Puppy Name</Label>
          <Input
            id="puppyName"
            value={formData.puppyName}
            onChange={handleChange}
            required
            placeholder="Enter puppy name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            placeholder="Enter owner name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serviceRequired">Service Required</Label>
          <Input
            id="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            required
            placeholder="Enter service required"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalTime">Arrival Time</Label>
          <Input
            id="arrivalTime"
            type="time"
            value={formData.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-black hover:bg-black/90 text-white rounded-full" size="lg">
        {isSubmitting ? 'Adding...' : 'Add Puppy'}
      </Button>
    </form>
  )
}
