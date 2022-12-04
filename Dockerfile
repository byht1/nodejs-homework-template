FROM  node:16.17-alpine

WORKDIR /server

COPY ./package.json .

RUN npm instal

COPY . .

EXPOSE 5000 

CMD npm start
