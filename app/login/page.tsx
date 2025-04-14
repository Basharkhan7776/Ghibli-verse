"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { registerUser } from "@/app/actions/auth-actions"
import { AnimatedHeader } from "@/components/animated-header"
import { GhibliButton } from "@/components/ui/ghibli-button"
import { GhibliCard } from "@/components/ui/ghibli-card"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      setError("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData(e.currentTarget)

    try {
      const result = await registerUser(formData)

      if (result.success) {
        setSuccess(result.message)
        // Reset form
        e.currentTarget.reset()
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatedHeader />
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <GhibliCard className="border-2">
            <div className="space-y-1 mb-6">
              <h1 className="text-2xl font-bold text-center ghibli-heading">Welcome to GhibliNFT</h1>
              <p className="text-center ghibli-subheading">Sign in to your account or create a new one</p>
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        className="input-ghibli"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="input-ghibli"
                      />
                    </div>
                    {error && <div className="text-sm text-destructive">{error}</div>}
                  </div>
                  <div className="mt-6">
                    <GhibliButton type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </GhibliButton>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" placeholder="ghibli_fan" required className="input-ghibli" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        className="input-ghibli"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="input-ghibli"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">Wallet Address (Optional)</Label>
                      <Input
                        id="walletAddress"
                        name="walletAddress"
                        placeholder="Your Solana wallet address"
                        className="input-ghibli"
                      />
                    </div>
                    {error && <div className="text-sm text-destructive">{error}</div>}
                    {success && <div className="text-sm text-green-600">{success}</div>}
                  </div>
                  <div className="mt-6">
                    <GhibliButton type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </GhibliButton>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </GhibliCard>
        </motion.div>
      </div>
    </>
  )
}
