"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Heart, Share2, Flag, Clock, Eye, Tag, History } from "lucide-react"

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [bidAmount, setBidAmount] = useState("")

  // Mock NFT data - in a real app, this would come from your API
  const nft = {
    id: params.id,
    title: "Spirit Away Forest",
    description:
      "A magical forest scene inspired by the enchanting worlds of Studio Ghibli. This digital artwork captures the essence of wonder and mystery found in Miyazaki's films.",
    creator: "GhibliArtist",
    owner: "CollectorX",
    price: 2.5,
    highestBid: 2.7,
    image: "/placeholder.svg?height=600&width=600",
    likes: 47,
    views: 328,
    createdAt: "2025-03-15T14:30:00Z",
    collection: "Spirited Away",
    attributes: [
      { trait: "Style", value: "Digital Painting" },
      { trait: "Colors", value: "Forest Green" },
      { trait: "Mood", value: "Mystical" },
      { trait: "Inspiration", value: "Spirited Away" },
    ],
    history: [
      { event: "Minted", from: "GhibliArtist", to: "GhibliArtist", price: 1.0, date: "2025-03-15T14:30:00Z" },
      { event: "Listed", from: "GhibliArtist", to: null, price: 2.0, date: "2025-03-16T10:15:00Z" },
      { event: "Sale", from: "GhibliArtist", to: "CollectorX", price: 2.0, date: "2025-03-18T09:45:00Z" },
      { event: "Listed", from: "CollectorX", to: null, price: 2.5, date: "2025-04-01T16:20:00Z" },
    ],
    bids: [
      { bidder: "NFTWhale", amount: 2.7, date: "2025-04-05T11:30:00Z" },
      { bidder: "ArtCollector", amount: 2.6, date: "2025-04-04T14:15:00Z" },
      { bidder: "GhibliFan", amount: 2.5, date: "2025-04-03T09:45:00Z" },
    ],
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the bid to the blockchain
    alert(`Bid placed for ${bidAmount} SOL!`)
  }

  const handleBuy = () => {
    // In a real app, this would initiate the purchase transaction
    alert(`Purchase initiated for ${nft.price} SOL!`)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <main className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* NFT Image */}
        <div>
          <div className="rounded-lg overflow-hidden border bg-background">
            <div className="relative aspect-square">
              <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-cover" />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" onClick={handleLike}>
                <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                {liked ? nft.likes + 1 : nft.likes}
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                {nft.views}
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* NFT Details */}
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Link href={`/collection/${nft.collection}`} className="text-sm text-muted-foreground hover:text-primary">
                Collection: {nft.collection}
              </Link>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {formatDate(nft.createdAt)}
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">{nft.title}</h1>

            <div className="flex items-center mb-6">
              <p className="text-sm">
                Created by{" "}
                <Link href={`/profile/${nft.creator}`} className="font-medium hover:text-primary">
                  {nft.creator}
                </Link>
              </p>
              <span className="mx-2">•</span>
              <p className="text-sm">
                Owned by{" "}
                <Link href={`/profile/${nft.owner}`} className="font-medium hover:text-primary">
                  {nft.owner}
                </Link>
              </p>
            </div>

            <p className="text-muted-foreground mb-6">{nft.description}</p>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold">{nft.price} SOL</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Highest Bid</p>
                    <p className="text-xl font-semibold">{nft.highestBid} SOL</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={handleBuy} size="lg" className="w-full">
                    Buy Now
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Make Offer
                  </Button>
                </div>

                <div className="mt-4">
                  <form onSubmit={handleBid} className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter bid amount (SOL)"
                      step="0.01"
                      min={nft.highestBid + 0.01}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                    />
                    <Button type="submit">Place Bid</Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">
                  Details
                </TabsTrigger>
                <TabsTrigger value="bids" className="flex-1">
                  Bids
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1">
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {nft.attributes.map((attr, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{attr.trait}</p>
                      <p className="font-medium">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bids" className="pt-4">
                <div className="space-y-4">
                  {nft.bids.map((bid, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Tag className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{bid.bidder}</p>
                          <p className="text-xs text-muted-foreground">{new Date(bid.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="font-semibold">{bid.amount} SOL</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="pt-4">
                <div className="space-y-4">
                  {nft.history.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <History className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{item.event}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.from} {item.to ? `→ ${item.to}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price} SOL</p>
                        <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
