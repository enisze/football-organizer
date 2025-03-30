"use client"

import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { AvailabilityEditor } from "@/src/components/AvailabilityEditor"
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"

export default function MyAvailabilityPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="ml-4 text-2xl font-bold">My Availability</h1>
        <div className="ml-auto">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            {saved ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Instructions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Select a date on the calendar</li>
              <li>• Click and drag to set available times</li>
              <li>• Weekdays: 18:00-23:00 available</li>
              <li>• Weekends: 10:00-23:00 available</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold">
            {date ? (
              <>
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {isWeekend(date!) ? "(Weekend)" : "(Weekday)"}
                </span>
              </>
            ) : (
              "Select a date"
            )}
          </h2>

          {date && <AvailabilityEditor date={date} isWeekend={isWeekend(date)} />}
        </div>
      </div>
    </div>
  )
}

