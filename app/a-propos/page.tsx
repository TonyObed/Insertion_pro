import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Check, Users, Award, BookOpen, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "À propos | CarrièrePlus",
  description:
    "Découvrez l'histoire, la mission et les valeurs de CarrièrePlus, votre partenaire pour l'insertion professionnelle",
}

export default function AProposPage() {
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
              <Link href="/formations" className="text-gray-600 hover:text-blue-600 transition">
                Formations
              </Link>
              <Link href="/boutique" className="text-gray-600 hover:text-blue-600 transition">
                Boutique
              </Link>
              <Link href="/a-propos" className="text-blue-600 font-medium">
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
        {/* Bannière */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">À propos de CarrièrePlus</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6">
                Votre partenaire de confiance pour l'insertion professionnelle et le développement de carrière depuis
                2015.
              </p>
            </div>
          </div>
        </section>

        {/* Notre mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=600&text=Notre+Mission"
                  alt="Notre mission"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
                <p className="text-gray-600 mb-6">
                  Chez CarrièrePlus, notre mission est d'accompagner chaque individu dans son parcours professionnel en
                  lui fournissant les outils, les connaissances et le soutien nécessaires pour réussir sur le marché du
                  travail actuel.
                </p>
                <p className="text-gray-600 mb-6">
                  Nous croyons que chacun mérite d'avoir accès à une formation de qualité et à des ressources
                  pertinentes pour développer ses compétences et atteindre ses objectifs professionnels, quel que soit
                  son parcours ou son niveau d'expérience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Accompagnement personnalisé</h3>
                      <p className="text-gray-600 text-sm">
                        Nous adaptons nos services aux besoins spécifiques de chaque utilisateur.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Formation de qualité</h3>
                      <p className="text-gray-600 text-sm">
                        Nos contenus sont créés par des experts reconnus dans leur domaine.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 bg-blue-100 rounded-full p-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Innovation constante</h3>
                      <p className="text-gray-600 text-sm">
                        Nous nous adaptons continuellement aux évolutions du marché du travail.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
              <p className="text-gray-600">Les principes qui guident nos actions et notre développement au quotidien</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  title: "Accessibilité",
                  description:
                    "Nous croyons que la formation professionnelle doit être accessible à tous, quels que soient leur situation ou leurs moyens.",
                },
                {
                  icon: <Award className="h-10 w-10 text-indigo-600" />,
                  title: "Excellence",
                  description:
                    "Nous nous engageons à offrir des contenus et des services de la plus haute qualité, constamment mis à jour et pertinents.",
                },
                {
                  icon: <BookOpen className="h-10 w-10 text-purple-600" />,
                  title: "Innovation",
                  description:
                    "Nous explorons continuellement de nouvelles approches pédagogiques et technologies pour améliorer l'expérience d'apprentissage.",
                },
                {
                  icon: <Star className="h-10 w-10 text-yellow-600" />,
                  title: "Intégrité",
                  description:
                    "Nous agissons avec honnêteté et transparence dans toutes nos interactions avec nos utilisateurs et partenaires.",
                },
                {
                  icon: <ChevronRight className="h-10 w-10 text-green-600" />,
                  title: "Impact",
                  description:
                    "Nous mesurons notre succès à l'aune des résultats concrets obtenus par nos utilisateurs dans leur parcours professionnel.",
                },
                {
                  icon: <Check className="h-10 w-10 text-red-600" />,
                  title: "Communauté",
                  description:
                    "Nous favorisons les échanges et l'entraide entre les membres de notre communauté pour un enrichissement mutuel.",
                },
              ].map((value, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-all">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{value.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Notre équipe */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Notre équipe</h2>
              <p className="text-gray-600">
                Des professionnels passionnés et experts dans leur domaine, dédiés à votre réussite
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Marie Dupont",
                  role: "Fondatrice & CEO",
                  bio: "Ancienne DRH avec plus de 15 ans d'expérience dans le recrutement et la formation professionnelle.",
                  image: "/placeholder.svg?height=300&width=300&text=MD",
                },
                {
                  name: "Thomas Martin",
                  role: "Directeur Pédagogique",
                  bio: "Expert en ingénierie de formation et en développement de compétences professionnelles.",
                  image: "/placeholder.svg?height=300&width=300&text=TM",
                },
                {
                  name: "Sophie Leroux",
                  role: "Responsable des Formations",
                  bio: "Spécialiste en développement de carrière et en techniques de recherche d'emploi.",
                  image: "/placeholder.svg?height=300&width=300&text=SL",
                },
                {
                  name: "Jean Dubois",
                  role: "Responsable Partenariats",
                  bio: "Développe des relations avec les entreprises et les organismes de formation partenaires.",
                  image: "/placeholder.svg?height=300&width=300&text=JD",
                },
                {
                  name: "Émilie Laurent",
                  role: "Coach Carrière",
                  bio: "Accompagne les candidats dans leur développement professionnel et leur recherche d'emploi.",
                  image: "/placeholder.svg?height=300&width=300&text=EL",
                },
                {
                  name: "Pierre Moreau",
                  role: "Expert Reconversion",
                  bio: "Spécialiste des parcours de reconversion professionnelle et de la formation continue.",
                  image: "/placeholder.svg?height=300&width=300&text=PM",
                },
                {
                  name: "Caroline Blanc",
                  role: "Responsable Marketing",
                  bio: "En charge de la stratégie de communication et du développement de la marque CarrièrePlus.",
                  image: "/placeholder.svg?height=300&width=300&text=CB",
                },
                {
                  name: "Michel Lambert",
                  role: "Responsable Technique",
                  bio: "Supervise le développement et la maintenance de la plateforme et des outils numériques.",
                  image: "/placeholder.svg?height=300&width=300&text=ML",
                },
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre histoire */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Notre histoire</h2>
              <p className="text-gray-600">L'évolution de CarrièrePlus depuis sa création jusqu'à aujourd'hui</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {[
                  {
                    year: "2015",
                    title: "Création de CarrièrePlus",
                    description:
                      "Fondée par Marie Dupont, CarrièrePlus naît avec l'ambition de démocratiser l'accès à la formation professionnelle et aux ressources d'insertion.",
                  },
                  {
                    year: "2017",
                    title: "Lancement de la plateforme en ligne",
                    description:
                      "Développement de notre première plateforme de formation en ligne, permettant d'atteindre un public plus large et diversifié.",
                  },
                  {
                    year: "2019",
                    title: "Expansion des services",
                    description:
                      "Élargissement de notre offre avec l'ajout de services de coaching personnalisé et de mise en relation avec des recruteurs partenaires.",
                  },
                  {
                    year: "2021",
                    title: "Refonte technologique",
                    description:
                      "Lancement d'une nouvelle version de notre plateforme intégrant des fonctionnalités innovantes et une expérience utilisateur améliorée.",
                  },
                  {
                    year: "2023",
                    title: "Développement international",
                    description:
                      "Début de notre expansion à l'international avec la traduction de nos contenus et l'adaptation de nos services à différents marchés.",
                  },
                  {
                    year: "Aujourd'hui",
                    title: "Une communauté en croissance",
                    description:
                      "CarrièrePlus compte désormais plus de 50 000 utilisateurs actifs et continue d'innover pour répondre aux besoins évolutifs du marché du travail.",
                  },
                ].map((milestone, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-blue-600 text-white text-xl font-bold py-3 px-6 rounded-lg text-center">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi nous choisir */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir CarrièrePlus ?</h2>
              <p className="text-gray-600">
                Ce qui nous distingue et fait de nous le partenaire idéal pour votre développement professionnel
              </p>
            </div>

            <Tabs defaultValue="candidats" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="candidats">Pour les candidats</TabsTrigger>
                <TabsTrigger value="recruteurs">Pour les recruteurs</TabsTrigger>
              </TabsList>

              <TabsContent value="candidats" className="p-6 bg-blue-50 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Des avantages uniques</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Formations certifiantes</h4>
                          <p className="text-gray-600 text-sm">
                            Des formations reconnues qui valorisent votre CV et attestent de vos compétences.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Accompagnement personnalisé</h4>
                          <p className="text-gray-600 text-sm">
                            Un suivi individuel pour vous aider à définir et atteindre vos objectifs professionnels.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Réseau de recruteurs</h4>
                          <p className="text-gray-600 text-sm">
                            Accès à notre réseau d'entreprises partenaires à la recherche de talents.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Ressources exclusives</h4>
                          <p className="text-gray-600 text-sm">
                            Des outils et contenus premium pour vous démarquer dans votre recherche d'emploi.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Avantages+Candidats"
                      alt="Avantages pour les candidats"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recruteurs" className="p-6 bg-indigo-50 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Des solutions efficaces</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-indigo-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Candidats qualifiés</h4>
                          <p className="text-gray-600 text-sm">
                            Accès à des profils formés et évalués, correspondant précisément à vos besoins.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-indigo-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Gain de temps</h4>
                          <p className="text-gray-600 text-sm">
                            Réduction significative du temps de recrutement grâce à notre présélection rigoureuse.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-indigo-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Formation sur mesure</h4>
                          <p className="text-gray-600 text-sm">
                            Possibilité de créer des parcours de formation adaptés aux besoins spécifiques de votre
                            entreprise.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 bg-indigo-600 rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Visibilité ciblée</h4>
                          <p className="text-gray-600 text-sm">
                            Promotion de votre marque employeur auprès d'une communauté de candidats motivés et
                            qualifiés.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Avantages+Recruteurs"
                      alt="Avantages pour les recruteurs"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Partenaires */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Nos partenaires</h2>
              <p className="text-gray-600">
                Ils nous font confiance et collaborent avec nous pour favoriser l'insertion professionnelle
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
                <div key={partner} className="flex justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm w-40 h-40 flex items-center justify-center">
                    <Image
                      src={`/placeholder.svg?height=120&width=120&text=Partenaire+${partner}`}
                      alt={`Partenaire ${partner}`}
                      width={120}
                      height={120}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez l'aventure CarrièrePlus</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Que vous soyez à la recherche d'un emploi, en reconversion professionnelle ou recruteur, nous avons les
              solutions adaptées à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/inscription">S'inscrire gratuitement</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700" asChild>
                <Link href="/contact">Nous contacter</Link>
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
    </div>
  )
}
