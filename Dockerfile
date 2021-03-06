FROM node

ADD . /backend

WORKDIR /backend

ENV NODE_ENV=production

RUN npm install -g --force typescript yarn && yarn install --production=false

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
