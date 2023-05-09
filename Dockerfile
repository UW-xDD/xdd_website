FROM jekyll/jekyll as build
WORKDIR /usr/src/app
COPY . ./
RUN mkdir .jekyll-cache _site # https://github.com/jekyll/jekyll/issues/7591
RUN jekyll build 

FROM nginx:1.15
COPY --from=build /usr/src/app/_site /usr/share/nginx/html
