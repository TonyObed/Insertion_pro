import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Clock, Users, Building } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Espace Recruteurs | CarrièrePlus",
  description: "Publiez vos offres d'emploi et trouvez les meilleurs talents pour votre entreprise",
}

// Types pour les offres d'emploi
interface JobOffer {
  id: string
  title: string
  company: string
  location: string
  type: "CDI" | "CDD" | "Stage" | "Alternance" | "Freelance"
  remote: boolean
  salary?: string
  description: string
  requirements: string[]
  postedAt: string
  deadline?: string
  featured?: boolean
  urgent?: boolean
  logo?: string
}

export default function RecruteursPage() {
  // Données fictives pour les offres d'emploi
  const jobOffers = [
    {
      id: "job1",
      title: "Développeur Front-End React",
      company: "TechSolutions",
      location: "Paris, France",
      type: "CDI",
      remote: true,
      postedAt: "10/05/2023",
      deadline: "10/06/2023",
      salary: "45 000€ - 55 000€",
      description:
        "Nous recherchons un développeur Front-End expérimenté pour rejoindre notre équipe et travailler sur des projets innovants utilisant React et Next.js.",
      requirements: [
        "3+ ans d'expérience en développement Front-End",
        "Maîtrise de React, TypeScript et Next.js",
        "Expérience avec les API RESTful et GraphQL",
        "Bonne connaissance des principes de design responsive",
      ],
      featured: true,
      logo: "/images/team-meeting.png",
    },
    {
      id: "job2",
      title: "Chef de Projet Marketing Digital",
      company: "MarketingPro",
      location: "Lyon, France",
      type: "CDI",
      remote: false,
      postedAt: "08/05/2023",
      deadline: "08/06/2023",
      salary: "40 000€ - 50 000€",
      description:
        "Rejoignez notre agence de marketing digital en tant que Chef de Projet pour gérer des campagnes marketing pour nos clients de renom.",
      requirements: [
        "5+ ans d'expérience en marketing digital",
        "Maîtrise des outils d'analyse (Google Analytics, etc.)",
        "Expérience en gestion de campagnes publicitaires",
        "Excellentes compétences en communication",
      ],
      logo: "/images/team-meeting.png",
    },
    {
      id: "job3",
      title: "Stagiaire en Ressources Humaines",
      company: "HRConsulting",
      location: "Bordeaux, France",
      type: "Stage",
      remote: false,
      postedAt: "12/05/2023",
      deadline: "30/05/2023",
      description: "Stage de 6 mois au sein de notre cabinet de recrutement spécialisé dans les métiers de l'IT.",
      requirements: [
        "Formation en RH, école de commerce ou équivalent",
        "Première expérience en recrutement appréciée",
        "Maîtrise du Pack Office",
        "Aisance relationnelle et rédactionnelle",
      ],
      logo: "/images/team-meeting.png",
    },
    {
      id: "job4",
      title: "Ingénieur DevOps",
      company: "CloudTech",
      location: "Toulouse, France",
      type: "CDI",
      remote: true,
      salary: "50 000€ - 65 000€",
      description:
        "Nous recherchons un Ingénieur DevOps pour renforcer notre équipe et améliorer nos processus d'intégration et de déploiement continus.",
      requirements: [
        "3+ ans d'expérience en DevOps",
        "Maîtrise de Docker, Kubernetes, et des outils CI/CD",
        "Expérience avec AWS ou Azure",
        "Connaissance des pratiques de sécurité informatique",
      ],
      postedAt: "2023-05-05",
      urgent: true,
      logo: "/images/team-meeting.png",
    },
    {
      id: "job5",
      title: "Alternant Marketing Digital",
      company: "E-Commerce Plus",
      location: "Nantes, France",
      type: "Alternance",
      remote: false,
      description:
        "Alternance d'un an dans notre entreprise e-commerce pour participer à la stratégie marketing digital et à l'animation des réseaux sociaux.",
      requirements: [
        "Formation en marketing digital",
        "Connaissance des réseaux sociaux",
        "Créativité et sens de l'initiative",
        "Intérêt pour le e-commerce",
      ],
      postedAt: "2023-05-11",
      deadline: "2023-06-15",
      logo: "/images/team-meeting.png",
    },
    {
      id: "job6",
      title: "Consultant en Cybersécurité",
      company: "SecureNet",
      location: "Paris, France",
      type: "CDI",
      remote: true,
      salary: "55 000€ - 70 000€",
      description:
        "Rejoignez notre équipe de consultants en cybersécurité pour accompagner nos clients dans la sécurisation de leurs systèmes d'information.",
      requirements: [
        "5+ ans d'expérience en cybersécurité",
        "Certifications (CISSP, CEH, etc.) appréciées",
        "Expérience en audit de sécurité",
        "Connaissance des normes ISO 27001",
      ],
      postedAt: "2023-05-03",
      featured: true,
      logo: "/images/team-meeting.png",
    },
  ]

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Bannière */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Trouvez les meilleurs talents pour votre entreprise
                </h1>
                <p className="text-lg text-indigo-100 mb-8">
                  Publiez vos offres d'emploi, consultez notre base de candidats qualifiés et bénéficiez de nos outils
                  de recrutement innovants.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                    Publier une offre
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-700">
                    Consulter les CV
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/team-meeting.png" alt="Recrutement" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Pourquoi recruter avec CarrièrePlus ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Candidats qualifiés",
                  description:
                    "Accédez à notre base de candidats formés et qualifiés, prêts à relever de nouveaux défis professionnels.",
                  icon: <Users className="h-10 w-10 text-indigo-600" />,
                },
                {
                  title: "Outils innovants",
                  description:
                    "Bénéficiez d'outils de recrutement avancés pour filtrer les candidats et optimiser votre processus de sélection.",
                  icon: <Briefcase className="h-10 w-10 text-indigo-600" />,
                },
                {
                  title: "Accompagnement personnalisé",
                  description:
                    "Nos experts en recrutement vous accompagnent à chaque étape pour trouver les profils qui correspondent à vos besoins.",
                  icon: <Building className="h-10 w-10 text-indigo-600" />,
                },
              ].map((advantage, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-indigo-50 rounded-full">{advantage.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Offres d'emploi */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Offres d'emploi récentes</h2>
              <Button variant="outline" className="hidden md:flex">
                Voir toutes les offres
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {jobOffers.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge
                          className={
                            job.type === "CDI" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                          }
                        >
                          {job.type}
                        </Badge>
                        {job.remote && (
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                            Télétravail possible
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4">
                      <Briefcase className="h-4 w-4" />
                      <span>Publiée le {job.postedAt}</span>
                      {job.deadline && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Jusqu'au {job.deadline}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">Voir l'offre</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Button variant="outline">Voir toutes les offres</Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
