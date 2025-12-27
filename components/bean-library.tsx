"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Coffee, Loader2 } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Bean {
  id: string
  name: string
  roaster?: string
  origin?: string
  roast_level?: string
  notes?: string
}

export function BeanLibrary() {
  const [beans, setBeans] = useState<Bean[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  
  // Form State
  const [name, setName] = useState("")
  const [roaster, setRoaster] = useState("")
  const [origin, setOrigin] = useState("")
  const [roastLevel, setRoastLevel] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    fetchBeans()
  }, [])

  async function fetchBeans() {
    const { data, error } = await supabase
      .from('beans')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) setBeans(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase
      .from('beans')
      .insert([{
        name,
        roaster: roaster || null,
        origin: origin || null,
        roast_level: roastLevel || null,
        notes: notes || null,
      }])
      .select()

    if (!error && data) {
      setBeans([data[0], ...beans])
      setName(""); setRoaster(""); setOrigin(""); setRoastLevel(""); setNotes("")
      setShowForm(false)
    }
  }

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>

  return (
    <div className="space-y-4">
      {/* ... (Keep form JSX from original file, just ensure IDs match state) ... */}
      
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="w-full bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add New Bean
        </Button>
      )}

      <div className="space-y-3">
        {beans.map((bean) => (
          <Card key={bean.id} className="bg-card border-border shadow-sm">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground text-lg mb-2">{bean.name}</h4>
              <div className="text-sm text-muted-foreground">
                {bean.roaster && <p>Roaster: {bean.roaster}</p>}
                {bean.roast_level && <p>Roast: {bean.roast_level}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}