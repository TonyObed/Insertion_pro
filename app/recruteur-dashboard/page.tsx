"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Briefcase,
  Calendar,
  Filter,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Search,
  Settings,
  Users,
} from "lucide-react"

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("candidates")
  const [searchQuery, setSearchQuery] = useState("")

  // Données fictives pour les candidats
  const candidates = [
    {
      id: "1",
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      phone: "06 12 34 56 78",
      location: "Paris, France",
      title: "Développeur Front-End Senior",
      skills: ["React", "TypeScript", "Next.js"],
      status: "new",
      appliedAt: "10/05/2023",
    },
    {
      id: "2",
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      phone: "07 23 45 67 89",
      location: "Lyon, France",
      title: "Chef de Projet Marketing",
      skills: ["Gestion de projet", "Marketing digital", "SEO/SEA"],
      status: "interview",
      appliedAt: "05/05/2023",
    },
    {
      id: "3",
      name: "Alexandre Petit",
      email: "alexandre.petit@example.com",
      phone: "06 34 56 78 90",
      location: "Bordeaux, France",
      title: "Ingénieur DevOps",
      skills: ["Docker", "Kubernetes", "AWS"],
      status: "offer",
      appliedAt: "12/05/2023",
    },
  ]

  // Filtrer les candidats selon la recherche
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-indigo-600">CarrièrePlus</span>
          </Link>
        </div>
        <nav className="mt-6">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Recrutement</div>
          <a
            href="#"
            className={`flex items-center px-4 py-3 text-sm ${
              activeTab === "dashboard"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart className="mr-3 h-5 w-5" />
            Tableau de bord
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-3 text-sm ${
              activeTab === "candidates"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("candidates")}
          >
            <Users className="mr-3 h-5 w-5" />
            Candidats
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-3 text-sm ${
              activeTab === "jobs"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="mr-3 h-5 w-5" />
            Offres d'emploi
          </a>
          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Paramètres</div>
          <a
            href="#"
            className={`flex items-center px-4 py-3 text-sm ${
              activeTab === "settings"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-3 h-5 w-5" />
            Paramètres
          </a>
          <div className="px-4 py-6">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab === "dashboard" && "Tableau de bord"}
              {activeTab === "candidates" && "Gestion des candidats"}
              {activeTab === "jobs" && "Gestion des offres d'emploi"}
              {activeTab === "settings" && "Paramètres du compte"}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-64 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Recruteur</span>
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                  R
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {activeTab === "dashboard" && (
            <div>
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total des candidats</p>
                        <h3 className="text-2xl font-bold mt-1">{candidates.length}</h3>
                      </div>
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+5</span> depuis le mois dernier
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nouveaux candidats</p>
                        <h3 className="text-2xl font-bold mt-1">2</h3>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+2</span> cette semaine
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Offres actives</p>
                        <h3 className="text-2xl font-bold mt-1">3</h3>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+1</span> depuis la semaine dernière
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Taux d'embauche</p>
                        <h3 className="text-2xl font-bold mt-1">75%</h3>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+5%</span> par rapport au trimestre précédent
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts placeholder */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-lg font-semibold mb-2">Statistiques des candidatures</h2>
                <p className="text-gray-500">
                  Les graphiques et statistiques détaillées seront disponibles prochainement.
                </p>
              </div>
            </div>
          )}

          {activeTab === "candidates" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Liste des candidats</h2>
                  <p className="text-sm text-gray-500 mt-1">Gérez les candidatures et suivez leur progression</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Exporter les candidats</Button>
              </div>

              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Filtres:</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidat</TableHead>
                        <TableHead>Poste</TableHead>
                        <TableHead>Compétences</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date de candidature</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCandidates.length > 0 ? (
                        filteredCandidates.map((candidate) => (
                          <TableRow key={candidate.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{candidate.name}</div>
                                <div className="text-sm text-gray-500">{candidate.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{candidate.title}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="bg-gray-100">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`
                                  ${
                                    candidate.status === "new"
                                      ? "bg-blue-100 text-blue-800"
                                      : candidate.status === "interview"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-orange-100 text-orange-800"
                                  }
                                `}
                              >
                                {candidate.status === "new"
                                  ? "Nouveau"
                                  : candidate.status === "interview"
                                    ? "Entretien"
                                    : "Offre"}
                              </Badge>
                            </TableCell>
                            <TableCell>{candidate.appliedAt}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                Voir le profil
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            Aucun candidat trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Profil du candidat */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Détails du candidat</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Informations personnelles</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>thomas.dubois@example.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>06 12 34 56 78</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Paris, France</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Candidature le 10/05/2023</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Compétences</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-gray-100">
                        React
                      </Badge>
                      <Badge variant="outline" className="bg-gray-100">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="bg-gray-100">
                        Next.js
                      </Badge>
                      <Badge variant="outline" className="bg-gray-100">
                        Tailwind CSS
                      </Badge>
                      <Badge variant="outline" className="bg-gray-100">
                        GraphQL
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-indigo-600 hover:bg-indigo-700">Contacter</Button>
                      <Button variant="outline">Télécharger CV</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "jobs" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Gestion des offres d'emploi</h2>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500">Gérez vos offres d'emploi et suivez les candidatures</p>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Nouvelle offre</Button>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune offre d'emploi active</h3>
                  <p className="text-gray-500 mb-4">
                    Commencez par créer une nouvelle offre d'emploi pour attirer des candidats qualifiés.
                  </p>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Créer une offre</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Paramètres du compte</h2>
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-64">
                <p className="text-gray-500">Les paramètres du compte seront disponibles prochainement.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
