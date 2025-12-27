"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js" //
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Save, Loader2 } from "lucide-react"

// Initialize Supabase client
// Note: In a production app, these should be in a separate lib/supabase.ts file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function NewBrewForm() {
  const router = useRouter()
  const [coffeeWeight, setCoffeeWeight] = useState("")
  const [waterWeight, setWaterWeight] = useState("")
  const [grindSize, setGrindSize] = useState("")
  const [beanName, setBeanName] = useState("")
  const [brewTime, setBrewTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) // New loading state

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTimerRunning) {
      interval = setInterval(() => {
        setBrewTime((time) => time + 1)
      }, 1000)
    }
    return () => { if (interval) clearInterval(interval) }
  }, [isTimerRunning])

  // Refactored Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('brew_logs') // Ensure your table name matches exactly
        .insert([
          {
            coffee_weight: Number.parseFloat(coffeeWeight),
            water_weight: Number.parseFloat(waterWeight),
            grind_size: grindSize,
            brew_time: brewTime,
            bean_name: beanName || null,
            // timestamp is usually handled by Supabase 'created_at' column
          },
        ])

      if (error) throw error

      router.push("/")
      router.refresh() // Refresh the dashboard to show new data
    } catch (error) {
      console.error("Error saving brew:", error)
      alert("Failed to save brew. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const resetTimer = () => {
    setBrewTime(0)
    setIsTimerRunning(false)
  }

  const canSubmit = coffeeWeight && waterWeight && grindSize && !isSubmitting

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... (Existing form fields remain the same) ... */}
      
      {/* Updated Submit Button with Loading State */}
      <Button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-primary text-primary-foreground hover:bg-accent disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Brew
          </>
        )}
      </Button>
    </form>
  )
}