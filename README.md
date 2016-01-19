# GeoDeepDive.org

## Setup
`npm install -g gulp`

## Running
`python -m SimpleHTTPServer 8000`

## Linting
Lints all HTML documents and creates `dist/js/libs.min.js`.

`gulp`

## Guidelines
+ All hyperlinks that reference an external domain should include `target="_blank"`
+ All links should be wrapped in double quotes to be linted properly
+ Make sure all errors thrown from linting are resolved before committing
