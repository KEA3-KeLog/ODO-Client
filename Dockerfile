# 20버전이 npm오류로 안돼서 14버전으로 빌드
FROM node:14-alpine as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
