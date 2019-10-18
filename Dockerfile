FROM node

RUN apt-get update \
    && apt-get install -y mongodb

WORKDIR /backend

EXPOSE 3000

# ENTRYPOINT [ "service", "mongodb", "start" ]
ENTRYPOINT ["sleep", "infinity"]