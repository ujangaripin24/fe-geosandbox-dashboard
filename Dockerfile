# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.16.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base as build
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base as final
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 5173

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
