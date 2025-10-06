# Dockerfile cho Backend (Node.js + Express)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Keep tsx for seed script, remove other devDependencies
RUN npm install tsx --save
RUN npm prune --production

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "dist/server.js"]
