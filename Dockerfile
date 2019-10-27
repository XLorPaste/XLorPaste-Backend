FROM node

RUN npm install -g typescript yarn

ADD . /backend

WORKDIR /backend

ENV NODE_ENV=production

RUN yarn install && chmod +x run.sh

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
