FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY backend/package*.json ./
RUN npm install

# Copy source code
COPY backend/ ./

# Expose port
EXPOSE 3001

CMD ["node", "src/server.js"]
