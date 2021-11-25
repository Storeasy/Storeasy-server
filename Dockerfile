FROM node:16.13.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN  npm install

COPY . .

# FROM node:16.13.0-alpine
# WORKDIR /app
# COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
