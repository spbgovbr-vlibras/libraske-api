FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ormconfig.json ./dist

COPY .env ./dist

WORKDIR ./dist

EXPOSE 3333
CMD [ "node", "server.js" ]
