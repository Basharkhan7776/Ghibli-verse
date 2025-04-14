import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10" />
      <div className="container relative py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Discover Magical Ghibli-Inspired NFTs</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-10">
          Explore, collect, and trade unique digital art inspired by the enchanting worlds of Studio Ghibli on the
          Solana blockchain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/explore">
            <Button size="lg" className="px-8">
              Explore Collection
            </Button>
          </Link>
          <Link href="/create">
            <Button size="lg" variant="outline" className="px-8">
              Create NFT
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
