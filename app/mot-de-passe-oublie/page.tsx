import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MotDePasseOubliePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header simplifié */}
      <header className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="font-bold text-xl text-blue-600">CarrièrePlus</div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">Mot de passe oublié</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <Card className="max-w-md w-full border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Réinitialiser votre mot de passe</CardTitle>
            <CardDescription className="text-center">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemple@email.com" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Envoyer le lien de réinitialisation
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/connexion" className="text-sm text-blue-600 hover:text-blue-800 transition">
              Retour à la page de connexion
            </Link>
          </CardFooter>
        </Card>
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
