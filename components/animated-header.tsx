"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletMultiButton } from "@/components/wallet-multi-button"
import { useSession, signOut } from "next-auth/react"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { GhibliButton } from "@/components/ui/ghibli-button"

export function AnimatedHeader() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Explore", href: "/explore" },
    { name: "Create", href: "/create" },
    { name: "Activity", href: "/activity" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              className="text-xl font-bold ghibli-heading"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GhibliNFT
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav className="hidden md:flex gap-6" variants={container} initial="hidden" animate="show">
          {navItems.map((item) => (
            <motion.div key={item.name} variants={item}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <GhibliButton variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </GhibliButton>
        </div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <GhibliButton variant="ghost" size="sm">
                  Profile
                </GhibliButton>
              </Link>
              <GhibliButton variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </GhibliButton>
              <WalletMultiButton />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <GhibliButton variant="ghost" size="sm">
                  Sign In
                </GhibliButton>
              </Link>
              <WalletMultiButton />
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2">
              <ThemeToggle />
              {session ? (
                <>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <GhibliButton variant="ghost" className="w-full justify-start">
                      Profile
                    </GhibliButton>
                  </Link>
                  <GhibliButton variant="outline" className="w-full justify-start" onClick={() => signOut()}>
                    Sign Out
                  </GhibliButton>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <GhibliButton variant="ghost" className="w-full justify-start">
                    Sign In
                  </GhibliButton>
                </Link>
              )}
              <WalletMultiButton />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
