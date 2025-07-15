"use client"

import type React from "react"

import { create } from "zustand"

// Utilisateur de démonstration toujours disponible
const DEMO_USER = {
  email: "demo@carriereplus.fr",
  password: "password123",
  firstName: "Jean",
  lastName: "Dupont",
  phone: "06 12 34 56 78",
  bio: "Professionnel en reconversion dans le développement web. Passionné par les nouvelles technologies et l'apprentissage continu.",
  location: "Paris, France",
  profilePicture: "/placeholder.svg?height=200&width=200&text=JD",
  skills: ["Communication", "Travail d'équipe", "Adaptabilité", "Gestion de projet"],
  interests: ["Développement web", "Intelligence artificielle", "UX/UI Design"],
  education: [
    {
      degree: "Master en Marketing Digital",
      school: "Université de Paris",
      year: "2018",
    },
  ],
  experience: [
    {
      position: "Chef de Projet Marketing",
      company: "Agence Digitale",
      period: "2018 - 2023",
    },
  ],
  jobTitle: "Developpeur Web",
  objective: "Objectif",
}

export type User = typeof DEMO_USER

interface AuthState {
  user: User
  isAuthenticated: boolean
  updateProfile: (userData: Partial<User>) => void
  logout: () => void
}

// Utilisateur toujours authentifié pour la démonstration
export const useAuth = create<AuthState>((set) => ({
  user: DEMO_USER,
  isAuthenticated: true,
  updateProfile: (userData) => {
    set((state) => ({
      user: { ...state.user, ...userData },
    }))
  },
  logout: () => {
    set({ user: null as any, isAuthenticated: false })
  },
}))

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return children
}
