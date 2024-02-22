FROM node:lts-alpine

RUN mkdir /app && chown node:node /app

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/ 
RUN npm run install-client  --omit=dev


COPY server/package*.json server/
RUN npm run install-server  --omit=dev


COPY client/ client/

COPY server/ server/

RUN mkdir /app/server/public && chown node:node /app/server/public
RUN chown node:node /app/client
RUN chown node:node /app/client/node_modules

USER node

CMD [ "npm", "run", "deploy" ]

EXPOSE 8000