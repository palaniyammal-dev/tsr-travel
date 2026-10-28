# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies (ignoring scripts/engines to be safe in container environment)
RUN npm ci

# Copy project files
COPY . .

# Set env to production
ENV NODE_ENV=production

# Build the Next.js application
RUN npm run build

# Stage 2: Run the built application
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy output files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/app/globals.css ./src/app/globals.css

# Expose port
EXPOSE 3000

# Start Next.js server
CMD ["npm", "run", "start"]
