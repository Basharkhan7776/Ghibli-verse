import Link from "next/link"
import { AnimatedNFTCard } from "@/components/animated-nft-card"
import { AnimatedHero } from "@/components/animated-hero"
import { AnimatedHeader } from "@/components/animated-header"
import { GhibliButton } from "@/components/ui/ghibli-button"
import { GhibliCard } from "@/components/ui/ghibli-card"

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
      <AnimatedHeader />
      <AnimatedHero />

      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight ghibli-heading">Featured Artworks</h2>
          <Link href="/explore">
            <GhibliButton variant="outline">View All</GhibliButton>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredNfts.map((nft, index) => (
            <AnimatedNFTCard key={nft.id} nft={nft} index={index} />
          ))}
        </div>
      </section>

      <section className="container py-12 my-12">
        <GhibliCard className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-4 ghibli-heading">
            Create and Sell Your Ghibli-Inspired NFTs
          </h2>
          <p className="ghibli-subheading mb-8">
            Join our community of artists and collectors passionate about Studio Ghibli art. Mint, buy, sell, and bid on
            unique digital collectibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <GhibliButton size="lg">Create NFT</GhibliButton>
            </Link>
            <Link href="/explore">
              <GhibliButton size="lg" variant="outline">
                Explore Collection
              </GhibliButton>
            </Link>
          </div>
        </GhibliCard>
      </section>

      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8 ghibli-heading">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GhibliCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2 ghibli-heading">Connect Wallet</h3>
            <p className="ghibli-subheading">
              Connect your Solana wallet to get started. We support Phantom, Solflare, and other popular wallets.
            </p>
          </GhibliCard>
          <GhibliCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2 ghibli-heading">Create or Collect</h3>
            <p className="ghibli-subheading">
              Upload your Ghibli-inspired artwork to mint as an NFT, or browse the marketplace to collect pieces you
              love.
            </p>
          </GhibliCard>
          <GhibliCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2 ghibli-heading">Buy, Bid & Sell</h3>
            <p className="ghibli-subheading">
              Purchase NFTs directly, place bids in auctions, or list your collection for sale on our marketplace.
            </p>
          </GhibliCard>
        </div>
      </section>

      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">GhibliNFT</h3>
              <p className="text-sm ghibli-subheading">
                The premier marketplace for Ghibli-inspired digital collectibles on Solana.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">Marketplace</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/explore" className="text-muted-foreground hover:text-foreground">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="text-muted-foreground hover:text-foreground">
                    Create
                  </Link>
                </li>
                <li>
                  <Link href="/activity" className="text-muted-foreground hover:text-foreground">
                    Activity
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 ghibli-heading">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/discord" className="text-muted-foreground hover:text-foreground">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="/twitter" className="text-muted-foreground hover:text-foreground">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/instagram" className="text-muted-foreground hover:text-foreground">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm ghibli-subheading">© 2025 GhibliNFT. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
