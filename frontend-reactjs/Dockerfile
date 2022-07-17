FROM node:16-alpine
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
RUN npm install react-scripts@3.4.1 -g
COPY . ./
EXPOSE 3000