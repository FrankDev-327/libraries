# Stage 1: Build the application
FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

CMD ["node", "dist/main"]