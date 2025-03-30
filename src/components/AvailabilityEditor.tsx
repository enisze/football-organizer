"use client"

import { cn } from "@/lib/utils/cn"
import { Button } from "@/ui/button"
import { Card, CardContent } from "@/ui/card"
import { Input } from "@/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip"
import { AlertCircle, Clock } from "lucide-react"
import { useEffect, useState } from "react"


interface AvailabilityEditorProps {
  date: Date
  isWeekend: boolean
}

// Time slots for the day
const generateTimeSlots = (isWeekend: boolean) => {
  const slots = []
  const startHour = isWeekend ? 10 : 18
  const endHour = 23

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push({
        time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        available: false,
      })
    }
  }

  return slots
}

// Convert time string to minutes for comparison
const timeToMinutes = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number)
  return (hours ?? 0) * 60 + (minutes ?? 0)
}

export function AvailabilityEditor({ date, isWeekend }: AvailabilityEditorProps) {
  const [timeSlots, setTimeSlots] = useState(() => generateTimeSlots(isWeekend))
  const [isDragging, setIsDragging] = useState(false)
  const [dragValue, setDragValue] = useState(false)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [error, setError] = useState("")

  // Reset time slots when date or weekend status changes
  useEffect(() => {
    setTimeSlots(generateTimeSlots(isWeekend))
  }, [date, isWeekend])

  // Add global mouse up handler to stop dragging even if mouse leaves the component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
      }
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging])

  const handleMouseDown = (index: number) => {
    const newSlots = [...timeSlots]
    // Toggle the current slot
    const newValue = newSlots[index] ? !newSlots[index].available : false
    if (newSlots[index]) {
      newSlots[index].available = newValue
    }
    setTimeSlots(newSlots)

    // Start dragging and set the drag value to the new state
    setIsDragging(true)
    setDragValue(newValue)
  }

  const handleMouseEnter = (index: number) => {
    if (isDragging) {
      const newSlots = [...timeSlots]
      if (newSlots[index]) {
        newSlots[index].available = dragValue
      }
      setTimeSlots(newSlots)
    }
  }

  const handleSelectAll = () => {
    // Check if all slots are already selected
    const allSelected = timeSlots.every((slot) => slot.available)

    // Toggle all slots
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        available: !allSelected,
      })),
    )
  }

  const handleAddTimeSlot = () => {
    setError("")

    if (!startTime || !endTime) {
      setError("Please enter both start and end times")
      return
    }

    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    if (startMinutes >= endMinutes) {
      setError("End time must be after start time")
      return
    }

    const minStartHour = isWeekend ? 10 : 18
    const minStartMinutes = minStartHour * 60
    const maxEndMinutes = 23 * 60 + 30

    if (startMinutes < minStartMinutes) {
      setError(`Start time must be after ${minStartHour}:00 for ${isWeekend ? "weekends" : "weekdays"}`)
      return
    }

    if (endMinutes > maxEndMinutes) {
      setError("End time must be before 23:30")
      return
    }

    // Update time slots
    const newSlots = [...timeSlots]
    newSlots.forEach((slot, index) => {
      const slotMinutes = timeToMinutes(slot.time)
      if (slotMinutes >= startMinutes && slotMinutes < endMinutes) {
        if (newSlots[index]) {
          newSlots[index].available = true
        }
      }
    })

    setTimeSlots(newSlots)
    setStartTime("")
    setEndTime("")
  }

  return (
    <div className="select-none">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          <h3 className="font-medium">
            {isWeekend ? "Weekend Availability (10:00-23:00)" : "Weekday Availability (18:00-23:00)"}
          </h3>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" onClick={handleSelectAll} className="w-full sm:w-auto">
            {timeSlots.every((slot) => slot.available) ? "Deselect All Times" : "Select All Times"}
          </Button>

          <Card className="w-full sm:w-auto">
            <CardContent className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">From</p>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    min={isWeekend ? "10:00" : "18:00"}
                    max="23:00"
                    className="h-9"
                  />
                </div>

                <div>
                  <p className="mb-1 text-xs text-muted-foreground">To</p>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    min={isWeekend ? "10:30" : "18:30"}
                    max="23:30"
                    className="h-9"
                  />
                </div>
              </div>

              <Button onClick={handleAddTimeSlot} className="w-full sm:w-auto">
                Add Time Slot
              </Button>

              {error && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-destructive">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{error}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={cn(
              "flex h-12 cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-colors",
              slot.available
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background hover:bg-accent hover:text-accent-foreground",
            )}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={() => setIsDragging(false)}
          >
            {slot.time}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>Click and drag to select or deselect multiple time slots at once.</p>
      </div>
    </div>
  )
}

