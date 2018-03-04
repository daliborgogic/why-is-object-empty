FROM node:9-alpine

RUN apk update
RUN apk upgrade
RUN apk add --update ca-certificates
RUN apk add chromium --update-cache --repository http://nl.alpinelinux.org/alpine/edge/community
RUN rm -rf /var/cache/apk/*

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm i --production

COPY ./ /app

EXPOSE 3000

CMD ["node_modules/.bin/micro"]