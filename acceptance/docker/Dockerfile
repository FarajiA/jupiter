FROM node:12.16.2-alpine

WORKDIR /var/tests

COPY . /var/tests

COPY ./entrypoint.sh /usr/local/bin/

ENTRYPOINT ["sh","entrypoint.sh"]
