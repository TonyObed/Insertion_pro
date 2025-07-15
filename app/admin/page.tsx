"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  LogOut,
  Plus,
  Search,
  Settings,
  Trash,
  Users,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("formations")
  const [searchQuery, setSearchQuery] = useState("")

  // Données fictives pour les formations
  const formations = [
    {
      id: "1",
      title: "Créer un CV qui attire l'attention des recruteurs",
      category: "CV et Lettre de motivation",
      price: "Gratuit",
      instructor: "Marie Dupont",
      students: 1245,
      status: "published",
      lastUpdated: "15/04/2023",
    },
    {
      id: "2",
      title: "Maîtriser l'entretien d'embauche : techniques avancées",
      category: "Entretien d'embauche",
      price: "49,99 €",
      instructor: "Thomas Martin",
      students: 856,
      status: "published",
      lastUpdated: "10/06/2023",
    },
    {
      id: "3",
      title: "LinkedIn : Optimiser son profil pour être repéré",
      category: "Réseaux sociaux",
      price: "29,99 €",
      instructor: "Sophie Leroux",
      students: 1532,
      status: "published",
      lastUpdated: "20/05/2023",
    },
    {
      id: "4",
      title: "Reconversion professionnelle : Guide complet",
      category: "Reconversion",
      price: "59,99 €",
      instructor: "Pierre Moreau",
      students: 421,
      status: "draft",
      lastUpdated: "01/08/2023",
    },
  ]

  // Filtrer les formations selon la recherche
  const filteredFormations = formations.filter(
    (formation) =>
      formation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formation.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Simuler la suppression
  const handleDelete = (id: string) => {
    alert(`Formation ${id} supprimée`)
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-blue-600">CarrièrePlus</span>
          </Link>
        </div>
        <nav className="mt-6">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Général</div>
          <a
            href="#"
            className={`flex items-center px-4 py-3 text-sm ${
              activeTab === "dashboard"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
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
              activeTab === "formations"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("formations")}
          >
            <BookOpen className="mr-3 h-5 w-5" />
            Formations
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-3 text-sm ${
              activeTab === "users"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Users className="mr-3 h-5 w-5" />
            Utilisateurs
          </a>
          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Paramètres</div>
          <a
            href="#"
            className={`flex items-center px-4 py-3 text-sm ${
              activeTab === "settings"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
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
              {activeTab === "formations" && "Gestion des formations"}
              {activeTab === "users" && "Gestion des utilisateurs"}
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
                <span className="text-sm text-gray-600">Admin</span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  A
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
                        <p className="text-sm font-medium text-gray-500">Total des formations</p>
                        <h3 className="text-2xl font-bold mt-1">{formations.length}</h3>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+12%</span> depuis le mois dernier
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total des apprenants</p>
                        <h3 className="text-2xl font-bold mt-1">4,054</h3>
                      </div>
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+8%</span> depuis le mois dernier
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Revenu total</p>
                        <h3 className="text-2xl font-bold mt-1">156,492 €</h3>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <BarChart className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+15%</span> depuis le mois dernier
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Note moyenne</p>
                        <h3 className="text-2xl font-bold mt-1">4.8/5</h3>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="text-green-500 font-medium">+0.2</span> depuis le mois dernier
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Inscriptions mensuelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-gray-500">Graphique des inscriptions mensuelles</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Formations populaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                      <p className="text-gray-500">Graphique des formations populaires</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "formations" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Liste des formations</h2>
                  <p className="text-sm text-gray-500 mt-1">Gérez vos formations et leurs contenus</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une formation
                </Button>
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
                        <TableHead>Titre</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Formateur</TableHead>
                        <TableHead>Apprenants</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Dernière mise à jour</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFormations.length > 0 ? (
                        filteredFormations.map((formation) => (
                          <TableRow key={formation.id}>
                            <TableCell className="font-medium">{formation.title}</TableCell>
                            <TableCell>{formation.category}</TableCell>
                            <TableCell>{formation.price}</TableCell>
                            <TableCell>{formation.instructor}</TableCell>
                            <TableCell>{formation.students}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  formation.status === "published"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {formation.status === "published" ? "Publiée" : "Brouillon"}
                              </Badge>
                            </TableCell>
                            <TableCell>{formation.lastUpdated}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(formation.id)}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            Aucune formation trouvée
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="p-4 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Affichage de {filteredFormations.length} sur {formations.length} formations
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-3 py-1">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Gestion des utilisateurs</h2>
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-64">
                <p className="text-gray-500">Contenu de la gestion des utilisateurs à venir</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Paramètres du compte</h2>
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-64">
                <p className="text-gray-500">Contenu des paramètres à venir</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
