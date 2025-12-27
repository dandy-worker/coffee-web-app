"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Coffee, Droplets, Scale, Loader2 } from "lucide-react"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface Brew {
  id: string
  coffee_weight: number // Renamed to match Supabase snake_case
  water_weight: number
  grind_size: string
  brew_time: number
  bean_name?: string
  created_at: string
}

export function BrewList() {
  const [brews, setBrews] = useState<Brew[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBrews() {
      try {
        const { data, error } = await supabase
          .from('brew_logs')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        if (data) setBrews(data)
      } catch (err) {
        console.error("Error fetching brews:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBrews()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (brews.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-12 text-center">
          <Coffee className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No brews logged yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {brews.map((brew) => {
        const ratio = (brew.water_weight / brew.coffee_weight).toFixed(1)

        return (
          <Card key={brew.id} className="bg-card border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  {brew.bean_name && <p className="font-semibold text-foreground mb-1">{brew.bean_name}</p>}
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(brew.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="bg-secondary px-3 py-1 rounded-full">
                  <p className="text-xs font-medium text-secondary-foreground">
                    {Math.floor(brew.brew_time / 60)}:{String(brew.brew_time % 60).padStart(2, "0")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Coffee</p>
                    <p className="text-sm font-medium text-foreground">{brew.coffee_weight}g</p>
                  </div>
                </div>
                {/* ... other items use brew.water_weight and brew.grind_size ... */}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}