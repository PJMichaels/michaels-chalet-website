FROM node:lts-alpine as build 

WORKDIR /app

COPY ./package.json .
# switch to npm ci at some point
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/nginx-dev.conf /etc/nginx/nginx.conf 

COPY --from=build /app/build /usr/share/nginx/html 