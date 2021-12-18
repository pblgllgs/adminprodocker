FROM node:12-alpine3.12 as build
RUN mkdir -p /usr/src/app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","run","dev" ]
