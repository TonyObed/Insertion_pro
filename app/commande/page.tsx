"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, CreditCard, Landmark, CheckCircle2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardCvc: string
  paymentMethod: "card" | "bank" | "paypal"
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<"information" | "payment" | "confirmation">("information")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    paymentMethod: "card",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: "card" | "bank" | "paypal") => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation simple
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    setCurrentStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation simple pour carte bancaire
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvc) {
        toast({
          title: "Informations de paiement incomplètes",
          description: "Veuillez remplir tous les champs de paiement.",
          variant: "destructive",
        })
        return
      }
    }

    setIsSubmitting(true)

    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentStep("confirmation")
      clearCart()
      window.scrollTo(0, 0)
    }, 2000)
  }

  if (items.length === 0 && currentStep !== "confirmation") {
    router.push("/panier")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {currentStep !== "confirmation" && (
            <div className="mb-6">
              <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/panier">
                  <ChevronLeft className="h-4 w-4" />
                  Retour au panier
                </Link>
              </Button>
            </div>
          )}

          {currentStep === "information" && (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de livraison</CardTitle>
                    <CardDescription>Veuillez remplir vos informations de contact et de livraison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleInformationSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            Prénom <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Nom <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Adresse <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            Ville <span className="text-red-500">*</span>
                          </Label>
                          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">
                            Code postal <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">
                            Pays <span className="text-red-500">*</span>
                          </Label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 p-2"
                            required
                          >
                            <option value="France">France</option>
                            <option value="Belgique">Belgique</option>
                            <option value="Suisse">Suisse</option>
                            <option value="Canada">Canada</option>
                            <option value="Luxembourg">Luxembourg</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          Continuer vers le paiement
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full lg:w-1/3">
                <OrderSummary items={items} totalPrice={totalPrice} />
              </div>
            </div>
          )}

          {currentStep === "payment" && (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Paiement</CardTitle>
                    <CardDescription>Choisissez votre méthode de paiement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleRadioChange(value as "card" | "bank" | "paypal")}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                            Carte bancaire
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                            <Landmark className="h-5 w-5 text-blue-600" />
                            Virement bancaire
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                            <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42c-.022-.124-.043-.248-.066-.37-.764-3.933-3.504-4.007-6.44-4.007h-4.717a.563.563 0 0 0-.556.49L7.8 13.281a.56.56 0 0 0 .555.638h2.128c3.3 0 5.706-1.197 6.413-4.902.673-3.526-.265-4.189-.674-4.1z" />
                            </svg>
                            PayPal
                          </Label>
                        </div>
                      </RadioGroup>

                      {formData.paymentMethod === "card" && (
                        <div className="space-y-4 mt-6 p-4 border rounded-md">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">
                              Numéro de carte <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">
                              Nom sur la carte <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Doe"
                              value={formData.cardName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">
                                Date d'expiration <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="cardExpiry"
                                name="cardExpiry"
                                placeholder="MM/AA"
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvc">
                                CVC <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="cardCvc"
                                name="cardCvc"
                                placeholder="123"
                                value={formData.cardCvc}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.paymentMethod === "bank" && (
                        <div className="p-4 border rounded-md bg-gray-50">
                          <p className="text-sm text-gray-600">
                            Veuillez effectuer un virement bancaire avec les informations suivantes:
                          </p>
                          <div className="mt-4 space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Bénéficiaire:</span> CarrièrePlus SAS
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">IBAN:</span> FR76 1234 5678 9012 3456 7890 123
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">BIC:</span> ABCDEFGHIJK
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Référence:</span> CMD-{Date.now().toString().slice(-8)}
                            </p>
                          </div>
                          <p className="mt-4 text-sm text-gray-600">
                            Votre commande sera traitée dès réception du paiement.
                          </p>
                        </div>
                      )}

                      {formData.paymentMethod === "paypal" && (
                        <div className="p-4 border rounded-md bg-gray-50">
                          <p className="text-sm text-gray-600">
                            Vous serez redirigé vers PayPal pour finaliser votre paiement après avoir cliqué sur
                            "Payer".
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep("information")}>
                          Retour
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                          {isSubmitting ? "Traitement en cours..." : "Payer"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full lg:w-1/3">
                <OrderSummary items={items} totalPrice={totalPrice} />
              </div>
            </div>
          )}

          {currentStep === "confirmation" && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Merci pour votre commande !</h2>
                    <p className="text-gray-600 mb-6">
                      Votre commande a été confirmée et sera traitée dans les plus brefs délais.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <p className="text-sm text-gray-600 mb-2">
                        Un email de confirmation a été envoyé à <span className="font-medium">{formData.email}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Numéro de commande: <span className="font-medium">CMD-{Date.now().toString().slice(-8)}</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Détails de la commande</h3>
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b">
                          <div className="flex justify-between">
                            <span className="font-medium">Produit</span>
                            <span className="font-medium">Total</span>
                          </div>
                        </div>
                        <div className="p-4 space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <span>
                                {item.title} <span className="text-gray-500">× {item.quantity || 1}</span>
                              </span>
                              <span>{(item.price * (item.quantity || 1)).toFixed(2)} €</span>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between">
                            <span>Sous-total</span>
                            <span>{totalPrice.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>TVA (20%)</span>
                            <span>{(totalPrice * 0.2).toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>{(totalPrice * 1.2).toFixed(2)} €</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-8 gap-4">
                      <Button variant="outline" asChild>
                        <Link href="/profil">Mon compte</Link>
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/boutique">Continuer mes achats</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

function OrderSummary({ items, totalPrice }: { items: any[]; totalPrice: number }) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Résumé de la commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                <p className="text-xs text-gray-500">Quantité: {item.quantity || 1}</p>
                <p className="text-sm font-medium">{(item.price * (item.quantity || 1)).toFixed(2)} €</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>TVA (20%)</span>
            <span>{(totalPrice * 0.2).toFixed(2)} €</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span>{(totalPrice * 1.2).toFixed(2)} €</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
