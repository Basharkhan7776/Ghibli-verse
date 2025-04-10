import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NFTCard } from "@/components/nft-card"
import { HeroSection } from "@/components/hero-section"
import { WalletMultiButton } from "@/components/wallet-multi-button"

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
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">GhibliNFT</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/create" className="text-sm font-medium transition-colors hover:text-primary">
              Create
            </Link>
            <Link href="/activity" className="text-sm font-medium transition-colors hover:text-primary">
              Activity
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <WalletMultiButton />
          </div>
        </div>
      </header>

      <HeroSection />

      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Artworks</h2>
          <Link href="/explore">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredNfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </section>

      <section className="container py-12 bg-muted/50 rounded-lg my-12">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Create and Sell Your Ghibli-Inspired NFTs</h2>
          <p className="text-muted-foreground mb-8">
            Join our community of artists and collectors passionate about Studio Ghibli art. Mint, buy, sell, and bid on
            unique digital collectibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg">Create NFT</Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground">
                Connect your Solana wallet to get started. We support Phantom, Solflare, and other popular wallets.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create or Collect</h3>
              <p className="text-muted-foreground">
                Upload your Ghibli-inspired artwork to mint as an NFT, or browse the marketplace to collect pieces you
                love.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Buy, Bid & Sell</h3>
              <p className="text-muted-foreground">
                Purchase NFTs directly, place bids in auctions, or list your collection for sale on our marketplace.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GhibliNFT</h3>
              <p className="text-sm text-muted-foreground">
                The premier marketplace for Ghibli-inspired digital collectibles on Solana.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
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
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
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
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
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
            <p className="text-sm text-muted-foreground">© 2025 GhibliNFT. All rights reserved.</p>
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
