FROM node:16 as build

ENV PORT 3000

WORKDIR /root/app

COPY package*.json /root/app
COPY yarn.lock /root/app

RUN yarn config set network-timeout 600000 -g
RUN yarn install

COPY . ./

RUN yarn build


# FROM node:16 as dev

# RUN mkdir -p /root/app
# ENV PORT 3000

# WORKDIR /root/app

# COPY package*.json /root/app
# COPY yarn.lock /root/app

# RUN yarn config set network-timeout 600000 -g
# RUN yarn install

# COPY . ./

# RUN yarn build

# EXPOSE 3000
# CMD [ "yarn", "develop" ]

FROM node:16 as prod

RUN apt-get update && \
    apt-get install -y openjdk-11-jdk ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64/
RUN export JAVA_HOME

USER node
ENV PORT 3000

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn config set network-timeout 600000 -g
RUN yarn install --production

COPY . ./
COPY --chown=node:node --from=build /root/app/.next ./.next

EXPOSE 3000
CMD [ "yarn", "start" ]
