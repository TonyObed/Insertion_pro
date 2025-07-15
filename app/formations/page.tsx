import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  Search,
  Filter,
  ChevronDown,
  Clock,
  Users,
  Star,
  StarHalf,
  BookOpen,
  Award,
  Monitor,
  Zap,
  Check,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata: Metadata = {
  title: "Formations | CarrièrePlus",
  description: "Découvrez notre catalogue de formations professionnelles pour développer vos compétences",
}

// Types pour les formations
interface Formation {
  id: string
  title: string
  description: string
  price?: number
  free?: boolean
  image: string
  category: string
  subcategory?: string
  rating: number
  reviews: number
  instructor: string
  duration: string
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux"
  students: number
  bestseller?: boolean
  new?: boolean
  featured?: boolean
  certification?: boolean
  lastUpdated: string
  modules?: number
}

export default function FormationsPage() {
  // Données des formations (simulées)
  const formations: Formation[] = [
    {
      id: "1",
      title: "Créer un CV qui attire l'attention des recruteurs",
      description: "Apprenez à construire un CV professionnel qui se démarque et met en valeur vos compétences.",
      free: true,
      image: "/placeholder.svg?height=400&width=600&text=CV+Professionnel",
      category: "CV et Lettre de motivation",
      subcategory: "Rédaction de CV",
      rating: 4.8,
      reviews: 124,
      instructor: "Marie Dupont",
      duration: "2h 15min",
      level: "Débutant",
      students: 1245,
      bestseller: true,
      lastUpdated: "Avril 2023",
      modules: 8,
    },
    {
      id: "2",
      title: "Maîtriser l'entretien d'embauche : techniques avancées",
      description:
        "Des techniques éprouvées pour vous préparer efficacement et réussir tous vos entretiens d'embauche.",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=600&text=Entretien+Embauche",
      category: "Entretien d'embauche",
      subcategory: "Préparation entretien",
      rating: 4.9,
      reviews: 87,
      instructor: "Thomas Martin",
      duration: "3h 30min",
      level: "Intermédiaire",
      students: 856,
      featured: true,
      certification: true,
      lastUpdated: "Juin 2023",
      modules: 12,
    },
    {
      id: "3",
      title: "LinkedIn : Optimiser son profil pour être repéré",
      description: "Améliorez votre visibilité sur LinkedIn et attirez l'attention des recruteurs.",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=600&text=LinkedIn+Pro",
      category: "Réseaux sociaux",
      subcategory: "LinkedIn",
      rating: 4.7,
      reviews: 56,
      instructor: "Sophie Leroux",
      duration: "1h 45min",
      level: "Tous niveaux",
      students: 1532,
      bestseller: true,
      lastUpdated: "Mai 2023",
      modules: 6,
    },
    {
      id: "4",
      title: "Négociation salariale : Obtenir ce que vous méritez",
      description: "Stratégies et techniques pour négocier efficacement votre salaire et vos avantages.",
      price: 39.99,
      image: "/placeholder.svg?height=400&width=600&text=Négociation+Salariale",
      category: "Développement professionnel",
      subcategory: "Négociation",
      rating: 4.6,
      reviews: 42,
      instructor: "Jean Dubois",
      duration: "2h 10min",
      level: "Avancé",
      students: 642,
      lastUpdated: "Juillet 2023",
      modules: 7,
    },
    {
      id: "5",
      title: "Reconversion professionnelle : Guide complet",
      description: "Méthodologie complète pour réussir votre transition vers un nouveau métier ou secteur.",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=600&text=Reconversion",
      category: "Reconversion",
      subcategory: "Stratégie de reconversion",
      rating: 4.8,
      reviews: 38,
      instructor: "Pierre Moreau",
      duration: "5h 20min",
      level: "Tous niveaux",
      students: 421,
      certification: true,
      new: true,
      lastUpdated: "Août 2023",
      modules: 15,
    },
    {
      id: "6",
      title: "Communication professionnelle efficace",
      description: "Améliorez vos compétences en communication écrite et orale dans un contexte professionnel.",
      free: true,
      image: "/placeholder.svg?height=400&width=600&text=Communication",
      category: "Soft Skills",
      subcategory: "Communication",
      rating: 4.5,
      reviews: 65,
      instructor: "Émilie Laurent",
      duration: "1h 50min",
      level: "Débutant",
      students: 978,
      lastUpdated: "Mars 2023",
      modules: 5,
    },
    {
      id: "7",
      title: "Personal Branding : Construire votre marque personnelle",
      description: "Techniques pour développer et promouvoir votre marque personnelle auprès des recruteurs.",
      price: 45.99,
      image: "/placeholder.svg?height=400&width=600&text=Personal+Branding",
      category: "Développement professionnel",
      subcategory: "Marque personnelle",
      rating: 4.7,
      reviews: 29,
      instructor: "Caroline Blanc",
      duration: "3h 15min",
      level: "Intermédiaire",
      students: 542,
      featured: true,
      lastUpdated: "Avril 2023",
      modules: 10,
    },
    {
      id: "8",
      title: "Intelligence émotionnelle au travail",
      description: "Développez votre intelligence émotionnelle pour améliorer vos relations professionnelles.",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=600&text=Intelligence+Émotionnelle",
      category: "Soft Skills",
      subcategory: "Intelligence émotionnelle",
      rating: 4.9,
      reviews: 47,
      instructor: "Michel Lambert",
      duration: "2h 45min",
      level: "Tous niveaux",
      students: 785,
      bestseller: true,
      lastUpdated: "Février 2023",
      modules: 9,
    },
    {
      id: "9",
      title: "Portfolio créatif pour métiers artistiques",
      description: "Créez un portfolio professionnel qui met en valeur vos compétences créatives.",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=600&text=Portfolio+Créatif",
      category: "CV et Lettre de motivation",
      subcategory: "Portfolio",
      rating: 4.6,
      reviews: 33,
      instructor: "Lucie Martin",
      duration: "2h 30min",
      level: "Intermédiaire",
      students: 458,
      lastUpdated: "Mai 2023",
      modules: 8,
    },
    {
      id: "10",
      title: "Gestion du stress en période de recherche d'emploi",
      description: "Techniques de gestion du stress pour aborder sereinement votre recherche d'emploi.",
      free: true,
      image: "/placeholder.svg?height=400&width=600&text=Gestion+Stress",
      category: "Développement personnel",
      subcategory: "Gestion du stress",
      rating: 4.7,
      reviews: 51,
      instructor: "Nathalie Petit",
      duration: "1h 40min",
      level: "Tous niveaux",
      students: 892,
      lastUpdated: "Janvier 2023",
      modules: 6,
    },
    {
      id: "11",
      title: "Réseautage professionnel : Stratégies efficaces",
      description: "Développez votre réseau professionnel et maximisez les opportunités de carrière.",
      price: 42.99,
      image: "/placeholder.svg?height=400&width=600&text=Réseautage",
      category: "Développement professionnel",
      subcategory: "Réseautage",
      rating: 4.5,
      reviews: 39,
      instructor: "Alexandre Durand",
      duration: "2h 20min",
      level: "Intermédiaire",
      students: 635,
      lastUpdated: "Juillet 2023",
      modules: 7,
    },
    {
      id: "12",
      title: "Lettre de motivation percutante",
      description: "Apprenez à rédiger une lettre de motivation qui retient l'attention des recruteurs.",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=600&text=Lettre+Motivation",
      category: "CV et Lettre de motivation",
      subcategory: "Lettre de motivation",
      rating: 4.8,
      reviews: 72,
      instructor: "Marie Dupont",
      duration: "1h 30min",
      level: "Débutant",
      students: 1145,
      new: true,
      lastUpdated: "Août 2023",
      modules: 5,
    },
  ]

  // Catégories principales pour le filtrage
  const categories = [
    {
      name: "CV et Lettre de motivation",
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      count: formations.filter((f) => f.category === "CV et Lettre de motivation").length,
    },
    {
      name: "Entretien d'embauche",
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      count: formations.filter((f) => f.category === "Entretien d'embauche").length,
    },
    {
      name: "Réseaux sociaux",
      icon: <Monitor className="h-5 w-5 text-purple-600" />,
      count: formations.filter((f) => f.category === "Réseaux sociaux").length,
    },
    {
      name: "Développement professionnel",
      icon: <Award className="h-5 w-5 text-teal-600" />,
      count: formations.filter((f) => f.category === "Développement professionnel").length,
    },
    {
      name: "Soft Skills",
      icon: <Zap className="h-5 w-5 text-amber-600" />,
      count: formations.filter((f) => f.category === "Soft Skills").length,
    },
    {
      name: "Reconversion",
      icon: <ChevronRight className="h-5 w-5 text-red-600" />,
      count: formations.filter((f) => f.category === "Reconversion").length,
    },
    {
      name: "Développement personnel",
      icon: <Star className="h-5 w-5 text-yellow-600" />,
      count: formations.filter((f) => f.category === "Développement personnel").length,
    },
  ]

  // Fonction pour afficher les étoiles de notation
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl text-blue-600">
              CarrièrePlus
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                Accueil
              </Link>
              <Link href="/formations" className="text-blue-600 font-medium">
                Formations
              </Link>
              <Link href="/boutique" className="text-gray-600 hover:text-blue-600 transition">
                Boutique
              </Link>
              <Link href="/a-propos" className="text-gray-600 hover:text-blue-600 transition">
                À propos
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link href="/connexion">Se connecter</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/inscription">S'inscrire</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Bannière de la page formations */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Formations CarrièrePlus</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6">
                Développez vos compétences professionnelles avec nos formations sur mesure et donnez un boost à votre
                carrière.
              </p>
              <div className="flex flex-wrap gap-3">
                {categories.slice(0, 5).map((category, index) => (
                  <Badge key={index} className="bg-white/20 text-white hover:bg-white/30 px-3 py-1 text-sm">
                    {category.name}
                  </Badge>
                ))}
                <Badge className="bg-white/10 text-white hover:bg-white/20 px-3 py-1 text-sm">+2 autres</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Barre de recherche et filtres */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
              <div className="relative w-full md:w-1/2">
                <Input
                  type="text"
                  placeholder="Rechercher une formation..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtres
                  <ChevronDown className="h-4 w-4" />
                </Button>

                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popularité</SelectItem>
                    <SelectItem value="recent">Plus récentes</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Mieux notées</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtres étendus */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Catégories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`category-${index}`} />
                        <Label htmlFor={`category-${index}`} className="flex items-center gap-2 cursor-pointer">
                          {category.icon}
                          <span>
                            {category.name} <span className="text-gray-400 text-sm">({category.count})</span>
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Niveau</h3>
                  <div className="space-y-2">
                    {["Débutant", "Intermédiaire", "Avancé", "Tous niveaux"].map((level, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`level-${index}`} />
                        <Label htmlFor={`level-${index}`} className="cursor-pointer">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-gray-900 pt-4">Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free" />
                      <Label htmlFor="free" className="cursor-pointer">
                        Gratuit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="paid" />
                      <Label htmlFor="paid" className="cursor-pointer">
                        Payant
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="certification" />
                      <Label htmlFor="certification" className="cursor-pointer">
                        Avec certification
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Durée</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-1" />
                      <Label htmlFor="duration-1" className="cursor-pointer">
                        &lt; 1 heure
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-2" />
                      <Label htmlFor="duration-2" className="cursor-pointer">
                        1-3 heures
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-3" />
                      <Label htmlFor="duration-3" className="cursor-pointer">
                        3-6 heures
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-4" />
                      <Label htmlFor="duration-4" className="cursor-pointer">
                        &gt; 6 heures
                      </Label>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 pt-4">Note</h3>
                  <div className="pt-2">
                    <Label className="flex items-center justify-between mb-2">
                      <span>Note minimale:</span>
                      <span className="font-semibold">4.5+</span>
                    </Label>
                    <Slider defaultValue={[4.5]} min={1} max={5} step={0.5} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Autres filtres</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bestseller" className="cursor-pointer">
                        Bestseller
                      </Label>
                      <Switch id="bestseller" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new" className="cursor-pointer">
                        Nouveautés
                      </Label>
                      <Switch id="new" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured" className="cursor-pointer">
                        En vedette
                      </Label>
                      <Switch id="featured" />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end space-x-2">
                    <Button variant="outline">Réinitialiser</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Appliquer</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formations en vedette */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Formations en vedette</h2>
              <Button variant="link" className="text-blue-600">
                Voir tout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations
                .filter((f) => f.featured)
                .map((formation) => (
                  <Card key={formation.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-48">
                      <Image
                        src={formation.image || "/placeholder.svg"}
                        alt={formation.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {formation.featured && <Badge className="bg-indigo-600">En vedette</Badge>}
                        {formation.new && <Badge className="bg-green-600">Nouveau</Badge>}
                        {formation.bestseller && <Badge className="bg-amber-500">Bestseller</Badge>}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Badge
                          variant="outline"
                          className="font-normal text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          {formation.category}
                        </Badge>
                        {formation.certification && (
                          <Badge variant="outline" className="font-normal text-xs">
                            Certification
                          </Badge>
                        )}
                      </div>
                      <Link href={`/formations/${formation.id}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                          {formation.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{formation.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formation.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{formation.students.toLocaleString()} apprenants</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {renderRatingStars(formation.rating)}
                        <span className="text-sm text-gray-500">
                          {formation.rating} ({formation.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Par {formation.instructor}</p>
                        </div>
                        <div>
                          {formation.free ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Gratuit</Badge>
                          ) : (
                            <span className="font-bold text-lg">{formation.price} €</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Onglets par catégorie */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Explorer par catégorie</h2>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-6 flex flex-wrap justify-start gap-2">
                <TabsTrigger value="all">Toutes les formations</TabsTrigger>
                {categories.map((category, index) => (
                  <TabsTrigger key={index} value={category.name.toLowerCase().replace(/\s+/g, "-")}>
                    <span className="flex items-center gap-1">
                      {category.icon}
                      {category.name}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {formations.map((formation) => (
                    <Card key={formation.id} className="overflow-hidden hover:shadow-md transition-all">
                      <div className="relative h-48">
                        <Image
                          src={formation.image || "/placeholder.svg"}
                          alt={formation.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {formation.bestseller && <Badge className="bg-amber-500">Bestseller</Badge>}
                          {formation.new && <Badge className="bg-green-600">Nouveau</Badge>}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Badge
                            variant="outline"
                            className="font-normal text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            {formation.category}
                          </Badge>
                          {formation.certification && (
                            <Badge variant="outline" className="font-normal text-xs">
                              Certification
                            </Badge>
                          )}
                        </div>
                        <Link href={`/formations/${formation.id}`}>
                          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                            {formation.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{formation.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formation.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{formation.students.toLocaleString()} apprenants</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          {renderRatingStars(formation.rating)}
                          <span className="text-sm text-gray-500">
                            {formation.rating} ({formation.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Par {formation.instructor}</p>
                          </div>
                          <div>
                            {formation.free ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Gratuit</Badge>
                            ) : (
                              <span className="font-bold text-lg">{formation.price} €</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contenu pour chaque catégorie */}
              {categories.map((category, i) => (
                <TabsContent key={i} value={category.name.toLowerCase().replace(/\s+/g, "-")} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {formations
                      .filter((f) => f.category === category.name)
                      .map((formation) => (
                        <Card key={formation.id} className="overflow-hidden hover:shadow-md transition-all">
                          <div className="relative h-48">
                            <Image
                              src={formation.image || "/placeholder.svg"}
                              alt={formation.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                              {formation.bestseller && <Badge className="bg-amber-500">Bestseller</Badge>}
                              {formation.new && <Badge className="bg-green-600">Nouveau</Badge>}
                            </div>
                          </div>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <Badge
                                variant="outline"
                                className="font-normal text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                              >
                                {formation.subcategory || formation.category}
                              </Badge>
                              {formation.certification && (
                                <Badge variant="outline" className="font-normal text-xs">
                                  Certification
                                </Badge>
                              )}
                            </div>
                            <Link href={`/formations/${formation.id}`}>
                              <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                                {formation.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{formation.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{formation.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{formation.students.toLocaleString()} apprenants</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                              {renderRatingStars(formation.rating)}
                              <span className="text-sm text-gray-500">
                                {formation.rating} ({formation.reviews})
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">Par {formation.instructor}</p>
                              </div>
                              <div>
                                {formation.free ? (
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Gratuit</Badge>
                                ) : (
                                  <span className="font-bold text-lg">{formation.price} €</span>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Formations gratuites */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Formations gratuites</h2>
              <Button variant="link" className="text-blue-600">
                Voir tout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {formations
                .filter((f) => f.free)
                .map((formation) => (
                  <Card key={formation.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-48">
                      <Image
                        src={formation.image || "/placeholder.svg"}
                        alt={formation.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-600">Gratuit</Badge>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Badge
                          variant="outline"
                          className="font-normal text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          {formation.category}
                        </Badge>
                      </div>
                      <Link href={`/formations/${formation.id}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                          {formation.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{formation.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formation.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{formation.students.toLocaleString()} apprenants</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {renderRatingStars(formation.rating)}
                        <span className="text-sm text-gray-500">
                          {formation.rating} ({formation.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Par {formation.instructor}</p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          S'inscrire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Devenez formateur */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Devenez formateur sur CarrièrePlus</h2>
                <p className="text-gray-600 mb-6">
                  Partagez votre expertise professionnelle et aidez des milliers de candidats à développer leurs
                  compétences. Rejoignez notre réseau de formateurs et générez des revenus supplémentaires.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Partagez votre expertise</h3>
                      <p className="text-gray-600 text-sm">
                        Créez des formations dans votre domaine de spécialité et partagez vos connaissances.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Touchez un large public</h3>
                      <p className="text-gray-600 text-sm">
                        Bénéficiez de notre audience et de notre infrastructure pour diffuser vos formations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Générez des revenus</h3>
                      <p className="text-gray-600 text-sm">
                        Recevez une rémunération attractive pour chaque inscription à vos formations.
                      </p>
                    </div>
                  </li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                  Devenir formateur
                </Button>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Devenez+Formateur"
                  alt="Devenez formateur"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ce que nos apprenants disent</h2>
              <p className="text-gray-600">
                Découvrez les témoignages des personnes qui ont suivi nos formations et transformé leur carrière
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Thomas Dubois",
                  role: "Développeur Front-end",
                  testimonial:
                    "La formation sur LinkedIn a complètement transformé ma visibilité professionnelle. J'ai reçu trois propositions d'emploi dans le mois qui a suivi !",
                  image: "/placeholder.svg?height=100&width=100&text=TD",
                  rating: 5,
                  course: "LinkedIn : Optimiser son profil pour être repéré",
                },
                {
                  name: "Sarah Martin",
                  role: "Chargée de communication",
                  testimonial:
                    "Grâce à la formation sur les entretiens, j'ai pu préparer efficacement mes réponses et gagner en confiance. J'ai décroché le poste de mes rêves dès le second entretien.",
                  image: "/placeholder.svg?height=100&width=100&text=SM",
                  rating: 5,
                  course: "Maîtriser l'entretien d'embauche : techniques avancées",
                },
                {
                  name: "Julien Petit",
                  role: "Chef de projet IT",
                  testimonial:
                    "En reconversion professionnelle, j'étais perdu dans les démarches à suivre. La formation m'a fourni une méthodologie claire et efficace. Je recommande vivement !",
                  image: "/placeholder.svg?height=100&width=100&text=JP",
                  rating: 4.5,
                  course: "Reconversion professionnelle : Guide complet",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{testimonial.testimonial}</p>
                    <div className="flex items-center gap-2 mb-4">{renderRatingStars(testimonial.rating)}</div>
                    <p className="text-sm text-gray-500 italic mb-4">"{testimonial.course}"</p>
                    <div className="flex items-center mt-auto">
                      <div className="h-12 w-12 relative rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à développer vos compétences ?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Rejoignez notre communauté et accédez à des formations de qualité pour booster votre carrière
              professionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Découvrir les formations
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                S'inscrire gratuitement
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">CarrièrePlus</h3>
              <p className="text-gray-400 mb-4">
                Votre partenaire pour l'insertion professionnelle et le développement de carrière.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Formations</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    CV et Lettre de motivation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Entretien d'embauche
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    LinkedIn et réseaux
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Reconversion professionnelle
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Développement personnel
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Boutique</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Livres numériques
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Templates CV
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Guides pratiques
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Formations premium
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Outils d'évaluation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/a-propos" className="text-gray-400 hover:text-white transition">
                    À propos
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Nous contacter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Politique de confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} CarrièrePlus. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
