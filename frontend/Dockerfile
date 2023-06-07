FROM node:12

EXPOSE 3000
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_EDITOR=atom

COPY package.json /app/package.json
RUN npm install

CMD ["npm", "start"]
