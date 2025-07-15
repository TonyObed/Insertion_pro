import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à booster votre carrière ?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-blue-100 hover:text-white transition-colors duration-300">
          Rejoignez notre communauté et accédez à des formations de qualité pour développer vos compétences
          professionnelles et transformer votre parcours professionnel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/inscription">S'inscrire gratuitement</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-blue-700 hover:border-transparent"
            asChild
          >
            <Link href="/formations">Découvrir nos formations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
