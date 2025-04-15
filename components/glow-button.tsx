"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline"
}

export function GlowButton({ children, onClick, className = "", variant = "primary" }: GlowButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[var(--primary)] text-[var(--primary-foreground)]"
      case "secondary":
        return "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
      case "outline":
        return "bg-transparent border-2 border-[var(--primary)] text-[var(--primary)]"
      default:
        return "bg-[var(--primary)] text-[var(--primary-foreground)]"
    }
  }

  const springTransition = {
    type: "spring",
    stiffness: 500,
    damping: 25,
  }

  return (
    <motion.button
      className={`relative px-6 py-3 rounded-lg font-medium ${getVariantClasses()} ${className}`}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        transition: springTransition,
      }}
      whileTap={{
        scale: 0.95,
        transition: springTransition,
      }}
    >
      <motion.span
        className="absolute inset-0 rounded-lg bg-[var(--primary)]/20"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          boxShadow: "0 0 20px 5px var(--primary)",
        }}
        transition={springTransition}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
