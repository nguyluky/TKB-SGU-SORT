FROM node:20

RUN npm install -g nodemon

WORKDIR /app_test


COPY package.json .


RUN npm install

COPY . .

ENV PORT=80

EXPOSE 80

CMD [ "npm", "run", "dev"]
