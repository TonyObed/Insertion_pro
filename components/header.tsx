"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, ShoppingCart, Search } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()
  const { itemCount } = useCart()
  const [searchQuery, setSearchQuery] = useState("")

  const isActive = (path: string) => {
    return pathname === path
  }

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Formations", href: "/formations" },
    { name: "Boutique", href: "/boutique" },
    { name: "Recruteurs", href: "/recruteurs" },
    { name: "À propos", href: "/a-propos" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">CarrièrePlus</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Recherche */}
          <div className="hidden md:flex mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Boutons d'action */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="icon" className="relative" asChild>
              <Link href="/panier">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {pathname.startsWith("/profil") ? (
              <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/profil">
                  <User className="h-4 w-4" />
                  <span>{user?.firstName || "Profil"}</span>
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/connexion">Connexion</Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/inscription">Inscription</Link>
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative" asChild>
              <Link href="/panier">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Naviguez à travers les différentes sections du site.</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <form onSubmit={handleSearch} className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </form>
                </div>
                <nav className="flex flex-col space-y-4 mt-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        isActive(link.href) ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    {pathname.startsWith("/profil") ? (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/profil" onClick={() => setIsMenuOpen(false)}>
                          Mon profil
                        </Link>
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button className="w-full" variant="outline" asChild>
                          <Link href="/connexion" onClick={() => setIsMenuOpen(false)}>
                            Connexion
                          </Link>
                        </Button>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href="/inscription" onClick={() => setIsMenuOpen(false)}>
                            Inscription
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
