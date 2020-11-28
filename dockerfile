FROM node:10-alpine

COPY [ "package.json", "package-lock.json", "/usr/src/app/" ]

WORKDIR /usr/src/app

RUN npm install

COPY [".", "/usr/src/app" ]

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
