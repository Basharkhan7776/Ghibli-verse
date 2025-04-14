"use server"

import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import { hash } from "bcryptjs"

export async function registerUser(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string
    const walletAddress = (formData.get("walletAddress") as string) || ""

    if (!email || !password || !username) {
      return { success: false, message: "Missing required fields" }
    }

    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      return {
        success: false,
        message: existingUser.email === email ? "Email already in use" : "Username already taken",
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      walletAddress,
      displayName: username,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return {
      success: true,
      message: "Registration successful! You can now log in.",
      userId: user._id.toString(),
    }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, message: "Failed to register user" }
  }
}
