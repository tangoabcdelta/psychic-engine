# FROM node:14.5.0-buster-slim
# FROM buildpack-deps:buster
FROM node:10-buster


RUN apt update



ARG NODE_VERSION
ARG YARN_VERSION
ARG BUILD_MODE
ARG PORT


# ENV NODE_VERSION 15.0.1
# ENV YARN_VERSION 1.22.10
ENV NODE_VERSION=$NODE_VERSION
ENV YARN_VERSION=$YARN_VERSION
ENV PORT_NUMBER=$PORT


# RUN apt update && npm install -g serve
ADD . /public
WORKDIR /public

RUN yarn install
RUN yarn run $BUILD_MODE

EXPOSE 4000
EXPOSE $PORT_NUMBER


CMD serve -s build -l $PORT_NUMBER
