FROM node:10.19.0
 
WORKDIR /app

 
COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 9000

CMD [ "node", "server.js" ]