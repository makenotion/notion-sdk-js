FROM node
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
ENTRYPOINT [ "node", "index.js" ]