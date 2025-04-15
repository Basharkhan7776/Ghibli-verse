"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { WalletMultiButton } from "@/components/wallet-multi-button"
import { Popover } from "@/components/popover"

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Explore", href: "/explore" },
    { name: "Create", href: "/create" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={springTransition}
          className="flex items-center space-x-2"
        >
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              className="text-xl font-bold ghibli-heading"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
            >
              Ghibli Verse
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav className="hidden md:flex gap-6" initial="hidden" animate="show">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                  pathname === item.href ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="ghibli-button p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={springTransition}
          className="hidden md:flex items-center gap-4"
        >
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-4">
              <Popover
                trigger={
                  <button className="ghibli-button ghibli-button-outline flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                }
              >
                <div className="space-y-2 w-48">
                  <div className="border-b border-[var(--border)] pb-2 mb-2">
                    <p className="font-medium">{session.user?.name || "User"}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{session.user?.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-[var(--muted)] rounded w-full">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 p-2 hover:bg-[var(--muted)] rounded w-full">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    className="flex items-center gap-2 p-2 hover:bg-[var(--muted)] rounded w-full text-[var(--destructive)]"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </Popover>
              <WalletMultiButton />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <button className="ghibli-button">Sign In</button>
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
          transition={springTransition}
          className="md:hidden border-t border-[var(--border)]"
        >
          <div className="container mx-auto py-4 space-y-4 px-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                    pathname === item.href ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
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
                    <button className="ghibli-button ghibli-button-outline w-full text-left">Profile</button>
                  </Link>
                  <button className="ghibli-button w-full text-left" onClick={() => signOut()}>
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="ghibli-button w-full text-left">Sign In</button>
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
