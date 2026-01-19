# Stage 1 – build
FROM node:25-alpine3.23 AS builder

RUN apk update && apk upgrade && apk add --no-cache unzip
WORKDIR /libraske/

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN unzip -o tmp.zip -d ./tmp/

# Stage 2 – runtime
FROM node:25-alpine3.23

RUN yarn install --production
WORKDIR /libraske/

COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /libraske/dist ./dist
COPY --from=builder /libraske/tmp ./tmp

ENV NODE_ENV=production
ENV TYPEORM_ENTITIES="./dist/models/*.js"
ENV TYPEORM_MIGRATIONS="./dist/database/migrations/*.js"
ENV TYPEORM_MIGRATIONS_DIR="./dist/database/migrations"

CMD ["node", "dist/server.js"]