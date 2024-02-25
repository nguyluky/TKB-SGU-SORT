FROM node:20

RUN npm install -g nodemon

WORKDIR /app_test


COPY package.json .


RUN npm install
RUN npm install dotenv

COPY . .

ENV PORT=80

EXPOSE 80
EXPOSE 443

CMD [ "npm", "start"]
