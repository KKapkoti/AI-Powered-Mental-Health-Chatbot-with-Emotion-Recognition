FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies first
RUN npm install

# Force rebuild of esbuild binary to match the environment
RUN npm rebuild esbuild

COPY . . 

EXPOSE 5173

CMD ["npm", "run", "dev"]




