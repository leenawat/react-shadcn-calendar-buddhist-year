"use client"

import * as React from "react"
import { CalendarBuddhist, toBuddhistYear } from "@/components/ui/calendar-buddhist"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

export default function BuddhistCalendarDemo() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  })
  const [pickerDate, setPickerDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            A date field component that allows users to enter and edit date with Buddhist Era (พ.ศ.) support.
          </p>
        </div>

        {/* Basic Example */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Basic Example</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Calendar with Buddhist Era year display and dropdown navigation
            </p>
          </div>
          <div className="flex justify-center">
            <CalendarBuddhist
              mode="single"
              selected={singleDate}
              onSelect={setSingleDate}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </div>
        </div>

        {/* Examples Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Examples</h2>
            <p className="text-muted-foreground">
              Different ways to use the Buddhist calendar component
            </p>
          </div>

          {/* Range Calendar */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Range Calendar</h3>
              <p className="text-sm text-muted-foreground">Select a date range with Buddhist Era dates</p>
            </div>
            <div className="flex justify-center">
              <CalendarBuddhist
                mode="range"
                selected={rangeDate}
                onSelect={setRangeDate}
                defaultMonth={rangeDate?.from}
                numberOfMonths={2}
                className="rounded-md border shadow-sm"
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Date of Birth Picker</h3>
              <p className="text-sm text-muted-foreground">Date picker with Buddhist Era in a popover</p>
            </div>
            <div className="flex flex-col gap-3 max-w-xs">
              <Label htmlFor="buddhist-date" className="px-1">
                Date of birth
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="buddhist-date"
                    className="w-48 justify-between font-normal"
                  >
                    {pickerDate ? (
                      pickerDate.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    ) : (
                      "Select date"
                    )}
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarBuddhist
                    mode="single"
                    selected={pickerDate}
                    onSelect={(date) => {
                      setPickerDate(date)
                      setOpen(false)
                    }}
                    defaultMonth={pickerDate}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              
              {pickerDate && (
                <div className="rounded-lg border bg-muted/50 p-3 space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Selected Date</p>
                    <p className="text-sm font-medium">
                      {pickerDate.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">พ.ศ.</span>
                      <span className="ml-1 font-mono">{toBuddhistYear(pickerDate)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ค.ศ.</span>
                      <span className="ml-1 font-mono">{pickerDate.getFullYear()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Installation & Usage */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Installation</h2>
            <div className="rounded-lg border bg-muted/50 p-4">
              <code className="text-sm">npm install react-day-picker date-fns</code>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Usage</h2>
            <div className="rounded-lg border bg-muted/50 p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { CalendarBuddhist } from "@/components/ui/calendar-buddhist"

const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <CalendarBuddhist
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border shadow-sm"
    captionLayout="dropdown"
  />
)`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Thai Locale Support</h3>
              <p className="text-sm text-muted-foreground">
                Automatic conversion between Gregorian and Buddhist Era years (พ.ศ.)
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Full Compatibility</h3>
              <p className="text-sm text-muted-foreground">
                Works with all shadcn/ui calendar features: single, range, multiple months
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Drop-in Replacement</h3>
              <p className="text-sm text-muted-foreground">
                Replace the standard calendar component with no configuration needed
              </p>
            </div>
          </div>
        </div>

        {/* Year Reference */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Year Conversion Reference</h2>
          <div className="rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Buddhist Era (พ.ศ.)</th>
                  <th className="p-3 text-left font-medium">Gregorian (ค.ศ.)</th>
                  <th className="p-3 text-left font-medium">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">2568</td>
                  <td className="p-3">2025</td>
                  <td className="p-3 text-muted-foreground">Current Year</td>
                </tr>
                <tr>
                  <td className="p-3">2567</td>
                  <td className="p-3">2024</td>
                  <td className="p-3 text-muted-foreground">Last Year</td>
                </tr>
                <tr>
                  <td className="p-3">2543</td>
                  <td className="p-3">2000</td>
                  <td className="p-3 text-muted-foreground">Start of 21st Century</td>
                </tr>
                <tr>
                  <td className="p-3">2500</td>
                  <td className="p-3">1957</td>
                  <td className="p-3 text-muted-foreground">Mid-century</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            Formula: Buddhist Year = Gregorian Year + 543
          </p>
        </div>
      </div>
    </div>
  )
}
