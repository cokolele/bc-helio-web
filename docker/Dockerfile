FROM node:18-slim AS build

WORKDIR /app

COPY ./ ./

RUN yarn
RUN yarn build

FROM nginx:1.23.3-alpine-slim

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./docker/nginx/spa.conf /etc/nginx/conf.d/default.conf