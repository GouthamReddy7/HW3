# Use a base image with Node.js
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy all necessary files and folders to the container
COPY . .

# Install dependencies for each project
RUN cd "HW3/assignment2-VamsiSaiChandra-2003-main/src" && npm install
RUN cd HW3/Backend && npm install

# Expose the necessary ports
EXPOSE 3000 5000

# Command to run the frontend and backend services in parallel
CMD ["sh", "-c", "npm start --prefix 'HW3/assignment2-VamsiSaiChandra-2003-main/src' & npm start --prefix HW3/Backend"]
