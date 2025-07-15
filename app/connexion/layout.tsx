import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Connexion | CarrièrePlus",
  description: "Connectez-vous à votre compte CarrièrePlus pour accéder à vos formations et ressources",
}

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
