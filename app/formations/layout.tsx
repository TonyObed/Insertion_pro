import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Formations | CarrièrePlus",
  description: "Découvrez notre catalogue de formations professionnelles pour développer vos compétences",
}

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
