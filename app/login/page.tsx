"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/app/actions/auth-actions"
import { Header } from "@/components/header"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("login")
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
      <Header />
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="ghibli-card border-2 border-[var(--border)]">
            <div className="space-y-1 mb-6">
              <h1 className="text-2xl font-bold text-center ghibli-heading">Welcome to Ghibli Verse</h1>
              <p className="text-center ghibli-subheading">Sign in to your account or create a new one</p>
            </div>

            <div className="flex border-b border-[var(--border)] mb-6">
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === "login"
                    ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                    : "text-[var(--muted-foreground)]"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === "register"
                    ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                    : "text-[var(--muted-foreground)]"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </div>

            {activeTab === "login" ? (
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="ghibli-label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="ghibli-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="ghibli-label">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-sm text-[var(--primary)] hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="ghibli-input"
                    />
                  </div>
                  {error && <div className="text-sm text-[var(--destructive)]">{error}</div>}
                </div>
                <div className="mt-6">
                  <button type="submit" className="ghibli-button w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="ghibli-label">
                      Username
                    </label>
                    <input id="username" name="username" placeholder="ghibli_fan" required className="ghibli-input" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="reg-email" className="ghibli-label">
                      Email
                    </label>
                    <input
                      id="reg-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="ghibli-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="reg-password" className="ghibli-label">
                      Password
                    </label>
                    <input
                      id="reg-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="ghibli-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="walletAddress" className="ghibli-label">
                      Wallet Address (Optional)
                    </label>
                    <input
                      id="walletAddress"
                      name="walletAddress"
                      placeholder="Your Solana wallet address"
                      className="ghibli-input"
                    />
                  </div>
                  {error && <div className="text-sm text-[var(--destructive)]">{error}</div>}
                  {success && <div className="text-sm text-green-600">{success}</div>}
                </div>
                <div className="mt-6">
                  <button type="submit" className="ghibli-button w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
