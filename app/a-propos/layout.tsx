import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "À propos | CarrièrePlus",
  description:
    "Découvrez l'histoire, la mission et les valeurs de CarrièrePlus, votre partenaire pour l'insertion professionnelle",
}

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
