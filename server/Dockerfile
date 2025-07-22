# Use a Python base image
FROM python:3.10-slim

# Install Node.js (v18) and other system dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/

# Set working directory
WORKDIR /app

# Copy server code
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
RUN npm install

# Expose ports for both apps
EXPOSE 5000 8000

# Run both Express and FastAPI using npm script
CMD ["npm", "start"]
