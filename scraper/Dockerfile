FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY scraper/package*.json ./
RUN npm install

# Copy source code
COPY scraper/ ./

CMD ["node", "server.js"]
