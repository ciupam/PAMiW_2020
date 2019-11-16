FROM node:lts-slim

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL warn

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --no-optional --silent && npm cache clean --force

COPY . .

CMD ["npm", "start"]