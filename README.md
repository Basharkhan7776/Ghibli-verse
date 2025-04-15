# Ghibli Verse - NFT Marketplace

Ghibli Verse is a unique NFT marketplace for Ghibli-inspired digital art on the Solana blockchain. The platform allows users to create, buy, sell, and trade NFTs with a beautiful Ghibli-inspired UI.

## Features

- Create and mint Ghibli-inspired NFTs
- Browse and purchase NFTs from other creators
- Bid on auctions
- Connect with Solana wallet
- User authentication
- Dark/light mode
- Responsive design
- MongoDB integration for data storage
- Cloudinary for image storage
- Groq AI for Ghibli art validation
- Base.org integration

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

\`\`\`
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ghibli-verse

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Groq AI API Key
GROQ_API_KEY=your_groq_api_key

# Base.org API Key
BASE_API_KEY=your_base_api_key

# Solana RPC URL
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# NextAuth Secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
\`\`\`

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the required environment variables
4. Run the development server with `npm run dev`

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB
- Cloudinary
- Groq AI
- Solana Web3.js
- NextAuth.js

## License

[MIT](https://choosealicense.com/licenses/mit/)
