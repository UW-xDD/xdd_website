FROM node:10 as build
WORKDIR /usr/src/app
COPY . ./
RUN npm install -g gulp
RUN npm install
RUN gulp deploy

FROM nginx:1.15
COPY --from=build /usr/src/app /usr/share/nginx/html

