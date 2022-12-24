FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV DATABASE_URL="mongodb+srv://student:asdf@soodne-cluster.y1luxo3.mongodb.net/soodne"
ENV CRON_TOKEN="sig_4aa7UmvPXdoUTSYADxoFACgmaKyY"

CMD ["npm", "run", "dev"]