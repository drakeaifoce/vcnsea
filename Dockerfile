FROM docker/dev-environments-javascript:stable-1 as development
WORKDIR /vcnsea
COPY . .
RUN npm install
