# FROM node:latest-alpine

# WORKDIR /usr/src/onlineEditor
# COPY package.json .
# RUN npm install
# EXPOSE 3000
# COPY . .
# CMD ["npm", "start"]

FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]

# use to run: docker run --rm -p 3000:3000 -it  online-editor:latest
