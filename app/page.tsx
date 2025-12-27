import Link from "next/link"
import { BrewList } from "@/components/brew-list"
import { Navigation } from "@/components/navigation"
import { Coffee } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6" />
            <h1 className="text-xl font-semibold">BrewLog</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Brews</h2>
            <Link
              href="/new-brew"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-accent transition-colors"
            >
              New Brew
            </Link>
          </div>

          <BrewList />
        </div>
      </main>

      <Navigation />
    </div>
  )
}
