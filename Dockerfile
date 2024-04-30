FROM node:latest

WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 1234

CMD ["npm", "run", "start"]