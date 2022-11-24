FROM nginx:1.17.1-alpine

RUN rm /usr/share/nginx/html/*
COPY dist/dashboard-ui/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
