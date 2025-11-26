# Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# use npm ci for reproducible installs if package-lock.json exists
RUN if [ -f package-lock.json ]; then npm ci --production=false; else npm install; fi

# Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Run the application
FROM node:20-alpine AS runner
WORKDIR /app
# Only copy the runtime files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
