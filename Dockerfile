# Multi-stage build untuk optimasi ukuran image

# Stage 1: Build aplikasi React
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (termasuk dev dependencies untuk build)
RUN npm ci

# Copy source code
COPY . .

# Build aplikasi untuk production
RUN npm run build

# Stage 2: Serve dengan nginx
FROM nginx:alpine

# Copy built app dari stage sebelumnya
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config (opsional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]