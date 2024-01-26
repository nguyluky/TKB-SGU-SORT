FROM node:20
WORKDIR /app_test
COPY . .
RUN npm install

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start"]
