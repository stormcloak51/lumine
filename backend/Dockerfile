FROM node:18

# Правильный рабочий каталог
WORKDIR /usr/src/app

# Копируем package.json и tsconfig.json
COPY package*.json ./
COPY tsconfig.json ./

# Установка зависимостей
RUN npm install

CMD ["npm", "run", "start:dev"]