FROM node:20.11
WORKDIR /app_test
COPY . .
RUN npm ci
CMD [ "mpn", "start"]