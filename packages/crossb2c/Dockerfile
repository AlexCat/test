# stage: 1
FROM node:16-alpine as react-build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY src/assets/sber-id-sdk src/assets/sber-id-sdk
RUN yarn
COPY . ./
RUN yarn build


# stage: 2 — the production environment
FROM nginx:alpine

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static build
COPY --from=react-build /app/build /usr/share/nginx/html

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
