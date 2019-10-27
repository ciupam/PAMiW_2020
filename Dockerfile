FROM node:10-slim

RUN npm install -g nodemon

WORKDIR /app 

ENV PORT 8080

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]