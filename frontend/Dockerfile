FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "dev"]