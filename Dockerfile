FROM node:16-alpine
EXPOSE 5108
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT [ "npm", "start" ]