FROM node:14.5.0-buster-slim
RUN apt update && npm install -g serve
ADD . /ref
WORKDIR /ref
ARG BUILD_MODE
RUN npm install && npm run $BUILD_MODE
ARG PORT=5502
ENV PORT_NUMBER=$PORT
EXPOSE $PORT_NUMBER
CMD serve -s build -l $PORT_NUMBER