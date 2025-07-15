"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselSlide {
  title: string
  highlight: string
  highlightColor: string
  description: string
  primaryButton: string
  secondaryButton: string
  primaryButtonColor: string
  image: string
  imageAlt: string
  gradientFrom: string
  gradientTo: string
  stats: Array<{
    icon: "book" | "users" | "briefcase"
    text: string
    color: string
  }>
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const slides: CarouselSlide[] = [
    {
      title: "Développez vos compétences,",
      highlight: "trouvez votre emploi",
      highlightColor: "text-blue-600",
      description:
        "Des formations personnalisées et un accompagnement sur mesure pour booster votre carrière professionnelle.",
      primaryButton: "Commencer gratuitement",
      secondaryButton: "Découvrir les formations",
      primaryButtonColor: "bg-blue-600 hover:bg-blue-700",
      image: "/placeholder.svg?height=700&width=800&text=Formation+professionnelle",
      imageAlt: "Formation professionnelle",
      gradientFrom: "from-blue-600/10",
      gradientTo: "to-indigo-600/10",
      stats: [
        { icon: "book", text: "+200 formations", color: "text-blue-600" },
        { icon: "users", text: "+10 000 utilisateurs", color: "text-blue-600" },
        { icon: "briefcase", text: "+500 recruteurs", color: "text-blue-600" },
      ],
    },
    {
      title: "Perfectionnez votre",
      highlight: "technique d'entretien",
      highlightColor: "text-indigo-600",
      description:
        "Nos formations vous préparent à réussir vos entretiens d'embauche avec confiance et professionnalisme.",
      primaryButton: "Voir les formations",
      secondaryButton: "Témoignages",
      primaryButtonColor: "bg-indigo-600 hover:bg-indigo-700",
      image: "/placeholder.svg?height=700&width=800&text=Techniques+d'entretien",
      imageAlt: "Techniques d'entretien",
      gradientFrom: "from-indigo-600/10",
      gradientTo: "to-purple-600/10",
      stats: [
        { icon: "book", text: "Techniques éprouvées", color: "text-indigo-600" },
        { icon: "users", text: "Exercices pratiques", color: "text-indigo-600" },
      ],
    },
    {
      title: "Créez un CV qui",
      highlight: "attire l'attention",
      highlightColor: "text-teal-600",
      description: "Apprenez à mettre en valeur vos compétences et expériences pour créer un CV qui se démarque.",
      primaryButton: "Formations CV",
      secondaryButton: "Modèles de CV",
      primaryButtonColor: "bg-teal-600 hover:bg-teal-700",
      image: "/placeholder.svg?height=700&width=800&text=CV+professionnel",
      imageAlt: "CV professionnel",
      gradientFrom: "from-blue-600/10",
      gradientTo: "to-teal-600/10",
      stats: [
        { icon: "book", text: "Conseils d'experts", color: "text-teal-600" },
        { icon: "users", text: "Templates professionnels", color: "text-teal-600" },
      ],
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }, [nextSlide])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    }

    return () => {
      stopAutoPlay()
    }
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay])

  const renderIcon = (icon: string, color: string) => {
    switch (icon) {
      case "book":
        return <BookOpen className={`h-4 w-4 ${color}`} />
      case "users":
        return <Users className={`h-4 w-4 ${color}`} />
      case "briefcase":
        return <Briefcase className={`h-4 w-4 ${color}`} />
      default:
        return null
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <div
                className={`grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 bg-gradient-to-r ${slide.gradientFrom} ${slide.gradientTo} min-h-[450px]`}
              >
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {slide.title} <span className={slide.highlightColor}>{slide.highlight}</span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">{slide.description}</p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button size="lg" className={slide.primaryButtonColor} asChild>
                      <Link href="/inscription">{slide.primaryButton}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/connexion">{slide.secondaryButton}</Link>
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    {slide.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center gap-2">
                        {renderIcon(stat.icon, stat.color)}
                        <span>{stat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-[350px] rounded-lg overflow-hidden shadow-xl">
                  <Image src={slide.image || "/placeholder.svg"} alt={slide.imageAlt} fill className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contrôles du carrousel */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-12 bg-white" : "w-3 bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Flèches de navigation */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
          onClick={prevSlide}
          aria-label="Slide précédent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
          onClick={nextSlide}
          aria-label="Slide suivant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
