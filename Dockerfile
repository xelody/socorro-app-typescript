FROM node:14-alpine as builder

WORKDIR '/usr/app'

ENV PORT 80

RUN echo "Running on port: $PORT"

# install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app and run
COPY . ./
RUN npm run build

CMD ["node", "build/server.js"]
