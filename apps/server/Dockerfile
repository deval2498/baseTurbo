FROM node:18-alpine AS base
FROM base AS builder

RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

RUN yarn global add turbo@^2

COPY . .

RUN turbo prune server --docker

FROM base AS installer

RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=builder /app/out/json/ .

RUN yarn install

COPY --from=builder /app/out/full/ .

RUN yarn turbo build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 expressjs

RUN adduser --system --uid 1001 expressjs

USER expressjs

COPY --from=installer /app .

CMD ["node", "apps/server/dist/index.js"]

