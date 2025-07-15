"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Fonction pour vérifier si l'écran est mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Vérifier au chargement
    checkIfMobile()

    // Ajouter un écouteur d'événement pour le redimensionnement
    window.addEventListener("resize", checkIfMobile)

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [breakpoint])

  return isMobile
}
