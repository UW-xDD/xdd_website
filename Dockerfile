FROM ruby:3.2.2 as build
WORKDIR /usr/src/app
COPY . ./
RUN bundle install
RUN JEKYLL_ENV=production bundle exec jekyll build

FROM nginx:1.15
COPY --from=build /usr/src/app/_site /usr/share/nginx/html