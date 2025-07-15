import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Briefcase, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Recherche de candidats | CarrièrePlus",
  description: "Trouvez les meilleurs talents pour votre entreprise",
}

// Types pour les résultats de recherche
interface CandidateResult {
  id: string
  name: string
  title: string
  location: string
  skills: string[]
  experience: number
  education: string
  avatar: string
  available: boolean
  lastActive: string
}

// Composant pour afficher les résultats de recherche
function SearchResults({ query }: { query: string }) {
  // Simuler des résultats de recherche
  const results: CandidateResult[] = [
    {
      id: "c1",
      name: "Thomas Dubois",
      title: "Développeur Front-End Senior",
      location: "Paris, France",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      experience: 5,
      education: "Master en Informatique, Université Paris-Saclay",
      avatar: "/images/profile-placeholder.png",
      available: true,
      lastActive: "2023-05-10",
    },
    {
      id: "c2",
      name: "Sophie Martin",
      title: "Chef de Projet Marketing",
      location: "Lyon, France",
      skills: ["Gestion de projet", "Marketing digital", "SEO/SEA", "Analyse de données", "CRM"],
      experience: 7,
      education: "MBA Marketing, EM Lyon Business School",
      avatar: "/images/profile-placeholder.png",
      available: true,
      lastActive: "2023-05-05",
    },
    {
      id: "c3",
      name: "Alexandre Petit",
      title: "Ingénieur DevOps",
      location: "Bordeaux, France",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux"],
      experience: 3,
      education: "Ingénieur en Informatique, INSA Toulouse",
      avatar: "/images/profile-placeholder.png",
      available: false,
      lastActive: "2023-05-12",
    },
    {
      id: "c4",
      name: "Julie Leroy",
      title: "UX/UI Designer",
      location: "Nantes, France",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototypage", "Design System", "User Research"],
      experience: 4,
      education: "Master en Design Numérique, Gobelins",
      avatar: "/images/profile-placeholder.png",
      available: true,
      lastActive: "2023-05-08",
    },
    {
      id: "c5",
      name: "Marc Dupont",
      title: "Data Scientist",
      location: "Toulouse, France",
      skills: ["Python", "R", "Machine Learning", "TensorFlow", "SQL", "Data Visualization"],
      experience: 6,
      education: "Doctorat en Statistiques, Université Paris-Dauphine",
      avatar: "/images/profile-placeholder.png",
      available: true,
      lastActive: "2023-05-03",
    },
  ].filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase()) ||
      item.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase())),
  )

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <Search className="h-12 w-12 mx-auto text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Aucun candidat trouvé</h2>
        <p className="text-gray-600 mb-6">
          Nous n'avons trouvé aucun candidat correspondant à "{query}". Essayez avec d'autres termes ou parcourez nos
          catégories.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/recruteurs">Retour à l'espace recruteurs</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/recruteur-dashboard">Accéder au dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          {results.length} candidat{results.length > 1 ? "s" : ""} pour "{query}"
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">Tous ({results.length})</TabsTrigger>
          <TabsTrigger value="available">Disponibles ({results.filter((r) => r.available).length})</TabsTrigger>
          <TabsTrigger value="recent">
            Récemment actifs (
            {results.filter((r) => new Date(r.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((result) => (
              <CandidateCard key={result.id} candidate={result} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {results
              .filter((result) => result.available)
              .map((result) => (
                <CandidateCard key={result.id} candidate={result} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {results
              .filter((result) => new Date(result.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
              .map((result) => (
                <CandidateCard key={result.id} candidate={result} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Composant pour afficher une carte de candidat
function CandidateCard({ candidate }: { candidate: CandidateResult }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src={candidate.avatar || "/placeholder.svg?height=200&width=200"}
              alt={candidate.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">{candidate.name}</h3>
            <p className="text-gray-600 mb-2">{candidate.title}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 4 && (
                <Badge variant="outline" className="bg-gray-100">
                  +{candidate.skills.length - 4}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{candidate.experience} ans d'expérience</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Actif le {new Date(candidate.lastActive).toLocaleDateString("fr-FR")}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
        <Badge className={candidate.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
          {candidate.available ? "Disponible" : "Non disponible"}
        </Badge>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/recruteurs/candidats/${candidate.id}`}>Voir le profil</Link>
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            Contacter
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : ""

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-indigo-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Recherche de candidats</h1>
              <p className="text-indigo-100 mb-8">
                Trouvez les meilleurs talents pour votre entreprise parmi notre base de candidats qualifiés.
              </p>
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                <form action="/recruteurs/recherche" method="get">
                  <Input
                    type="text"
                    name="q"
                    placeholder="Rechercher par compétence, titre, localisation..."
                    defaultValue={query}
                    className="border-0 h-14 pl-5 pr-32 text-gray-800"
                  />
                  <Button type="submit" className="absolute right-2 top-2 h-10 bg-indigo-600 hover:bg-indigo-700">
                    Rechercher
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Suspense fallback={<div className="py-12 text-center">Chargement des résultats...</div>}>
              <SearchResults query={query} />
            </Suspense>
          </div>
        </div>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Besoin d'aide pour votre recrutement ?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Nos experts en recrutement peuvent vous aider à trouver les meilleurs candidats pour vos postes à
                pourvoir.
              </p>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Demander un accompagnement
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
