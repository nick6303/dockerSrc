## Stage 1
FROM alpine/git:latest AS clone-repo

ARG GITLAB_HOST=github.com/nick6303/
ARG GITLAB_API_TOKEN=ae6183668a3a135a779e4c419a9d89173fdd64d1

WORKDIR /

# Cache busting: RUN "git clone" without using cache always
ADD https://google.com temp.json

RUN git clone -b main http://NPM:$GITLAB_API_TOKEN@$GITLAB_HOST/dockerFile temp

## Stage 2
FROM node:14.15  

WORKDIR /dockerfile

COPY --from=clone-repo /temp/package.json .
COPY --from=clone-repo /temp/package-lock.json .

RUN npm install --silent

COPY --from=clone-repo /temp .

COPY src src
