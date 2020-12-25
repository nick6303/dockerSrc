## Stage 1
FROM alpine/git:latest AS clone-repo

ARG GITLAB_HOST=gitlab-ce.cyadmk.com   
ARG GITLAB_API_TOKEN=wxzGmQzWcPxhmBTyksDj

WORKDIR /

# Cache busting: RUN "git clone" without using cache always
ADD https://google.com temp.json

RUN git clone -b main http://NPM:$GITLAB_API_TOKEN@$GITLAB_HOST/sysevt/vact-nest.git temp

## Stage 2
FROM node:14.15  

WORKDIR /dockerFile

COPY --from=clone-repo /temp/package.json .
COPY --from=clone-repo /temp/package-lock.json .

RUN npm install --silent

COPY --from=clone-repo /temp .

COPY src .

RUN npm run serve