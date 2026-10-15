import { useEffect, useState } from 'react'

export type User = {
  id: number
  name: string
  email: string
}

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${import.meta.env.VITE_API_URL}/users`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<User[]>
      })
      .then(setUsers)
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { users, loading, error }
}
