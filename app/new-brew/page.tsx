import { NewBrewForm } from "@/components/new-brew-form"
import { Navigation } from "@/components/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBrewPage() {
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold">New Brew</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <NewBrewForm />
        </div>
      </main>

      <Navigation />
    </div>
  )
}
