"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Popover } from "@/components/popover"

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
  index: number
}

export function NFTCard({ nft, index }: NFTCardProps) {
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

  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: springTransition }}
      className="ghibli-card p-0 overflow-hidden"
    >
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
          <div className="relative">
            <Popover
              trigger={
                <button className="p-2 rounded-full hover:bg-[var(--muted)]" aria-label="More options">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              }
            >
              <div className="space-y-2">
                <button className="w-full text-left px-2 py-1 hover:bg-[var(--muted)] rounded">Share</button>
                <button className="w-full text-left px-2 py-1 hover:bg-[var(--muted)] rounded">Report</button>
                <button className="w-full text-left px-2 py-1 hover:bg-[var(--muted)] rounded">View Details</button>
              </div>
            </Popover>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0 flex justify-between border-t border-[var(--border)] mt-2">
        <div>
          <p className="text-sm font-medium">{nft.price} SOL</p>
          <p className="text-xs ghibli-subheading">{nft.bids} bids</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            className="p-2 rounded-full hover:bg-[var(--muted)]"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={springTransition}
            onClick={handleLike}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-[var(--destructive)] text-[var(--destructive)]" : ""}`} />
          </motion.button>
          <span className="text-xs">{likeCount}</span>
        </div>
      </div>
    </motion.div>
  )
}
