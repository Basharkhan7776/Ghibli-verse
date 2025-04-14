"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet } from "lucide-react"

export function WalletMultiButton() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // In a real app, this would connect to the Solana wallet adapter
  const connectWallet = () => {
    // Simulate wallet connection
    setWalletAddress("8xH5...7Gh9")
    setConnected(true)
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setConnected(false)
  }

  if (connected) {
    return (
      <Button variant="outline" onClick={disconnectWallet}>
        <Wallet className="mr-2 h-4 w-4" />
        {walletAddress}
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Connect your Solana wallet to start using GhibliNFT.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={connectWallet} className="w-full">
            Phantom
          </Button>
          <Button onClick={connectWallet} className="w-full">
            Solflare
          </Button>
          <Button onClick={connectWallet} className="w-full">
            Backpack
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
