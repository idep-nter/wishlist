FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV HOST 0.0.0.0

EXPOSE 8080