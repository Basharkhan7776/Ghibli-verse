"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface SquaresBackgroundProps {
  className?: string
  squareSize?: number
  squareColor?: string
  density?: number
}

export function SquaresBackground({
  className = "",
  squareSize = 20,
  squareColor = "var(--primary)",
  density = 20,
}: SquaresBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [squares, setSquares] = useState<Array<{ x: number; y: number; delay: number; size: number }>>([])

  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()
    const newSquares = []

    for (let i = 0; i < density; i++) {
      newSquares.push({
        x: Math.random() * width,
        y: Math.random() * height,
        delay: Math.random() * 5,
        size: squareSize * (0.5 + Math.random() * 0.5),
      })
    }

    setSquares(newSquares)
  }, [density, squareSize])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {squares.map((square, index) => (
        <motion.div
          key={index}
          className="absolute rounded-md opacity-20"
          style={{
            backgroundColor: squareColor,
            width: square.size,
            height: square.size,
            left: square.x,
            top: square.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.2, 0],
            scale: [0, 1, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 10,
            delay: square.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
