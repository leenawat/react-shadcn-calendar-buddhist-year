# Buddhist Calendar Component for shadcn/ui

Custom calendar component based on shadcn/ui that displays dates in **Buddhist Era (BE) / พุทธศักราช (พ.ศ.)**

## Features

✨ **Buddhist Year Display** - Shows years in Buddhist Era (current year + 543)
🇹🇭 **Thai Locale Support** - Built-in Thai language formatting
📅 **All shadcn Calendar Features** - Single date, range selection, multiple months
🎨 **Fully Customizable** - Based on shadcn/ui styling system
⚡ **TypeScript Support** - Full type safety

## Installation

### Prerequisites

Make sure you have shadcn/ui calendar installed:

```bash
npx shadcn@latest add calendar
```

### Install Required Dependencies

```bash
npm install react-day-picker date-fns
# or
pnpm add react-day-picker date-fns
# or
yarn add react-day-picker date-fns
```

### Add the Component

1. Copy `calendar-buddhist.tsx` to your components folder (e.g., `@/components/ui/`)
2. Make sure you have these shadcn components installed:
   - Button
   - Popover (if using date picker)
   - Label (if using date picker)

## Usage

### Basic Example

```tsx
import { CalendarBuddhist } from "@/components/ui/calendar-buddhist"

export function MyCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <CalendarBuddhist
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
    />
  )
}
```

### Date Range Selection

```tsx
import { CalendarBuddhist } from "@/components/ui/calendar-buddhist"
import type { DateRange } from "react-day-picker"

export function RangeCalendar() {
  const [range, setRange] = React.useState<DateRange | undefined>()

  return (
    <CalendarBuddhist
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  )
}
```

### Date Picker with Popover

```tsx
import { CalendarBuddhist } from "@/components/ui/calendar-buddhist"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toLocaleDateString("th-TH") : "เลือกวันที่"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarBuddhist
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date)
            setOpen(false)
          }}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}
```

## Props

The component accepts all standard `react-day-picker` props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single" \| "range" \| "multiple"` | - | Selection mode |
| `selected` | `Date \| DateRange \| Date[]` | - | Selected date(s) |
| `onSelect` | `(date) => void` | - | Callback when date is selected |
| `captionLayout` | `"label" \| "dropdown" \| "dropdown-months" \| "dropdown-years"` | `"label"` | Caption layout style |
| `fromYear` | `number` | `1900` | Minimum selectable year (in Gregorian) |
| `toYear` | `number` | `current + 10` | Maximum selectable year (in Gregorian) |
| `numberOfMonths` | `number` | `1` | Number of months to display |
| `buttonVariant` | `ButtonProps["variant"]` | `"ghost"` | Variant for day buttons |

## Helper Functions

### `toBuddhistYear(date: Date): number`

Converts a Gregorian year to Buddhist year.

```tsx
import { toBuddhistYear } from "@/components/ui/calendar-buddhist"

const date = new Date(2025, 0, 1)
console.log(toBuddhistYear(date)) // 2568
```

### `toGregorianYear(buddhistYear: number): number`

Converts a Buddhist year to Gregorian year.

```tsx
import { toGregorianYear } from "@/components/ui/calendar-buddhist"

console.log(toGregorianYear(2568)) // 2025
```

## Customization

### Custom Locale (Thai)

```tsx
<CalendarBuddhist
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={{
    localize: {
      day: (n: number) => ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"][n],
      month: (n: number) => [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ][n],
    },
    code: "th",
  }}
/>
```

### Custom Year Range

```tsx
<CalendarBuddhist
  mode="single"
  selected={date}
  onSelect={setDate}
  captionLayout="dropdown"
  fromYear={2400}  // พ.ศ. 2400 = ค.ศ. 1857
  toYear={2600}    // พ.ศ. 2600 = ค.ศ. 2057
/>
```

### Custom Cell Size

```tsx
<CalendarBuddhist
  mode="single"
  selected={date}
  onSelect={setDate}
  className="[--cell-size:3rem]"
/>
```

## Display Formatted Dates

### Thai Format

```tsx
{date && (
  <p>
    {date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </p>
)}
// Output: 21 พฤศจิกายน 2568
```

### With Both Buddhist and Gregorian Years

```tsx
import { toBuddhistYear } from "@/components/ui/calendar-buddhist"

{date && (
  <div>
    <p>พ.ศ. {toBuddhistYear(date)}</p>
    <p>ค.ศ. {date.getFullYear()}</p>
  </div>
)}
```

## Examples

See `calendar-buddhist-examples.tsx` for complete working examples including:
- Single date selection
- Date range selection
- Date picker with popover
- Thai locale integration
- Full showcase demo

## How It Works

The component uses **custom formatters** to convert Gregorian years to Buddhist years (+ 543) for display purposes, while maintaining JavaScript Date objects internally. This ensures:

1. ✅ Full compatibility with react-day-picker
2. ✅ No breaking changes to existing code
3. ✅ Easy integration with forms and state management
4. ✅ Proper date calculations and comparisons

## Browser Support

Same as shadcn/ui and react-day-picker:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to open issues or submit PRs for improvements!

## License

MIT - Same as shadcn/ui

## Credits

Based on [shadcn/ui Calendar](https://ui.shadcn.com/docs/components/calendar) and [React DayPicker](https://react-day-picker.js.org/)
