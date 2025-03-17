FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app
COPY /package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm","run", "dev"]