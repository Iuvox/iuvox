FROM node:20-bookworm-slim as builder

WORKDIR /build

COPY ./ ./

RUN npm ci && \
    npm run build

FROM node:20-bookworm-slim as target

WORKDIR /app

COPY --from=builder /build/dist /app/dist

COPY ./package* /app/

COPY ./server/* /app/server/

EXPOSE 5173

RUN npm ci --omit=dev

CMD [ "node", "server" ]