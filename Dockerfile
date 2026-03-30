# Etapa 1: Dependências
FROM node:22.12-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY kanban-project/package.json kanban-project/package-lock.json* ./
RUN npm ci

# Etapa 2: Build do projeto Next.js
FROM node:22.12-alpine AS builder
WORKDIR /app
# We need to copy everything to the build directory. We'll copy all root contents to /app.
COPY . .
WORKDIR /app/kanban-project
# Copy the node_modules installed previously
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Etapa 3: Serve standalone Next.js no Coolify
FROM node:22.12-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

COPY --from=builder /app/kanban-project/public ./public
# Copia e roda via feature Standalone do Next
COPY --from=builder /app/kanban-project/.next/standalone ./
COPY --from=builder /app/kanban-project/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
