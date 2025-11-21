"use client"

import * as React from "react"
import { CalendarBuddhist, toBuddhistYear } from "./calendar-buddhist"
import type { DateRange } from "react-day-picker"

// ตัวอย่างที่ 1: Single Date Selection
export function BuddhistCalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4">
      <CalendarBuddhist
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
        fromYear={2400} // พ.ศ. 2400 = ค.ศ. 1857
        toYear={2600}  // พ.ศ. 2600 = ค.ศ. 2057
      />
      {date && (
        <div className="text-sm">
          <p>วันที่เลือก: {date.toLocaleDateString("th-TH")}</p>
          <p>
            พ.ศ. {toBuddhistYear(date)} / ค.ศ. {date.getFullYear()}
          </p>
        </div>
      )}
    </div>
  )
}

// ตัวอย่างที่ 2: Date Range Selection
export function BuddhistCalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 0, 15),
  })

  return (
    <div className="flex flex-col gap-4">
      <CalendarBuddhist
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
        className="rounded-md border shadow-sm"
      />
      {dateRange?.from && (
        <div className="text-sm">
          <p>
            ตั้งแต่: {dateRange.from.toLocaleDateString("th-TH")} (พ.ศ.{" "}
            {toBuddhistYear(dateRange.from)})
          </p>
          {dateRange.to && (
            <p>
              ถึง: {dateRange.to.toLocaleDateString("th-TH")} (พ.ศ.{" "}
              {toBuddhistYear(dateRange.to)})
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ตัวอย่างที่ 3: With Popover (Date Picker)
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"

export function BuddhistDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="buddhist-date">วันเกิด</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="buddhist-date"
            className="w-64 justify-start font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              <span>
                {date.toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            ) : (
              <span>เลือกวันที่</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarBuddhist
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            captionLayout="dropdown"
            fromYear={2400}
            toYear={2600}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// ตัวอย่างที่ 4: Thai Locale with Buddhist Year
export function BuddhistCalendarThai() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4">
      <CalendarBuddhist
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
        locale={{
          localize: {
            day: (n: number) => ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"][n],
            month: (n: number) =>
              [
                "มกราคม",
                "กุมภาพันธ์",
                "มีนาคม",
                "เมษายน",
                "พฤษภาคม",
                "มิถุนายน",
                "กรกฎาคม",
                "สิงหาคม",
                "กันยายน",
                "ตุลาคม",
                "พฤศจิกายน",
                "ธันวาคม",
              ][n],
          },
          formatLong: {},
          code: "th",
          options: {
            weekStartsOn: 0,
          },
        }}
      />
      {date && (
        <div className="text-sm space-y-1">
          <p className="font-semibold">
            {date.toLocaleDateString("th-TH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-muted-foreground">
            Buddhist Era: {toBuddhistYear(date)} | Gregorian: {date.getFullYear()}
          </p>
        </div>
      )}
    </div>
  )
}

// ตัวอย่างที่ 5: All in One Demo
export function BuddhistCalendarShowcase() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>()

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Buddhist Calendar (ปฏิทินพุทธศักราช)</h2>
        <p className="text-muted-foreground mb-6">
          Custom calendar component for shadcn/ui that displays dates in Buddhist Era (BE)
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Single Date Selection</h3>
          <CalendarBuddhist
            mode="single"
            selected={singleDate}
            onSelect={setSingleDate}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown"
          />
          {singleDate && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Selected Date:</p>
              <p className="text-lg">
                {singleDate.toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                พ.ศ. {toBuddhistYear(singleDate)} = ค.ศ. {singleDate.getFullYear()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Date Range Selection</h3>
          <CalendarBuddhist
            mode="range"
            selected={rangeDate}
            onSelect={setRangeDate}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown"
          />
          {rangeDate?.from && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div>
                <p className="text-sm font-medium">From:</p>
                <p>{rangeDate.from.toLocaleDateString("th-TH")}</p>
              </div>
              {rangeDate.to && (
                <div>
                  <p className="text-sm font-medium">To:</p>
                  <p>{rangeDate.to.toLocaleDateString("th-TH")}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
