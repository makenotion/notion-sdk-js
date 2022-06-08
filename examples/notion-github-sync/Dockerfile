FROM alpine/git as intermediate
WORKDIR /usr/app
RUN git clone https://github.com/ralsuwaidi/notion-sdk-js.git


FROM node
COPY --from=intermediate /usr/app /usr/app
WORKDIR /usr/app/notion-sdk-js/examples/notion-github-sync
RUN npm install --quiet
ENTRYPOINT [ "node", "index.js" ]