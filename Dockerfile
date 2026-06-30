# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy app source
COPY . .

# Expose the port Cloudron expects
EXPOSE 3002

# Start the app (adjust if your start script is different)
CMD ["npm", "run", "start"]
