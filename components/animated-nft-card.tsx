"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { GhibliCard } from "@/components/ui/ghibli-card"
import { GhibliButton } from "@/components/ui/ghibli-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NFT {
  id: string
  title: string
  creator: string
  price: number
  image: string
  bids: number
}

interface AnimatedNFTCardProps {
  nft: NFT
  index: number
}

export function AnimatedNFTCard({ nft, index }: AnimatedNFTCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <GhibliCard className="overflow-hidden p-0">
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
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Link href={`/nft/${nft.id}`} className="font-medium hover:underline ghibli-heading">
                {nft.title}
              </Link>
              <p className="text-sm ghibli-subheading">by {nft.creator}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GhibliButton variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </GhibliButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="p-4 pt-0 flex justify-between border-t mt-2">
          <div>
            <p className="text-sm font-medium">{nft.price} SOL</p>
            <p className="text-xs ghibli-subheading">{nft.bids} bids</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <GhibliButton variant="ghost" size="icon" className="h-8 w-8" onClick={handleLike}>
                <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                <span className="sr-only">Like</span>
              </GhibliButton>
            </motion.div>
            <span className="text-xs">{likeCount}</span>
          </div>
        </div>
      </GhibliCard>
    </motion.div>
  )
}
