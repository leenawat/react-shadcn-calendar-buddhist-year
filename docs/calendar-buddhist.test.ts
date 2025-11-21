import { describe, it, expect } from 'vitest'
import { toBuddhistYear, toGregorianYear } from './calendar-buddhist'

describe('Buddhist Calendar Utils', () => {
  describe('toBuddhistYear', () => {
    it('should convert Gregorian year to Buddhist year correctly', () => {
      const testCases = [
        { input: new Date(2025, 0, 1), expected: 2568 },
        { input: new Date(2024, 0, 1), expected: 2567 },
        { input: new Date(2000, 0, 1), expected: 2543 },
        { input: new Date(1900, 0, 1), expected: 2443 },
        { input: new Date(1957, 0, 1), expected: 2500 },
      ]

      testCases.forEach(({ input, expected }) => {
        expect(toBuddhistYear(input)).toBe(expected)
      })
    })

    it('should handle current date correctly', () => {
      const today = new Date()
      const buddhistYear = toBuddhistYear(today)
      expect(buddhistYear).toBe(today.getFullYear() + 543)
    })
  })

  describe('toGregorianYear', () => {
    it('should convert Buddhist year to Gregorian year correctly', () => {
      const testCases = [
        { input: 2568, expected: 2025 },
        { input: 2567, expected: 2024 },
        { input: 2543, expected: 2000 },
        { input: 2443, expected: 1900 },
        { input: 2500, expected: 1957 },
      ]

      testCases.forEach(({ input, expected }) => {
        expect(toGregorianYear(input)).toBe(expected)
      })
    })

    it('should be inverse of toBuddhistYear', () => {
      const testDates = [
        new Date(2025, 0, 1),
        new Date(2000, 6, 15),
        new Date(1990, 11, 31),
      ]

      testDates.forEach((date) => {
        const buddhistYear = toBuddhistYear(date)
        const gregorianYear = toGregorianYear(buddhistYear)
        expect(gregorianYear).toBe(date.getFullYear())
      })
    })
  })

  describe('Year conversion consistency', () => {
    it('should maintain 543 year difference', () => {
      const years = [1900, 1950, 2000, 2025, 2050, 2100]
      
      years.forEach((gregorianYear) => {
        const date = new Date(gregorianYear, 0, 1)
        const buddhistYear = toBuddhistYear(date)
        expect(buddhistYear - gregorianYear).toBe(543)
      })
    })

    it('should handle leap years correctly', () => {
      // Leap year: 2024
      const leapYear = new Date(2024, 1, 29) // Feb 29, 2024
      expect(toBuddhistYear(leapYear)).toBe(2567)
      
      // Non-leap year: 2023
      const nonLeapYear = new Date(2023, 11, 31) // Dec 31, 2023
      expect(toBuddhistYear(nonLeapYear)).toBe(2566)
    })

    it('should handle edge of year transitions', () => {
      // Start of year
      const startOfYear = new Date(2025, 0, 1) // Jan 1, 2025
      expect(toBuddhistYear(startOfYear)).toBe(2568)
      
      // End of year
      const endOfYear = new Date(2025, 11, 31) // Dec 31, 2025
      expect(toBuddhistYear(endOfYear)).toBe(2568)
    })
  })
})

// Optional: Test Thai locale formatting (if running in a browser environment)
describe('Thai Locale Formatting', () => {
  it('should format dates in Thai locale', () => {
    const date = new Date(2025, 10, 21) // Nov 21, 2025
    const formatted = date.toLocaleDateString('th-TH')
    
    // Expected format: 21/11/2568 (Buddhist year)
    expect(formatted).toContain('2568')
  })

  it('should format long date in Thai', () => {
    const date = new Date(2025, 10, 21)
    const formatted = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    
    // Should contain Buddhist year
    expect(formatted).toContain('2568')
    // Should contain Thai month name
    expect(formatted).toMatch(/พฤศจิกายน/)
  })
})
