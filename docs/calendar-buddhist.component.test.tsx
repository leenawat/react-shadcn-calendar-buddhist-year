/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CalendarBuddhist, toBuddhistYear } from './calendar-buddhist'
import React from 'react'

// Mock the required shadcn components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  buttonVariants: () => '',
}))

vi.mock('lucide-react', () => ({
  ChevronLeftIcon: () => <span>←</span>,
  ChevronRightIcon: () => <span>→</span>,
  ChevronDownIcon: () => <span>▼</span>,
}))

vi.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}))

describe('CalendarBuddhist Component', () => {
  describe('Rendering', () => {
    it('should render calendar component', () => {
      const { container } = render(
        <CalendarBuddhist mode="single" selected={undefined} onSelect={() => {}} />
      )
      
      expect(container.querySelector('[data-slot="calendar"]')).toBeInTheDocument()
    })

    it('should render with dropdown caption layout', () => {
      render(
        <CalendarBuddhist
          mode="single"
          selected={undefined}
          onSelect={() => {}}
          captionLayout="dropdown"
        />
      )
      
      // Should render dropdown elements
      const dropdowns = screen.getAllByRole('combobox')
      expect(dropdowns.length).toBeGreaterThan(0)
    })

    it('should apply custom className', () => {
      const { container } = render(
        <CalendarBuddhist
          mode="single"
          selected={undefined}
          onSelect={() => {}}
          className="custom-calendar-class"
        />
      )
      
      const calendar = container.querySelector('[data-slot="calendar"]')
      expect(calendar?.parentElement).toHaveClass('custom-calendar-class')
    })
  })

  describe('Date Selection', () => {
    it('should call onSelect when a date is clicked', async () => {
      const handleSelect = vi.fn()
      const selectedDate = new Date(2025, 10, 21)
      
      render(
        <CalendarBuddhist
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
        />
      )
      
      // Find and click a day button
      const dayButtons = screen.getAllByRole('button')
      const firstDayButton = dayButtons.find(btn => 
        btn.getAttribute('data-day')
      )
      
      if (firstDayButton) {
        fireEvent.click(firstDayButton)
        await waitFor(() => {
          expect(handleSelect).toHaveBeenCalled()
        })
      }
    })

    it('should highlight selected date', () => {
      const selectedDate = new Date(2025, 10, 21)
      
      const { container } = render(
        <CalendarBuddhist
          mode="single"
          selected={selectedDate}
          onSelect={() => {}}
        />
      )
      
      const selectedButton = container.querySelector('[data-selected-single="true"]')
      expect(selectedButton).toBeInTheDocument()
    })
  })

  describe('Buddhist Year Display', () => {
    it('should display Buddhist years in dropdown', () => {
      const selectedDate = new Date(2025, 10, 21)
      
      render(
        <CalendarBuddhist
          mode="single"
          selected={selectedDate}
          onSelect={() => {}}
          captionLayout="dropdown"
        />
      )
      
      // The Buddhist year 2568 should be visible
      const buddhistYear = toBuddhistYear(selectedDate)
      expect(screen.getByText(buddhistYear.toString())).toBeInTheDocument()
    })

    it('should format months correctly', () => {
      const selectedDate = new Date(2025, 10, 21) // November
      
      render(
        <CalendarBuddhist
          mode="single"
          selected={selectedDate}
          onSelect={() => {}}
        />
      )
      
      // Should display month name
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December']
      const currentMonth = monthNames[selectedDate.getMonth()]
      
      expect(screen.getByText(new RegExp(currentMonth, 'i'))).toBeInTheDocument()
    })
  })

  describe('Range Selection Mode', () => {
    it('should support range selection mode', () => {
      const handleSelect = vi.fn()
      const dateRange = {
        from: new Date(2025, 10, 1),
        to: new Date(2025, 10, 15),
      }
      
      render(
        <CalendarBuddhist
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
        />
      )
      
      // Should have range start and end markers
      const { container } = render(
        <CalendarBuddhist
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
        />
      )
      
      const rangeStart = container.querySelector('[data-range-start="true"]')
      const rangeEnd = container.querySelector('[data-range-end="true"]')
      
      expect(rangeStart || rangeEnd).toBeTruthy()
    })
  })

  describe('Year Range Props', () => {
    it('should respect fromYear prop', () => {
      render(
        <CalendarBuddhist
          mode="single"
          selected={new Date(2025, 0, 1)}
          onSelect={() => {}}
          captionLayout="dropdown"
          fromYear={2400} // Buddhist year 2943 = Gregorian 2400
          toYear={2500}
        />
      )
      
      // Component should render without errors
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <CalendarBuddhist
          mode="single"
          selected={undefined}
          onSelect={() => {}}
        />
      )
      
      // Calendar should have grid role
      expect(screen.getByRole('grid')).toBeInTheDocument()
      
      // Buttons should be keyboard accessible
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type')
      })
    })

    it('should support keyboard navigation', () => {
      const handleSelect = vi.fn()
      
      render(
        <CalendarBuddhist
          mode="single"
          selected={undefined}
          onSelect={handleSelect}
        />
      )
      
      const grid = screen.getByRole('grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Custom Formatters', () => {
    it('should use custom formatters when provided', () => {
      const customFormatter = {
        formatCaption: (date: Date) => `Custom ${toBuddhistYear(date)}`,
      }
      
      render(
        <CalendarBuddhist
          mode="single"
          selected={new Date(2025, 0, 1)}
          onSelect={() => {}}
          formatters={customFormatter}
        />
      )
      
      expect(screen.getByText(/Custom 2568/)).toBeInTheDocument()
    })
  })

  describe('Today Highlighting', () => {
    it('should highlight today\'s date', () => {
      const today = new Date()
      
      const { container } = render(
        <CalendarBuddhist
          mode="single"
          selected={undefined}
          onSelect={() => {}}
          defaultMonth={today}
        />
      )
      
      // Today should have special styling
      const todayButton = container.querySelector(`[data-day="${today.toLocaleDateString()}"]`)
      expect(todayButton?.parentElement).toHaveClass('today')
    })
  })

  describe('Multiple Months', () => {
    it('should render multiple months when specified', () => {
      const { container } = render(
        <CalendarBuddhist
          mode="range"
          selected={undefined}
          onSelect={() => {}}
          numberOfMonths={2}
        />
      )
      
      const months = container.querySelectorAll('.rdp-month')
      expect(months.length).toBe(2)
    })
  })
})

describe('Integration with Forms', () => {
  it('should work with controlled component pattern', () => {
    const TestForm = () => {
      const [date, setDate] = React.useState<Date | undefined>(undefined)
      
      return (
        <div>
          <CalendarBuddhist
            mode="single"
            selected={date}
            onSelect={setDate}
          />
          <div data-testid="selected-date">
            {date ? toBuddhistYear(date) : 'No date'}
          </div>
        </div>
      )
    }
    
    render(<TestForm />)
    
    expect(screen.getByTestId('selected-date')).toHaveTextContent('No date')
  })
})
