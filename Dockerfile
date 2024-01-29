FROM node:20

RUN npm install -g nodemon

WORKDIR /app_test


COPY package.json .


RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "run", "dev"]
