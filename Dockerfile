FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/ 
RUN npm run install-client  --omit=dev


COPY server/package*.json server/
RUN npm run install-server  --omit=dev


COPY client/ client/
# RUN npm run build --prefix client
# RUN ls -la /app/client 

COPY server/ server/

USER node

RUN chmod 755 /app/server 

CMD [ "npm", "run", "deploy" ]

EXPOSE 8000