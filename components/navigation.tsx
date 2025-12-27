"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PlusCircle, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/new-brew", label: "New Brew", icon: PlusCircle },
    { href: "/beans", label: "Beans", icon: Coffee },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
