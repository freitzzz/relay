FROM node:14.20.0-alpine

COPY * ./
ADD src src

RUN npm install

CMD [ "npm", "start" ]