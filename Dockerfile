FROM node:16.13.0 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16.13.0
WORKDIR /usr/src/app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "strat:prod"]
