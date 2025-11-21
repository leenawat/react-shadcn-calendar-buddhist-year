# Testing Guide for Buddhist Calendar Component

## 🧪 Test Coverage

We provide comprehensive tests for the Buddhist Calendar component:

### Test Files:

1. **`calendar-buddhist.test.ts`** - Unit tests for utility functions
   - Year conversion functions
   - Thai locale formatting
   - Edge cases and boundary conditions

2. **`calendar-buddhist.component.test.tsx`** - Component tests
   - Rendering behavior
   - User interactions
   - Date selection
   - Accessibility
   - Form integration

## 📦 Required Dependencies

### For Vitest (Recommended)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### For Jest

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

## ⚙️ Configuration

### Vitest Configuration (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Test Setup File (`test-setup.ts`)

```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

### Jest Configuration (`jest.config.js`)

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
      },
    }],
  },
}
```

## 🚀 Running Tests

### Run All Tests

```bash
# Vitest
npm run test

# Jest
npm test
```

### Run Specific Test File

```bash
# Vitest
npm run test calendar-buddhist.test.ts

# Jest
npm test calendar-buddhist.test.ts
```

### Run with Coverage

```bash
# Vitest
npm run test -- --coverage

# Jest
npm test -- --coverage
```

### Watch Mode

```bash
# Vitest
npm run test -- --watch

# Jest
npm test -- --watch
```

## 📋 Test Results

### Expected Output

```
✓ Buddhist Calendar Utils (13 tests)
  ✓ toBuddhistYear (5 tests)
    ✓ should convert Gregorian year to Buddhist year correctly
    ✓ should handle current date correctly
  ✓ toGregorianYear (3 tests)
    ✓ should convert Buddhist year to Gregorian year correctly
    ✓ should be inverse of toBuddhistYear
  ✓ Year conversion consistency (3 tests)
    ✓ should maintain 543 year difference
    ✓ should handle leap years correctly
    ✓ should handle edge of year transitions
  ✓ Thai Locale Formatting (2 tests)
    ✓ should format dates in Thai locale
    ✓ should format long date in Thai

✓ CalendarBuddhist Component (15+ tests)
  ✓ Rendering
  ✓ Date Selection
  ✓ Buddhist Year Display
  ✓ Range Selection Mode
  ✓ Accessibility
  ✓ Integration with Forms

Test Files: 2 passed (2)
Tests: 28 passed (28)
```

## ✅ What We Test

### Utility Functions
- ✅ Gregorian to Buddhist year conversion
- ✅ Buddhist to Gregorian year conversion
- ✅ Bidirectional conversion consistency
- ✅ 543-year difference maintained
- ✅ Leap year handling
- ✅ Year boundary transitions
- ✅ Thai locale formatting

### React Component
- ✅ Component renders without errors
- ✅ Dropdown caption layout works
- ✅ Custom className applied
- ✅ Date selection callback fires
- ✅ Selected date highlighted
- ✅ Buddhist year displayed in dropdown
- ✅ Month names displayed correctly
- ✅ Range selection mode works
- ✅ Year range props respected
- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Custom formatters work
- ✅ Today's date highlighted
- ✅ Multiple months render
- ✅ Form integration works

## 🔍 Testing Best Practices

### 1. Isolated Tests
Each test is independent and doesn't rely on others.

### 2. Mock External Dependencies
We mock shadcn components to focus on our component logic.

### 3. Accessibility Testing
We ensure proper ARIA attributes and keyboard navigation.

### 4. Edge Cases
We test boundary conditions, leap years, and year transitions.

### 5. Real-World Scenarios
We test form integration and controlled component patterns.

## 🐛 Common Issues

### Issue: Module not found '@/components/ui/...'

**Solution:** Make sure your path alias is configured in both `tsconfig.json` and test config:

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: "ReferenceError: document is not defined"

**Solution:** Ensure you're using `jsdom` environment:

```typescript
// Add to test file
/**
 * @vitest-environment jsdom
 */
```

### Issue: Tests fail with React import errors

**Solution:** Install correct React Testing Library version:

```bash
npm install -D @testing-library/react@latest
```

## 📊 Coverage Goals

- **Unit Tests**: 100% coverage for utility functions
- **Component Tests**: >90% coverage for component logic
- **Integration Tests**: Key user flows tested

## 🔗 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)

## 💡 Tips

1. **Run tests before committing**
   ```bash
   npm test
   ```

2. **Keep tests fast**
   - Mock external dependencies
   - Avoid real API calls
   - Use fake timers when needed

3. **Write descriptive test names**
   - Good: "should convert Gregorian year to Buddhist year correctly"
   - Bad: "test1"

4. **Test behavior, not implementation**
   - Focus on what users see and do
   - Don't test internal component state directly

## ✨ Adding New Tests

When adding features, add corresponding tests:

```typescript
describe('New Feature', () => {
  it('should do something specific', () => {
    // Arrange
    const input = setupTestData()
    
    // Act
    const result = performAction(input)
    
    // Assert
    expect(result).toBe(expected)
  })
})
```

## 🎯 CI/CD Integration

Add to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

Add to GitHub Actions (`.github/workflows/test.yml`):

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

---

**Happy Testing! 🚀**
