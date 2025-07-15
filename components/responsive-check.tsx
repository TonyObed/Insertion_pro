"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

export default function ResponsiveCheck() {
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    setMounted(true)

    // Afficher un toast pour indiquer le mode d'affichage (uniquement en développement)
    if (process.env.NODE_ENV === "development") {
      toast({
        title: `Mode d'affichage: ${isMobile ? "Mobile" : "Desktop"}`,
        description: `Largeur de l'écran: ${window.innerWidth}px`,
        duration: 3000,
      })
    }
  }, [isMobile, toast])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white text-xs px-2 py-1 rounded-md opacity-70 hover:opacity-100 transition-opacity">
      <div className="block sm:hidden">XS (Mobile)</div>
      <div className="hidden sm:block md:hidden">SM (Tablette)</div>
      <div className="hidden md:block lg:hidden">MD (Tablette large)</div>
      <div className="hidden lg:block xl:hidden">LG (Desktop)</div>
      <div className="hidden xl:block 2xl:hidden">XL (Desktop large)</div>
      <div className="hidden 2xl:block">2XL (Extra large)</div>
    </div>
  )
}
