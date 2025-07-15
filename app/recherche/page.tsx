import type React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : ""

  // Résultats de recherche fictifs
  const results = query
    ? [
        {
          id: "f1",
          title: "Créer un CV qui attire l'attention des recruteurs",
          type: "formation",
          url: "/formations",
          description: "Apprenez à construire un CV professionnel qui se démarque et met en valeur vos compétences.",
        },
        {
          id: "f2",
          title: "Maîtriser l'entretien d'embauche",
          type: "formation",
          url: "/formations",
          description:
            "Des techniques éprouvées pour vous préparer efficacement et réussir tous vos entretiens d'embauche.",
        },
        {
          id: "p1",
          title: "Guide complet de la recherche d'emploi",
          type: "produit",
          url: "/boutique",
          description: "Un guide pratique pour votre recherche d'emploi.",
        },
      ]
    : []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Résultats de recherche</h1>

          <div className="max-w-xl mb-6">
            <form action="/recherche" method="get" className="flex gap-2">
              <Input
                type="text"
                name="q"
                placeholder="Rechercher des formations, produits, articles..."
                defaultValue={query}
                className="flex-1"
              />
              <Button type="submit">Rechercher</Button>
            </form>
          </div>

          {query ? (
            <div>
              {results.length > 0 ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    {results.length} résultat(s) pour "{query}"
                  </p>
                  <div className="space-y-4">
                    {results.map((result) => (
                      <Card key={result.id}>
                        <CardContent className="p-4">
                          <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                          <p className="text-gray-600 mb-2">{result.description}</p>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Type: {result.type === "formation" ? "Formation" : "Produit"}
                            </span>
                            <Button variant="link" asChild>
                              <Link href={result.url}>Voir plus</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Aucun résultat trouvé</h2>
                  <p className="text-gray-600 mb-6">
                    Nous n'avons trouvé aucun résultat pour "{query}". Essayez avec d'autres termes.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <h2 className="text-xl">Commencez par entrer un terme de recherche</h2>
            </div>
          )}
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

// Le composant Input est nécessaire pour la page
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
