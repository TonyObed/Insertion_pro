"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ConnexionPage() {
  const router = useRouter()

  // Redirection automatique vers la page de profil
  useEffect(() => {
    router.push("/profil")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirection vers votre profil...</p>
    </div>
  )
}
