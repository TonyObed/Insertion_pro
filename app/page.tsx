import Image from "next/image"
import Link from "next/link"
import { Search, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroCarousel from "./carousel"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="font-bold text-xl text-blue-600">CarrièrePlus</div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/formations" className="text-gray-600 hover:text-blue-600 transition">
                Formations
              </Link>
              <Link href="/boutique" className="text-gray-600 hover:text-blue-600 transition">
                Boutique
              </Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                Recruteurs
              </a>
              <Link href="/a-propos" className="text-gray-600 hover:text-blue-600 transition">
                À propos
              </Link>
            </nav>
          </div>

          <div className="relative hidden md:block w-1/3">
            <Input
              type="text"
              placeholder="Rechercher des formations..."
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <HeroCarousel />
          </div>
        </section>

        {/* Recherche de formations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Trouvez la formation qui vous correspond</h2>
              <p className="text-gray-600">
                Filtrez par catégorie ou recherchez parmi notre catalogue complet de formations
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher une formation (CV, entretien, LinkedIn...)"
                  className="pl-12 pr-4 py-6 w-full rounded-lg border-gray-300 shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                  Rechercher
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition">
                CV et Lettre de motivation
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition">
                Entretien d'embauche
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition">
                LinkedIn
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition">
                Reconversion
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition">
                Soft Skills
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition">
                Négociation salariale
              </Badge>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition">
                Développement personnel
              </Badge>
            </div>
          </div>
        </section>

        {/* Formations populaires */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Formations populaires</h2>
              <Button variant="link" className="flex items-center gap-1" asChild>
                <Link href="/formations">
                  Voir toutes les formations
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                {
                  title: "Créer un CV qui attire l'attention des recruteurs",
                  instructor: "Marie Dubois",
                  duration: "1h 20min",
                  students: "8,245",
                  level: "Débutant",
                },
                {
                  title: "Techniques avancées pour réussir vos entretiens",
                  instructor: "Thomas Martin",
                  duration: "2h 15min",
                  students: "6,129",
                  level: "Intermédiaire",
                },
                {
                  title: "Optimiser son profil LinkedIn pour être repéré",
                  instructor: "Sophie Leroux",
                  duration: "1h 45min",
                  students: "9,872",
                  level: "Tous niveaux",
                },
                {
                  title: "Négocier son salaire avec confiance",
                  instructor: "Pierre Moreau",
                  duration: "1h 10min",
                  students: "5,631",
                  level: "Avancé",
                },
              ].map((course, index) => (
                <Link href="/formations" key={index}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="relative h-48">
                      <Image
                        src={`/placeholder.svg?height=300&width=400&text=Formation+${index + 1}`}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-blue-600">Populaire</Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">Par {course.instructor}</p>
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.students} apprenants
                        </span>
                        <span>{course.duration}</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-50">
                        {course.level}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pour qui ? */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Une solution pour chaque besoin</h2>
              <p className="text-gray-600">
                Que vous soyez candidat ou recruteur, nous avons des solutions adaptées à vos besoins
              </p>
            </div>

            <Tabs defaultValue="candidats" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="candidats">Pour les candidats</TabsTrigger>
                <TabsTrigger value="recruteurs">Pour les recruteurs</TabsTrigger>
              </TabsList>

              <TabsContent value="candidats" className="p-6 bg-blue-50 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Boostez votre carrière</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Accédez à des formations sur mesure pour améliorer vos compétences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Bénéficiez d'un accompagnement personnalisé par des experts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Entrez en contact direct avec des recruteurs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Consultez notre bibliothèque de ressources exclusives</span>
                      </li>
                    </ul>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">S'inscrire comme candidat</Button>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Candidats"
                      alt="Pour les candidats"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recruteurs" className="p-6 bg-indigo-50 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Trouvez les meilleurs talents</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-indigo-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Accédez à une base de candidats qualifiés et formés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-indigo-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Publiez vos offres d'emploi et recevez des candidatures ciblées</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-indigo-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Participez à nos événements de recrutement virtuels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-indigo-600 p-1 mt-1">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Bénéficiez d'outils d'évaluation des compétences</span>
                      </li>
                    </ul>
                    <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700">S'inscrire comme recruteur</Button>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Recruteurs"
                      alt="Pour les recruteurs"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
              <p className="text-gray-600">
                Découvrez les expériences de ceux qui ont transformé leur carrière grâce à notre plateforme
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Julie Martin",
                  role: "Développeuse Web Junior",
                  testimonial:
                    "Grâce aux formations sur la préparation aux entretiens, j'ai décroché mon premier emploi dans le développement web après ma reconversion professionnelle.",
                  company: "TechSolutions",
                },
                {
                  name: "Marc Dupont",
                  role: "Responsable RH",
                  testimonial:
                    "En tant que recruteur, j'ai pu trouver des candidats de qualité, déjà formés aux compétences que nous recherchions. Un gain de temps considérable !",
                  company: "Groupe Innovant",
                },
                {
                  name: "Camille Leroy",
                  role: "Chargée de communication",
                  testimonial:
                    "La formation sur l'optimisation de LinkedIn m'a permis d'être repérée par des recruteurs et de recevoir plusieurs propositions d'emploi intéressantes.",
                  company: "MediaCom",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{testimonial.testimonial}</p>
                    <div className="flex items-center mt-auto">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}, {testimonial.company}
                        </p>
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
            <h2 className="text-3xl font-bold mb-4">Prêt à booster votre carrière ?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Rejoignez notre communauté et accédez à des formations de qualité pour développer vos compétences
              professionnelles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/inscription">S'inscrire gratuitement</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-yellow-300 border-yellow-300 hover:bg-blue-700 hover:text-white hover:border-white transition-all duration-300"
                asChild
              >
                <Link href="/connexion">En savoir plus</Link>
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
                  <Link
                    href="/formations?category=cv-et-lettre-de-motivation"
                    className="text-gray-400 hover:text-white transition"
                  >
                    CV et Lettre de motivation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations?category=entretien-d-embauche"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Entretien d'embauche
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations?category=linkedin-et-reseaux"
                    className="text-gray-400 hover:text-white transition"
                  >
                    LinkedIn et réseaux
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations?category=reconversion-professionnelle"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Reconversion professionnelle
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formations?category=developpement-personnel"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Développement personnel
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Boutique</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/boutique?category=ebooks" className="text-gray-400 hover:text-white transition">
                    Livres numériques
                  </Link>
                </li>
                <li>
                  <Link href="/boutique?category=templates" className="text-gray-400 hover:text-white transition">
                    Templates CV
                  </Link>
                </li>
                <li>
                  <Link href="/boutique?category=ebooks" className="text-gray-400 hover:text-white transition">
                    Guides pratiques
                  </Link>
                </li>
                <li>
                  <Link href="/boutique?category=videos" className="text-gray-400 hover:text-white transition">
                    Formations premium
                  </Link>
                </li>
                <li>
                  <Link href="/boutique?category=outils" className="text-gray-400 hover:text-white transition">
                    Outils d'évaluation
                  </Link>
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
      {/* Script pour le carrousel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
      document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('carousel');
        const dots = document.querySelectorAll('.carousel-dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        const slideCount = 3;

        function goToSlide(index) {
          if (index < 0) index = slideCount - 1;
          if (index >= slideCount) index = 0;
          
          currentIndex = index;
          carousel.style.transform = \`translateX(-\${currentIndex * 100}%)\`;
          
          // Update active dot
          dots.forEach((dot, i) => {
            if (i === currentIndex) {
              dot.classList.add('active');
              dot.style.backgroundColor = 'white';
              dot.style.width = '12px';
            } else {
              dot.classList.remove('active');
              dot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              dot.style.width = '8px';
            }
          });
        }

        // Initialize dots click events
        dots.forEach((dot, i) => {
          dot.addEventListener('click', () => goToSlide(i));
        });

        // Initialize arrow buttons
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Auto-play
        let interval = setInterval(() => goToSlide(currentIndex + 1), 5000);

        // Pause on hover
        carousel.parentElement.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.parentElement.addEventListener('mouseleave', () => {
          clearInterval(interval);
          interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
        });

        // Initial setup
        goToSlide(0);
      });
    `,
        }}
      />
    </div>
  )
}
