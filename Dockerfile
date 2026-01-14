FROM node:24-bullseye-slim

RUN apt-get update && apt-get install -y unzip zip ssh python3 curl git-core curl build-essential openssl libssl-dev

COPY . /libraske/

WORKDIR /libraske/

RUN yarn install

RUN unzip -o tmp.zip -d /

EXPOSE 80

CMD yarn migration:run && yarn seed-dth && yarn dth
#CMD yarn dth
