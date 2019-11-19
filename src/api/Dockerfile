FROM node:lts-alpine

RUN npm install -g nodemon

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL warn

ENV PORT 8080

COPY package.json . 

RUN npm install --no-optional --silent && npm cache clean --force

COPY . .

CMD ["npm", "start"]