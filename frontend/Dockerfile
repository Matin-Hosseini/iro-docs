FROM node:alpine

WORKDIR /app

COPY package*.json .


RUN npm install -c


COPY . .

RUN npm run build

CMD [ "npm" , "start" ]