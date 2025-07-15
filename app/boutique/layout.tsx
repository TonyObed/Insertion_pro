import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boutique | CarrièrePlus",
  description: "Découvrez notre sélection de ressources pour booster votre carrière professionnelle",
}

export default function BoutiqueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
