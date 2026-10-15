import { useState } from 'react'

export type RegisterBody = {
  name: string
  email: string
  password: string
}

export function usePostRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function register(body: RegisterBody) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (err) {
      setError((err as Error).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}
