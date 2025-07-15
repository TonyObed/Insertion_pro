"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  ShoppingCart,
  Filter,
  ChevronDown,
  Star,
  StarHalf,
  BookOpen,
  FileText,
  Download,
  Award,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { useCart, type Product } from "@/lib/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Types pour les produits
export default function BoutiquePage() {
  const { toast } = useToast()
  const { addItem } = useCart()
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>({})

  // Données des produits (simulées)
  const products: Product[] = [
    {
      id: "1",
      title: "Guide complet de la recherche d'emploi",
      description: "Un guide détaillé pour optimiser votre recherche d'emploi et décrocher le poste de vos rêves.",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=300&text=Guide+Emploi",
      category: "ebooks",
      type: "ebook",
      rating: 4.8,
      reviews: 124,
      bestseller: true,
      author: "Marie Dupont",
    },
    {
      id: "2",
      title: "Template CV Premium - Design Moderne",
      description: "Un modèle de CV professionnel au design moderne qui attirera l'attention des recruteurs.",
      price: 12.99,
      originalPrice: 17.99,
      image: "/placeholder.svg?height=400&width=300&text=CV+Premium",
      category: "templates",
      type: "template",
      rating: 4.9,
      reviews: 87,
      sale: true,
    },
    {
      id: "3",
      title: "Masterclass : Réussir son entretien d'embauche",
      description: "Une formation vidéo complète pour maîtriser l'art de l'entretien d'embauche.",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=300&text=Masterclass+Entretien",
      category: "videos",
      type: "video",
      rating: 4.7,
      reviews: 56,
      author: "Thomas Martin",
    },
    {
      id: "4",
      title: "Pack de 50 modèles de lettres de motivation",
      description: "Une collection de modèles de lettres de motivation adaptés à différents secteurs et postes.",
      price: 15.99,
      image: "/placeholder.svg?height=400&width=300&text=Lettres+Motivation",
      category: "templates",
      type: "template",
      rating: 4.5,
      reviews: 42,
    },
    {
      id: "5",
      title: "Outil d'analyse de CV - Optimisez votre candidature",
      description: "Un outil intelligent qui analyse votre CV et vous propose des améliorations ciblées.",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=300&text=Analyse+CV",
      category: "outils",
      type: "tool",
      rating: 4.6,
      reviews: 38,
      new: true,
    },
    {
      id: "6",
      title: "LinkedIn : Stratégies avancées pour votre profil",
      description: "Apprenez à optimiser votre profil LinkedIn pour attirer les recruteurs et développer votre réseau.",
      price: 22.99,
      image: "/placeholder.svg?height=400&width=300&text=LinkedIn+Pro",
      category: "ebooks",
      type: "ebook",
      rating: 4.7,
      reviews: 65,
      author: "Sophie Leroux",
    },
    {
      id: "7",
      title: "Template CV Créatif - Secteurs artistiques",
      description: "Un modèle de CV créatif idéal pour les professionnels des secteurs artistiques et créatifs.",
      price: 14.99,
      originalPrice: 19.99,
      image: "/placeholder.svg?height=400&width=300&text=CV+Créatif",
      category: "templates",
      type: "template",
      rating: 4.8,
      reviews: 29,
      sale: true,
    },
    {
      id: "8",
      title: "Guide de reconversion professionnelle",
      description: "Un guide complet pour réussir votre reconversion professionnelle et changer de carrière.",
      price: 18.99,
      image: "/placeholder.svg?height=400&width=300&text=Reconversion",
      category: "ebooks",
      type: "ebook",
      rating: 4.9,
      reviews: 47,
      bestseller: true,
      author: "Jean Dubois",
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

  // Fonction pour afficher l'icône du type de produit
  const renderProductTypeIcon = (type: Product["type"]) => {
    switch (type) {
      case "ebook":
        return <BookOpen className="w-4 h-4" />
      case "template":
        return <FileText className="w-4 h-4" />
      case "video":
        return <Download className="w-4 h-4" />
      case "tool":
        return <Award className="w-4 h-4" />
      default:
        return null
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)

    // Afficher l'animation "Ajouté"
    setAddedProducts((prev) => ({ ...prev, [product.id]: true }))

    // Réinitialiser après 2 secondes
    setTimeout(() => {
      setAddedProducts((prev) => ({ ...prev, [product.id]: false }))
    }, 2000)

    toast({
      title: "Produit ajouté au panier",
      description: `${product.title} a été ajouté à votre panier.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main>
        {/* Bannière de la boutique */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Boutique CarrièrePlus</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6">
                Découvrez notre sélection de ressources premium pour booster votre carrière professionnelle et maximiser
                vos chances de réussite.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 text-sm">Ebooks</Badge>
                <Badge className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 text-sm">Templates CV</Badge>
                <Badge className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 text-sm">Formations vidéo</Badge>
                <Badge className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 text-sm">Outils d'analyse</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Barre de recherche et filtres */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-1/2">
                <Input
                  type="text"
                  placeholder="Rechercher dans la boutique..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 hidden md:inline">Filtrer par:</span>
                </div>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="ebooks">Ebooks</SelectItem>
                    <SelectItem value="templates">Templates CV</SelectItem>
                    <SelectItem value="videos">Formations vidéo</SelectItem>
                    <SelectItem value="outils">Outils d'analyse</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popularité</SelectItem>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Catégories de produits */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Catégories populaires</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Ebooks",
                  description: "Guides et livres numériques",
                  icon: <BookOpen className="h-8 w-8 text-blue-600" />,
                  color: "bg-blue-50",
                  count: 24,
                },
                {
                  title: "Templates CV",
                  description: "Modèles de CV professionnels",
                  icon: <FileText className="h-8 w-8 text-indigo-600" />,
                  color: "bg-indigo-50",
                  count: 18,
                },
                {
                  title: "Formations vidéo",
                  description: "Cours et masterclass",
                  icon: <Download className="h-8 w-8 text-purple-600" />,
                  color: "bg-purple-50",
                  count: 12,
                },
                {
                  title: "Outils d'analyse",
                  description: "Outils pour optimiser vos candidatures",
                  icon: <Award className="h-8 w-8 text-teal-600" />,
                  color: "bg-teal-50",
                  count: 8,
                },
              ].map((category, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
                  <Link href={`/boutique?category=${category.title.toLowerCase()}`} className="block p-6">
                    <div className={`rounded-full w-16 h-16 flex items-center justify-center mb-4 ${category.color}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{category.description}</p>
                    <p className="text-sm text-blue-600">{category.count} produits</p>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Produits */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Nos produits</h2>
              <Button variant="outline" className="flex items-center gap-1">
                Voir tous les produits
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="ebooks">Ebooks</TabsTrigger>
                <TabsTrigger value="templates">Templates CV</TabsTrigger>
                <TabsTrigger value="videos">Formations vidéo</TabsTrigger>
                <TabsTrigger value="outils">Outils d'analyse</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          width={300}
                          height={400}
                          className="w-full h-48 object-cover"
                        />
                        {product.bestseller && (
                          <Badge className="absolute top-3 left-3 bg-yellow-500">Bestseller</Badge>
                        )}
                        {product.new && <Badge className="absolute top-3 left-3 bg-green-500">Nouveau</Badge>}
                        {product.sale && <Badge className="absolute top-3 left-3 bg-red-500">Promo</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          {renderProductTypeIcon(product.type)}
                          <span className="capitalize">
                            {product.type === "ebook"
                              ? "Ebook"
                              : product.type === "template"
                                ? "Template"
                                : product.type === "video"
                                  ? "Vidéo"
                                  : "Outil"}
                          </span>
                          {product.author && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{product.author}</span>
                            </>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          {renderRatingStars(product.rating)}
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div>
                          {product.originalPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                              <span className="text-sm text-gray-500 line-through">
                                {product.originalPrice.toFixed(2)} €
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className={`transition-all duration-300 ${
                            addedProducts[product.id]
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          onClick={() => handleAddToCart(product)}
                        >
                          {addedProducts[product.id] ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Ajouté
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Ajouter
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ebooks" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products
                    .filter((p) => p.type === "ebook")
                    .map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
                        <div className="relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={400}
                            className="w-full h-48 object-cover"
                          />
                          {product.bestseller && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500">Bestseller</Badge>
                          )}
                          {product.new && <Badge className="absolute top-3 left-3 bg-green-500">Nouveau</Badge>}
                          {product.sale && <Badge className="absolute top-3 left-3 bg-red-500">Promo</Badge>}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <BookOpen className="h-4 w-4" />
                            <span>Ebook</span>
                            {product.author && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{product.author}</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            {renderRatingStars(product.rating)}
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <div>
                            {product.originalPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                                <span className="text-sm text-gray-500 line-through">
                                  {product.originalPrice.toFixed(2)} €
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className={`transition-all duration-300 ${
                              addedProducts[product.id]
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            onClick={() => handleAddToCart(product)}
                          >
                            {addedProducts[product.id] ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Ajouté
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Ajouter
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Contenu similaire pour les autres onglets */}
              <TabsContent value="templates" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products
                    .filter((p) => p.type === "template")
                    .map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
                        {/* Contenu similaire */}
                        <div className="relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={400}
                            className="w-full h-48 object-cover"
                          />
                          {product.bestseller && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500">Bestseller</Badge>
                          )}
                          {product.new && <Badge className="absolute top-3 left-3 bg-green-500">Nouveau</Badge>}
                          {product.sale && <Badge className="absolute top-3 left-3 bg-red-500">Promo</Badge>}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <FileText className="h-4 w-4" />
                            <span>Template</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            {renderRatingStars(product.rating)}
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <div>
                            {product.originalPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                                <span className="text-sm text-gray-500 line-through">
                                  {product.originalPrice.toFixed(2)} €
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className={`transition-all duration-300 ${
                              addedProducts[product.id]
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            onClick={() => handleAddToCart(product)}
                          >
                            {addedProducts[product.id] ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Ajouté
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Ajouter
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products
                    .filter((p) => p.type === "video")
                    .map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
                        {/* Contenu similaire */}
                        <div className="relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={400}
                            className="w-full h-48 object-cover"
                          />
                          {product.bestseller && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500">Bestseller</Badge>
                          )}
                          {product.new && <Badge className="absolute top-3 left-3 bg-green-500">Nouveau</Badge>}
                          {product.sale && <Badge className="absolute top-3 left-3 bg-red-500">Promo</Badge>}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Download className="h-4 w-4" />
                            <span>Vidéo</span>
                            {product.author && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{product.author}</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            {renderRatingStars(product.rating)}
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <div>
                            {product.originalPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                                <span className="text-sm text-gray-500 line-through">
                                  {product.originalPrice.toFixed(2)} €
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className={`transition-all duration-300 ${
                              addedProducts[product.id]
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            onClick={() => handleAddToCart(product)}
                          >
                            {addedProducts[product.id] ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Ajouté
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Ajouter
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="outils" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products
                    .filter((p) => p.type === "tool")
                    .map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
                        <div className="relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={400}
                            className="w-full h-48 object-cover"
                          />
                          {product.bestseller && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500">Bestseller</Badge>
                          )}
                          {product.new && <Badge className="absolute top-3 left-3 bg-green-500">Nouveau</Badge>}
                          {product.sale && <Badge className="absolute top-3 left-3 bg-red-500">Promo</Badge>}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Award className="h-4 w-4" />
                            <span>Outil</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            {renderRatingStars(product.rating)}
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <div>
                            {product.originalPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                                <span className="text-sm text-gray-500 line-through">
                                  {product.originalPrice.toFixed(2)} €
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className={`transition-all duration-300 ${
                              addedProducts[product.id]
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            onClick={() => handleAddToCart(product)}
                          >
                            {addedProducts[product.id] ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Ajouté
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Ajouter
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Produits en promotion */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Promotions spéciales</h2>
              <Button variant="link" className="text-blue-600">
                Voir toutes les promotions
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => p.sale)
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-1/3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          width={300}
                          height={400}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-red-500">Promo</Badge>
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          {renderProductTypeIcon(product.type)}
                          <span className="capitalize">
                            {product.type === "ebook"
                              ? "Ebook"
                              : product.type === "template"
                                ? "Template"
                                : product.type === "video"
                                  ? "Vidéo"
                                  : "Outil"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          {renderRatingStars(product.rating)}
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-red-600">{product.price.toFixed(2)} €</span>
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice?.toFixed(2)} €
                          </span>
                          <Badge className="bg-red-100 text-red-600 ml-2">
                            -
                            {Math.round(
                              (((product.originalPrice || 0) - product.price) / (product.originalPrice || 1)) * 100,
                            )}
                            %
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          className={`w-full transition-all duration-300 ${
                            addedProducts[product.id]
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          onClick={() => handleAddToCart(product)}
                        >
                          {addedProducts[product.id] ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Ajouté au panier
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Ajouter au panier
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Questions fréquentes</h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Comment télécharger mes achats ?</AccordionTrigger>
                  <AccordionContent>
                    Après votre achat, vous recevrez un email de confirmation avec un lien de téléchargement. Vous
                    pouvez également accéder à tous vos achats depuis votre espace personnel dans la section "Mes
                    achats".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Quels sont les moyens de paiement acceptés ?</AccordionTrigger>
                  <AccordionContent>
                    Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal, et virement bancaire
                    pour les commandes professionnelles.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Puis-je obtenir une facture pour mes achats ?</AccordionTrigger>
                  <AccordionContent>
                    Oui, une facture est automatiquement générée et envoyée par email après chaque achat. Vous pouvez
                    également retrouver toutes vos factures dans votre espace personnel.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Quelle est votre politique de remboursement ?</AccordionTrigger>
                  <AccordionContent>
                    Nous offrons une garantie satisfait ou remboursé de 14 jours pour tous nos produits numériques. Si
                    vous n'êtes pas satisfait, contactez notre service client pour obtenir un remboursement.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Les templates CV sont-ils personnalisables ?</AccordionTrigger>
                  <AccordionContent>
                    Oui, tous nos templates CV sont entièrement personnalisables. Ils sont fournis dans des formats
                    faciles à modifier (Word, Pages, Photoshop) avec des instructions détaillées.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à booster votre carrière ?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Découvrez nos ressources premium et donnez-vous toutes les chances de réussir dans votre recherche
              d'emploi et votre développement professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Explorer la boutique
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Voir les bestsellers
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
