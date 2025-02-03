# claims-management-frontend/Dockerfile
# Stage 1: Build the Vue.js app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build the application
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:latest

# Copy the built files from the previous stage into Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
