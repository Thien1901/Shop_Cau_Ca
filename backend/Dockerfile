# Dockerfile cho Backend (Node.js + Express)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm install -D typescript && npm run build

# Remove dev dependencies
RUN npm prune --production

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "dist/server.js"]
