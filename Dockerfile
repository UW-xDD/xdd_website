FROM jekyll/jekyll as build
WORKDIR /usr/src/app
COPY . ./
RUN chmod a+w ./Gemfile.lock
RUN jekyll build 

FROM nginx:1.15
COPY --from=build /usr/src/app/_site /usr/share/nginx/html
