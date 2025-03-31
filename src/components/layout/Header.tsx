'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            PokéValue Tracker
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="/collection" className="text-sm font-medium hover:text-primary">
            My Collection
          </Link>
          <Link href="/add-card" className="text-sm font-medium hover:text-primary">
            Add Card
          </Link>
          <Link href="/scan" className="text-sm font-medium hover:text-primary">
            Scan Cards
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
