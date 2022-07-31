FROM node:16-alpine as dev

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --force

COPY . .

ENV PORT 3000
EXPOSE $PORT

CMD ["npm", "run", "start:dev"]