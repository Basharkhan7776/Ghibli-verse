"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NFT {
  id: string
  title: string
  creator: string
  price: number
  image: string
  bids: number
}

interface NFTCardProps {
  nft: NFT
}

export function NFTCard({ nft }: NFTCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20))

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/nft/${nft.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={nft.image || "/placeholder.svg"}
            alt={nft.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/nft/${nft.id}`} className="font-medium hover:underline">
              {nft.title}
            </Link>
            <p className="text-sm text-muted-foreground">by {nft.creator}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div>
          <p className="text-sm font-medium">{nft.price} SOL</p>
          <p className="text-xs text-muted-foreground">{nft.bids} bids</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLike}>
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">Like</span>
          </Button>
          <span className="text-xs">{likeCount}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
