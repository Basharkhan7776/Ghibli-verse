"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  placement?: "top" | "bottom" | "left" | "right"
}

export function Popover({ trigger, children, placement = "bottom" }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getPlacementStyles = () => {
    switch (placement) {
      case "top":
        return { bottom: "100%", marginBottom: "8px" }
      case "bottom":
        return { top: "100%", marginTop: "8px" }
      case "left":
        return { right: "100%", marginRight: "8px" }
      case "right":
        return { left: "100%", marginLeft: "8px" }
      default:
        return { top: "100%", marginTop: "8px" }
    }
  }

  const springTransition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 min-w-[200px] bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg p-4"
            style={getPlacementStyles()}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={springTransition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
