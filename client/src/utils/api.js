export const API_BASE = import.meta.env.VITE_API_BASE

// Mock data for fallback
const mockEvents = [
  {
    title: 'COMSSA Dinner',
    department: 'CS',
    date: '2023-11-10',
    time: '18:00',
    location: 'COMSSA Common Room',
  },
  {
    title: 'ESUG Expo',
    department: 'ESUG',
    date: '2023-11-12',
    time: '10:00',
    location: 'ESUG Hall',
  },
]

// Fetch events by department or all events
export async function fetchEvents(department) {
  const endpoint = department
    ? `/api/events?department=${encodeURIComponent(department)}`
    : '/api/events'

  try {
    const res = await fetch(`${API_BASE}${endpoint}`)

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`)
    }

    const data = await res.json()
    return data
  } catch (err) {
    console.warn('API fetch failed, using mock data:', err.message)

    if (department) {
      return mockEvents.filter(event => event.department === department)
    }

    return mockEvents
  }
}

// Shortcut to fetch all events
export async function fetchAllEvents() {
  return fetchEvents()
}
