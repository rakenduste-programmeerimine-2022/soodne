FROM node:18.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DATABASE_URL="mongodb+srv://student:asdf@soodne-cluster.y1luxo3.mongodb.net/soodne"
ENV CRON_TOKEN="sig_4aa7UmvPXdoUTSYADxoFACgmaKyY"

CMD ["npm", "run", "dev"]