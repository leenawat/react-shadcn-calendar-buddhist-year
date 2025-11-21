# 🇹🇭 Buddhist Calendar for shadcn/ui - Quick Start

## 📦 Installation Steps

### 1. Prerequisites
```bash
# Install shadcn calendar first
npx shadcn@latest add calendar

# Install required dependencies
npm install react-day-picker lucide-react
```

### 2. Add the Buddhist Calendar Component

Copy `calendar-buddhist.tsx` to your project:
```
your-project/
├── components/
│   └── ui/
│       ├── calendar-buddhist.tsx  ← Add this file
│       ├── calendar.tsx           ← Original shadcn calendar
│       ├── button.tsx
│       └── ...
```

### 3. Required shadcn Components

Make sure you have these installed:
```bash
npx shadcn@latest add button
npx shadcn@latest add popover  # If using date picker
npx shadcn@latest add label    # If using date picker
```

## 🚀 Quick Usage

### Basic Calendar
```tsx
import { CalendarBuddhist } from "@/components/ui/calendar-buddhist"

function MyApp() {
  const [date, setDate] = React.useState<Date>()
  
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

### Date Picker with Popover
```tsx
import { CalendarBuddhist, toBuddhistYear } from "@/components/ui/calendar-buddhist"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

function DatePicker() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? `${date.toLocaleDateString("th-TH")}` : "เลือกวันที่"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarBuddhist
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
          captionLayout="dropdown"
          fromYear={2500} // พ.ศ. 2500 = ค.ศ. 1957
          toYear={2600}   // พ.ศ. 2600 = ค.ศ. 2057
        />
      </PopoverContent>
    </Popover>
  )
}
```

### Display with Both Years
```tsx
import { toBuddhistYear } from "@/components/ui/calendar-buddhist"

function ShowDate({ date }: { date: Date }) {
  return (
    <div>
      <p>{date.toLocaleDateString("th-TH")}</p>
      <p>พ.ศ. {toBuddhistYear(date)} = ค.ศ. {date.getFullYear()}</p>
    </div>
  )
}
```

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **Buddhist Years** | Automatically converts to พ.ศ. (+ 543 years) |
| **Thai Locale** | Native Thai language support |
| **Date Range** | Select date ranges |
| **Dropdown** | Month and year dropdowns |
| **Customizable** | Full shadcn styling support |

## 📝 Props Reference

| Prop | Type | Example | Description |
|------|------|---------|-------------|
| `mode` | `"single" \| "range"` | `"single"` | Selection mode |
| `selected` | `Date \| DateRange` | `new Date()` | Selected date |
| `onSelect` | `(date) => void` | `setDate` | Selection callback |
| `captionLayout` | `"label" \| "dropdown"` | `"dropdown"` | Caption style |
| `fromYear` | `number` | `2400` | Min year (Gregorian) |
| `toYear` | `number` | `2600` | Max year (Gregorian) |

## 🔄 Year Conversion

```tsx
import { toBuddhistYear, toGregorianYear } from "@/components/ui/calendar-buddhist"

// Convert to Buddhist Year
toBuddhistYear(new Date(2025, 0, 1))  // 2568

// Convert from Buddhist Year
toGregorianYear(2568)  // 2025
```

## 🌏 Thai Formatting

```tsx
// Full Thai format
date.toLocaleDateString("th-TH", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long"
})
// Output: วันพฤหัสบดีที่ 21 พฤศจิกายน พ.ศ. 2568

// Short format
date.toLocaleDateString("th-TH")
// Output: 21/11/2568
```

## 💡 Tips

1. **Year Range**: Use `fromYear` and `toYear` in Gregorian years (not Buddhist years)
   ```tsx
   fromYear={2500}  // พ.ศ. 2500 = ค.ศ. 1957
   ```

2. **Form Integration**: Works seamlessly with React Hook Form
   ```tsx
   <Controller
     control={control}
     name="birthDate"
     render={({ field }) => (
       <CalendarBuddhist
         mode="single"
         selected={field.value}
         onSelect={field.onChange}
       />
     )}
   />
   ```

3. **Styling**: Customize using Tailwind classes
   ```tsx
   <CalendarBuddhist
     className="rounded-lg border shadow-lg [--cell-size:3rem]"
   />
   ```

## 🐛 Troubleshooting

### Issue: Years not showing in Buddhist format
**Solution**: Make sure you're using `CalendarBuddhist` not the standard `Calendar` component

### Issue: Dropdown not working
**Solution**: Make sure `captionLayout="dropdown"` is set

### Issue: Styles not applying
**Solution**: Ensure shadcn button component is installed and properly configured

## 📚 Files Included

- `calendar-buddhist.tsx` - Main component
- `calendar-buddhist-examples.tsx` - Usage examples
- `page.tsx` - Full demo page
- `README.md` - Detailed documentation
- `QUICK-START.md` - This file

## 🔗 Resources

- [shadcn/ui Calendar](https://ui.shadcn.com/docs/components/calendar)
- [React DayPicker](https://react-day-picker.js.org/)
- [Thai Date Format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

## ❤️ Support

If you find this useful, please give it a star ⭐

## 📄 License

MIT - Free to use in personal and commercial projects
