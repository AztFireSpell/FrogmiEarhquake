# Use an official Node.js LTS image as the base image
FROM node:21-alpine AS BUILD_IMAGE
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build

#Iniciar el segundo stage
#Para mostrar la aplicacion lista y funcional

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILD_IMAGE /app/dist /var/www/app/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
