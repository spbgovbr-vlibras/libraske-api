FROM node:14.17

RUN apt-get update && apt-get install -y unzip zip ssh python3 curl git-core curl build-essential openssl libssl-dev


WORKDIR /libraske/

RUN yarn install

RUN npm install

EXPOSE 80

CMD yarn typeorm migration:run && yarn seed-dth && yarn dth
#CMD yarn dth
