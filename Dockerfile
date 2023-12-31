FROM node:17-alpine

WORKDIR /backEnd

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3009
# RUN chmod +x startSource.sh
CMD ["npm", "start"]
# ENTRYPOINT [ "./startSource.sh" ]
