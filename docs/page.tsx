"use client"

import * as React from "react"
import { CalendarBuddhist, toBuddhistYear } from "./calendar-buddhist"
import type { DateRange } from "react-day-picker"

export default function BuddhistCalendarDemo() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 0, 15),
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Buddhist Calendar Component
          </h1>
          <p className="text-xl text-muted-foreground">
            ปฏิทินพุทธศักราช สำหรับ shadcn/ui
          </p>
          <p className="text-sm text-muted-foreground">
            Custom calendar component that displays dates in Buddhist Era (BE)
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Single Date Selection */}
          <div className="space-y-4">
            <div className="bg-card rounded-lg border shadow-sm p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  Single Date Selection
                </h2>
                <p className="text-sm text-muted-foreground">
                  เลือกวันที่เดียว พร้อม dropdown เดือนและปี
                </p>
              </div>

              <CalendarBuddhist
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                className="rounded-lg border shadow-sm mx-auto"
                captionLayout="dropdown"
                fromYear={2400}
                toYear={2600}
              />

              {singleDate && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Selected Date
                    </p>
                    <p className="text-lg font-semibold">
                      {singleDate.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Buddhist Era</p>
                      <p className="text-lg font-mono">
                        {toBuddhistYear(singleDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gregorian</p>
                      <p className="text-lg font-mono">
                        {singleDate.getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date Range Selection */}
          <div className="space-y-4">
            <div className="bg-card rounded-lg border shadow-sm p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  Date Range Selection
                </h2>
                <p className="text-sm text-muted-foreground">
                  เลือกช่วงวันที่
                </p>
              </div>

              <CalendarBuddhist
                mode="range"
                selected={rangeDate}
                onSelect={setRangeDate}
                className="rounded-lg border shadow-sm mx-auto"
                captionLayout="dropdown"
              />

              {rangeDate?.from && (
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      From
                    </p>
                    <p className="text-base font-semibold">
                      {rangeDate.from.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      พ.ศ. {toBuddhistYear(rangeDate.from)} (ค.ศ.{" "}
                      {rangeDate.from.getFullYear()})
                    </p>
                  </div>

                  {rangeDate.to && (
                    <div className="pt-3 border-t">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        To
                      </p>
                      <p className="text-base font-semibold">
                        {rangeDate.to.toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        พ.ศ. {toBuddhistYear(rangeDate.to)} (ค.ศ.{" "}
                        {rangeDate.to.getFullYear()})
                      </p>
                    </div>
                  )}

                  {rangeDate.to && (
                    <div className="pt-3 border-t">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Duration
                      </p>
                      <p className="text-base font-semibold">
                        {Math.ceil(
                          (rangeDate.to.getTime() - rangeDate.from.getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) + 1}{" "}
                        days
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <div className="mb-2 text-2xl">🇹🇭</div>
            <h3 className="font-semibold mb-1">Thai Locale</h3>
            <p className="text-sm text-muted-foreground">
              Built-in support for Thai language and Buddhist Era dates
            </p>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6">
            <div className="mb-2 text-2xl">📅</div>
            <h3 className="font-semibold mb-1">Full Features</h3>
            <p className="text-sm text-muted-foreground">
              All shadcn/ui calendar features: single, range, multiple months
            </p>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6">
            <div className="mb-2 text-2xl">⚡</div>
            <h3 className="font-semibold mb-1">Easy Integration</h3>
            <p className="text-sm text-muted-foreground">
              Drop-in replacement for standard shadcn calendar component
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-card rounded-lg border shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Usage Example</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { CalendarBuddhist } from "@/components/ui/calendar-buddhist"

export function MyCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <CalendarBuddhist
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      fromYear={2400}  // พ.ศ. 2400
      toYear={2600}    // พ.ศ. 2600
    />
  )
}`}</code>
          </pre>
        </div>

        {/* Comparison Table */}
        <div className="bg-card rounded-lg border shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Year Conversion Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Buddhist Era (พ.ศ.)</th>
                  <th className="text-left p-2">Gregorian (ค.ศ.)</th>
                  <th className="text-left p-2">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-2 font-mono">2568</td>
                  <td className="p-2 font-mono">2025</td>
                  <td className="p-2 text-muted-foreground">Current Year</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">2567</td>
                  <td className="p-2 font-mono">2024</td>
                  <td className="p-2 text-muted-foreground">Last Year</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">2500</td>
                  <td className="p-2 font-mono">1957</td>
                  <td className="p-2 text-muted-foreground">-</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">2443</td>
                  <td className="p-2 font-mono">1900</td>
                  <td className="p-2 text-muted-foreground">Start of 20th Century</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">2543</td>
                  <td className="p-2 font-mono">2000</td>
                  <td className="p-2 text-muted-foreground">Start of 21st Century</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Formula: Buddhist Year = Gregorian Year + 543
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-8">
          <p>
            Built with{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              shadcn/ui
            </a>{" "}
            and{" "}
            <a
              href="https://react-day-picker.js.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              React DayPicker
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
