"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronLeft, Bell, Lock, Eye, Globe, UserCog } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Paramètres enregistrés",
        description: "Vos paramètres ont été mis à jour avec succès.",
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/profil">
                <ChevronLeft className="h-4 w-4" />
                Retour au profil
              </Link>
            </Button>
          </div>

          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Paramètres</h1>
              <p className="text-gray-500 mt-1">Gérez vos préférences et paramètres de compte</p>
            </div>

            <Tabs defaultValue="compte">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4">
                  <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                    <TabsTrigger
                      value="compte"
                      className="justify-start w-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <UserCog className="h-4 w-4 mr-2" />
                      Compte
                    </TabsTrigger>
                    <TabsTrigger
                      value="securite"
                      className="justify-start w-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Sécurité
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="justify-start w-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="confidentialite"
                      className="justify-start w-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Confidentialité
                    </TabsTrigger>
                    <TabsTrigger
                      value="langue"
                      className="justify-start w-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Langue et région
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="w-full md:w-3/4">
                  <TabsContent value="compte" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Informations du compte</CardTitle>
                        <CardDescription>Mettez à jour les informations de base de votre compte</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <Input id="username" defaultValue="jean.dupont" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="demo@carriereplus.fr" />
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-medium mb-4">Préférences de compte</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="marketing" className="font-medium">
                                  Emails marketing
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Recevoir des emails sur les nouvelles formations et offres
                                </p>
                              </div>
                              <Switch id="marketing" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="newsletter" className="font-medium">
                                  Newsletter
                                </Label>
                                <p className="text-sm text-gray-500">Recevoir notre newsletter mensuelle</p>
                              </div>
                              <Switch id="newsletter" defaultChecked />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="securite" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sécurité</CardTitle>
                        <CardDescription>Gérez vos paramètres de sécurité et de connexion</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Mot de passe</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Mot de passe actuel</Label>
                              <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">Nouveau mot de passe</Label>
                              <Input id="new-password" type="password" />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Activer l'authentification à deux facteurs</p>
                              <p className="text-sm text-gray-500">
                                Ajouter une couche de sécurité supplémentaire à votre compte
                              </p>
                            </div>
                            <Switch id="2fa" />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Gérez vos préférences de notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notifications par email</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Mises à jour des formations</p>
                                <p className="text-sm text-gray-500">
                                  Recevoir des notifications sur les mises à jour de vos formations
                                </p>
                              </div>
                              <Switch id="course-updates" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Nouvelles formations</p>
                                <p className="text-sm text-gray-500">
                                  Être informé des nouvelles formations disponibles
                                </p>
                              </div>
                              <Switch id="new-courses" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Rappels</p>
                                <p className="text-sm text-gray-500">
                                  Recevoir des rappels pour les formations en cours
                                </p>
                              </div>
                              <Switch id="reminders" defaultChecked />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notifications sur le site</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Messages</p>
                                <p className="text-sm text-gray-500">
                                  Recevoir des notifications pour les nouveaux messages
                                </p>
                              </div>
                              <Switch id="messages" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Activité du forum</p>
                                <p className="text-sm text-gray-500">
                                  Être notifié des réponses à vos messages sur le forum
                                </p>
                              </div>
                              <Switch id="forum" defaultChecked />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="confidentialite" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Confidentialité</CardTitle>
                        <CardDescription>Gérez vos paramètres de confidentialité</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Visibilité du profil</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Profil public</p>
                                <p className="text-sm text-gray-500">
                                  Rendre votre profil visible pour les autres utilisateurs
                                </p>
                              </div>
                              <Switch id="public-profile" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Afficher les formations suivies</p>
                                <p className="text-sm text-gray-500">
                                  Permettre aux autres de voir les formations que vous suivez
                                </p>
                              </div>
                              <Switch id="show-courses" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Afficher les certificats</p>
                                <p className="text-sm text-gray-500">Permettre aux autres de voir vos certificats</p>
                              </div>
                              <Switch id="show-certificates" defaultChecked />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Données et cookies</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Cookies analytiques</p>
                                <p className="text-sm text-gray-500">
                                  Autoriser les cookies pour améliorer votre expérience
                                </p>
                              </div>
                              <Switch id="analytics-cookies" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Cookies marketing</p>
                                <p className="text-sm text-gray-500">
                                  Autoriser les cookies pour la publicité personnalisée
                                </p>
                              </div>
                              <Switch id="marketing-cookies" />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="langue" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Langue et région</CardTitle>
                        <CardDescription>Définissez vos préférences de langue et de région</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="language">Langue</Label>
                            <select id="language" className="w-full rounded-md border border-gray-300 p-2">
                              <option value="fr">Français</option>
                              <option value="en">English</option>
                              <option value="es">Español</option>
                              <option value="de">Deutsch</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="region">Région</Label>
                            <select id="region" className="w-full rounded-md border border-gray-300 p-2">
                              <option value="fr">France</option>
                              <option value="be">Belgique</option>
                              <option value="ch">Suisse</option>
                              <option value="ca">Canada</option>
                            </select>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Format</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date-format">Format de date</Label>
                              <select id="date-format" className="w-full rounded-md border border-gray-300 p-2">
                                <option value="dmy">JJ/MM/AAAA</option>
                                <option value="mdy">MM/JJ/AAAA</option>
                                <option value="ymd">AAAA-MM-JJ</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time-format">Format d'heure</Label>
                              <select id="time-format" className="w-full rounded-md border border-gray-300 p-2">
                                <option value="24h">24 heures</option>
                                <option value="12h">12 heures (AM/PM)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
