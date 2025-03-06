FROM node:20.18-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g @angular/cli

RUN ng build

EXPOSE 4200

CMD ["npm", "run", "start"]
