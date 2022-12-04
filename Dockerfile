FROM  node:16.17-alpine

WORKDIR /app

COPY  package*.json ./

RUN nom instal

COPY . .

COPY ./dist ./dist
