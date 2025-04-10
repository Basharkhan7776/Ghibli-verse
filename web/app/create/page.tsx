"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, ImageIcon } from "lucide-react"

export default function CreateNFTPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        setPreviewUrl(URL.createObjectURL(file))
        setIsUploading(false)
      }, 1500)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would mint the NFT on Solana
    alert("NFT creation initiated! In a real app, this would mint your NFT on Solana.")
  }

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Create New NFT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="mb-2 text-sm font-medium">Drag and drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mb-4">PNG, JPG, GIF, SVG, MP4, WEBM. Max 100MB.</p>
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file")?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Select File"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Item name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide a detailed description of your item" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collection">Collection</Label>
              <Select>
                <SelectTrigger id="collection">
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spirited-away">Spirited Away</SelectItem>
                  <SelectItem value="totoro">My Neighbor Totoro</SelectItem>
                  <SelectItem value="howls">Howl's Moving Castle</SelectItem>
                  <SelectItem value="mononoke">Princess Mononoke</SelectItem>
                  <SelectItem value="new">Create new collection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price (SOL)</Label>
                <Input id="price" type="number" step="0.01" min="0" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="royalty">Royalties (%)</Label>
                <Input id="royalty" type="number" step="0.5" min="0" max="15" placeholder="10" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="auction" />
              <Label htmlFor="auction">List as auction</Label>
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto">
              Create NFT
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <Card>
            <CardContent className="pt-6">
              {previewUrl ? (
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="NFT Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <div className="mt-4">
                <p className="font-medium">Item Name</p>
                <p className="text-sm text-muted-foreground">Your username</p>
                <div className="mt-2 flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-xs text-muted-foreground">0.00 SOL</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
