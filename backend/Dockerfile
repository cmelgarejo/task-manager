FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build || echo "No build script"

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"]
