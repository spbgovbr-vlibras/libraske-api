FROM node:25-alpine3.23

RUN apk update && apk upgrade && apk add --no-cache unzip

COPY . /libraske/

WORKDIR /libraske/

RUN yarn install

RUN unzip -o tmp.zip -d /

EXPOSE 80

CMD yarn migration:run && yarn seed-dth && yarn dth
#CMD yarn dth
