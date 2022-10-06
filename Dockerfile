# pull the official base image
FROM node: alpine
# set working direction
WORKDIR /app
# add `/app/client/node_modules/.bin` to $PATH
ENV PATH /app/client/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . ./
# start app
CMD ["npm", "start"]