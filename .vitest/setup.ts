import { vi } from 'vitest'

process.env.TZ = 'Europe/London'

console.log = vi.fn()
console.warn = vi.fn()

// vi.useFakeTimers()
// vi.setSystemTime(new Date('2024-01-01T12:00:00Z'))
