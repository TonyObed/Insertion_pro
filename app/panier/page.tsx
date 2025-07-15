"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, ChevronLeft, Plus, Minus, ArrowRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, itemCount } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier.",
    })
  }

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Code promo vide",
        description: "Veuillez entrer un code promo valide.",
        variant: "destructive",
      })
      return
    }

    setIsApplyingCoupon(true)

    // Simuler une vérification de code promo
    setTimeout(() => {
      setIsApplyingCoupon(false)
      toast({
        title: "Code promo invalide",
        description: "Le code promo saisi n'est pas valide ou a expiré.",
        variant: "destructive",
      })
    }, 1500)
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide. Ajoutez des produits avant de passer commande.",
        variant: "destructive",
      })
      return
    }

    router.push("/commande")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/boutique">
                <ChevronLeft className="h-4 w-4" />
                Continuer mes achats
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Panier */}
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Mon panier ({itemCount} {itemCount > 1 ? "articles" : "article"})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Votre panier est vide</h3>
                      <p className="text-gray-500 mb-4">Découvrez nos produits et ajoutez-les à votre panier.</p>
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/boutique">Parcourir la boutique</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
                          <div className="sm:w-1/4">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              width={200}
                              height={200}
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                          <div className="sm:w-3/4 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="font-medium">{item.title}</h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-500 hover:text-red-600"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">
                                {item.type === "ebook"
                                  ? "Ebook"
                                  : item.type === "template"
                                    ? "Template"
                                    : item.type === "video"
                                      ? "Vidéo"
                                      : "Outil"}
                                {item.author && ` • ${item.author}`}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                  disabled={(item.quantity || 1) <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center">{item.quantity || 1}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{(item.price * (item.quantity || 1)).toFixed(2)} €</p>
                                {item.originalPrice && (
                                  <p className="text-sm text-gray-500 line-through">
                                    {(item.originalPrice * (item.quantity || 1)).toFixed(2)} €
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Résumé */}
            <div className="w-full md:w-1/3">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>TVA (20%)</span>
                    <span>{(totalPrice * 0.2).toFixed(2)} €</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Code promo"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleApplyCoupon} disabled={isApplyingCoupon}>
                        {isApplyingCoupon ? "..." : "Appliquer"}
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{(totalPrice * 1.2).toFixed(2)} €</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                  >
                    Passer commande
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
