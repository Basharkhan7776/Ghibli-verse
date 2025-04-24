import { NFTCard } from "@/components/nft-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExplorePage() {
  // Mock NFT data - in a real app, this would come from your API
  const nfts = Array.from({ length: 12 }).map((_, i) => ({
    id: (i + 1).toString(),
    title: [
      "Spirited Forest",
      "Totoro's Garden",
      "Howl's Castle",
      "Kiki's Delivery",
      "Ponyo's Ocean",
      "Mononoke Forest",
      "Laputa Sky",
      "No-Face Portrait",
      "Calcifer Flame",
      "Nausicaä Valley",
      "Cat Returns",
      "Arrietty's World",
    ][i],
    creator: ["GhibliArtist", "StudioFan", "MiyazakiLover", "AnimeMaster", "DigitalCreator", "NFTWizard"][i % 6],
    price: Number.parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    image: `/placeholder.svg?height=400&width=400`,
    bids: Math.floor(Math.random() * 10),
  }))

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Explore NFTs</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Search</h3>
            <Input placeholder="Search NFTs..." />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Status</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="buy-now" className="rounded" />
                <label htmlFor="buy-now">Buy Now</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="on-auction" className="rounded" />
                <label htmlFor="on-auction">On Auction</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="new" className="rounded" />
                <label htmlFor="new">New</label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Price Range</h3>
            <div className="space-y-4">
              <Slider defaultValue={[0, 5]} max={10} step={0.1} />
              <div className="flex items-center justify-between">
                <Input type="number" placeholder="Min" className="w-20" defaultValue={0} />
                <span className="mx-2">to</span>
                <Input type="number" placeholder="Max" className="w-20" defaultValue={5} />
                <Button variant="outline" size="sm" className="ml-2">
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Collections</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="spirited-away" className="rounded" />
                <label htmlFor="spirited-away">Spirited Away</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="totoro" className="rounded" />
                <label htmlFor="totoro">My Neighbor Totoro</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="howls" className="rounded" />
                <label htmlFor="howls">Howl's Moving Castle</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="mononoke" className="rounded" />
                <label htmlFor="mononoke">Princess Mononoke</label>
              </div>
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All NFTs</TabsTrigger>
                <TabsTrigger value="art">Art</TabsTrigger>
                <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
                <TabsTrigger value="photography">Photography</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft, index) => (
              <NFTCard key={nft.id} nft={nft} index={index} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
