# pull official base image
FROM node:12-alpine as build

RUN mkdir /app
COPY . ./app/
WORKDIR /app

ARG REACT_APP_BASE_API_URL='https://backend.digify.shop'
ARG REACT_APP_STAGING='false'

ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL
ENV REACT_APP_STAGING=$REACT_APP_STAGING

RUN npm install --only=prod
RUN npm run build

# production environment
FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

## Remove default .nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080

# Initialize environment variables into filesystem
WORKDIR /usr/share/nginx/html

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
