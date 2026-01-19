# Stage 1 – build
FROM node:25-alpine3.23 AS builder

RUN apk update && apk upgrade && apk add --no-cache unzip
WORKDIR /libraske/

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
RUN unzip -o tmp.zip -d ./tmp/

# Stage 2 – runtime
FROM node:25-alpine3.23

RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

WORKDIR /libraske/

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /libraske/dist ./dist
COPY --from=builder /libraske/tmp ./tmp

ENV TYPEORM_ENTITIES="./dist/models/*.js"
ENV TYPEORM_MIGRATIONS="./dist/database/migrations/*.js"
ENV TYPEORM_MIGRATIONS_DIR="./dist/database/migrations"


CMD ["node", "dist/server.js"]