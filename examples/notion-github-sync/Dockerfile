FROM node
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
RUN ["node","index.js"]