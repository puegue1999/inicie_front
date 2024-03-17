FROM node:18 AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=node /app/dist/inicie_front .