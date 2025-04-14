import React from "react"
import { cn } from "@/lib/utils"

interface GhibliCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const GhibliCard = React.forwardRef<HTMLDivElement, GhibliCardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground rounded-lg border border-border p-6 transition-all duration-300",
        "shadow-[0_4px_0_rgba(0,0,0,0.05)] hover:shadow-[0_6px_0_rgba(0,0,0,0.05)] hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
GhibliCard.displayName = "GhibliCard"

export { GhibliCard }
