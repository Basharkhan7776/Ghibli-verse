"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GhibliButton } from "@/components/ui/ghibli-button"

export function AnimatedHero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50"></div>
      <div className="container relative py-24 md:py-32 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 ghibli-heading"
        >
          Discover Magical Ghibli-Inspired NFTs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl ghibli-subheading max-w-3xl mb-10"
        >
          Explore, collect, and trade unique digital art inspired by the enchanting worlds of Studio Ghibli on the
          Solana blockchain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/explore">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GhibliButton size="lg" className="px-8">
                Explore Collection
              </GhibliButton>
            </motion.div>
          </Link>
          <Link href="/create">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GhibliButton size="lg" variant="outline" className="px-8">
                Create NFT
              </GhibliButton>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
