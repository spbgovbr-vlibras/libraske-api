FROM node:14

RUN apt-get update && apt-get install -y unzip zip ssh python3 curl git-core curl build-essential openssl libssl-dev

copy . /libraske/

WORKDIR /libraske/

RUN npm install

EXPOSE 80
#CMD yarn typeorm migration:run && yarn run dev
CMD yarn run dev
