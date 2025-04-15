"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SquaresBackground } from "@/components/squares-background"
import { GlowButton } from "@/components/glow-button"
import { FloatingCard } from "@/components/floating-card"
import { useState } from "react"

export function Hero() {
  const [hovered, setHovered] = useState(false)

  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SquaresBackground squareColor="var(--primary)" density={30} />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 opacity-70" />

      <div className="container mx-auto relative py-24 md:py-32 flex flex-col items-center text-center px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 ghibli-heading"
        >
          Discover Magical Ghibli-Inspired NFTs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="text-xl ghibli-subheading max-w-3xl mb-10"
        >
          Explore, collect, and trade unique digital art inspired by the enchanting worlds of Studio Ghibli on the
          Solana blockchain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/explore">
            <GlowButton variant="primary">Explore Collection</GlowButton>
          </Link>
          <Link href="/create">
            <GlowButton variant="outline">Create NFT</GlowButton>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <FloatingCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
              <span className="text-xl font-bold text-[var(--primary)]">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2 ghibli-heading">Connect Wallet</h3>
            <p className="ghibli-subheading">
              Connect your Solana wallet to get started. We support Phantom, Solflare, and other popular wallets.
            </p>
          </FloatingCard>

          <FloatingCard className="md:mt-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
              <span className="text-xl font-bold text-[var(--primary)]">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2 ghibli-heading">Create or Collect</h3>
            <p className="ghibli-subheading">
              Upload your Ghibli-inspired artwork to mint as an NFT, or browse the marketplace to collect pieces you
              love.
            </p>
          </FloatingCard>

          <FloatingCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
              <span className="text-xl font-bold text-[var(--primary)]">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2 ghibli-heading">Buy, Bid & Sell</h3>
            <p className="ghibli-subheading">
              Purchase NFTs directly, place bids in auctions, or list your collection for sale on our marketplace.
            </p>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}
