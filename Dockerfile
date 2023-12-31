FROM node:17-alpine

WORKDIR /backEnd

COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
