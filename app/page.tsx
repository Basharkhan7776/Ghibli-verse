import Link from "next/link"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { NFTCard } from "@/components/nft-card"
import { GlowButton } from "@/components/glow-button"
import { FloatingCard } from "@/components/floating-card"

export default function Home() {
  // Featured NFTs - in a real app, these would come from your API
  const featuredNfts = [
    {
      id: "1",
      title: "Spirit Away Forest",
      creator: "GhibliArtist",
      price: 2.5,
      image: "/placeholder.svg?height=400&width=400",
      bids: 5,
    },
    {
      id: "2",
      title: "Totoro's Garden",
      creator: "StudioFan",
      price: 1.8,
      image: "/placeholder.svg?height=400&width=400",
      bids: 3,
    },
    {
      id: "3",
      title: "Howl's Castle",
      creator: "MiyazakiLover",
      price: 3.2,
      image: "/placeholder.svg?height=400&width=400",
      bids: 7,
    },
    {
      id: "4",
      title: "Kiki's Delivery",
      creator: "AnimeMaster",
      price: 1.5,
      image: "/placeholder.svg?height=400&width=400",
      bids: 2,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />

      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight ghibli-heading">Featured Artworks</h2>
          <Link href="/explore">
            <GlowButton variant="outline">View All</GlowButton>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredNfts.map((nft, index) => (
            <NFTCard key={nft.id} nft={nft} index={index} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12 my-12 px-4">
        <FloatingCard className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4 ghibli-heading">
            Create and Sell Your Ghibli-Inspired NFTs
          </h2>
          <p className="ghibli-subheading mb-8">
            Join our community of artists and collectors passionate about Studio Ghibli art. Mint, buy, sell, and bid on
            unique digital collectibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <GlowButton>Create NFT</GlowButton>
            </Link>
            <Link href="/explore">
              <GlowButton variant="outline">Explore Collection</GlowButton>
            </Link>
          </div>
        </FloatingCard>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">Ghibli Verse</h3>
              <p className="text-sm ghibli-subheading">
                The premier marketplace for Ghibli-inspired digital collectibles on Solana.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">Marketplace</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/explore" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    Create
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/discord" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="/twitter" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/instagram" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm ghibli-subheading">© 2025 Ghibli Verse. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
