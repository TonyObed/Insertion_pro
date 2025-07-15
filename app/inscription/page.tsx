import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Inscription | CarrièrePlus",
  description: "Créez votre compte CarrièrePlus pour accéder à nos formations et ressources",
}

export default function InscriptionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header simplifié */}
      <header className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="font-bold text-xl text-blue-600">CarrièrePlus</div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">Inscription</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          {/* Partie gauche - Illustration et texte */}
          <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
            <div className="relative w-full h-64 mb-8">
              <Image
                src="/placeholder.svg?height=400&width=400&text=Inscription"
                alt="Illustration inscription"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Rejoignez <span className="text-blue-600">CarrièrePlus</span>
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Créez votre compte pour accéder à nos formations, développer vos compétences et booster votre carrière.
            </p>
            <div className="space-y-4 w-full">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">+200 formations</h3>
                  <p className="text-sm text-gray-500">Accédez à notre catalogue complet de formations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Suivi personnalisé</h3>
                  <p className="text-sm text-gray-500">Suivez votre progression et recevez des recommandations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mise en relation</h3>
                  <p className="text-sm text-gray-500">Connectez-vous avec des recruteurs et des professionnels</p>
                </div>
              </div>
            </div>
          </div>

          {/* Partie droite - Formulaire d'inscription */}
          <div>
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
                <CardDescription className="text-center">
                  Remplissez le formulaire ci-dessous pour vous inscrire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="candidat" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="candidat">Candidat</TabsTrigger>
                    <TabsTrigger value="recruteur">Recruteur</TabsTrigger>
                  </TabsList>

                  <TabsContent value="candidat" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input id="prenom" type="text" className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input id="nom" type="text" className="w-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="exemple@email.com" className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" className="w-full" />
                      <p className="text-xs text-gray-500">
                        Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" className="w-full" />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Créer un compte candidat
                    </Button>
                  </TabsContent>

                  <TabsContent value="recruteur" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prenom-recruteur">Prénom</Label>
                        <Input id="prenom-recruteur" type="text" className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nom-recruteur">Nom</Label>
                        <Input id="nom-recruteur" type="text" className="w-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entreprise">Entreprise</Label>
                      <Input id="entreprise" type="text" className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fonction">Fonction</Label>
                      <Input id="fonction" type="text" className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-recruteur">Email professionnel</Label>
                      <Input
                        id="email-recruteur"
                        type="email"
                        placeholder="exemple@entreprise.com"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-recruteur">Mot de passe</Label>
                      <Input id="password-recruteur" type="password" className="w-full" />
                      <p className="text-xs text-gray-500">
                        Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre
                      </p>
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Créer un compte recruteur
                    </Button>
                  </TabsContent>
                </Tabs>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">Ou s'inscrire avec</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                  <span className="text-gray-600">Vous avez déjà un compte ?</span>{" "}
                  <Link href="/connexion" className="text-blue-600 hover:text-blue-800 font-medium transition">
                    Se connecter
                  </Link>
                </div>
                <div className="text-center text-xs text-gray-500">
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link href="/conditions" className="underline hover:text-gray-700 transition">
                    Conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link href="/confidentialite" className="underline hover:text-gray-700 transition">
                    Politique de confidentialité
                  </Link>
                  .
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer simplifié */}
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} CarrièrePlus. Tous droits réservés.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/conditions" className="hover:text-gray-900 transition">
              Conditions d'utilisation
            </Link>
            <Link href="/confidentialite" className="hover:text-gray-900 transition">
              Confidentialité
            </Link>
            <Link href="/aide" className="hover:text-gray-900 transition">
              Aide
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
