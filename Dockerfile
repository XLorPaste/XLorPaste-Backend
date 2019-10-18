FROM node

RUN apt-get update \
    && apt-get install -y mongodb \
    && npm install -g typescript yarn

ADD . /backend

WORKDIR /backend

RUN yarn && chmod +x run.sh

EXPOSE 3000

ENTRYPOINT ["./run.sh"]
