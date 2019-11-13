FROM node:10-slim

RUN npm install -g nodemon

WORKDIR /app 

COPY package.json .

RUN npm install --silent

COPY . .

CMD ["npm", "start"]