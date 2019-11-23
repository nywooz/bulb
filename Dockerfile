FROM node:11
WORKDIR /bulb/backend
COPY package.json /bulb/backend
RUN npm install
COPY . /bulb/backend
WORKDIR /bulb/client
COPY package.json /bulb/client
RUN npm install
COPY . /bulb/client
WORKDIR /bulb 
CMD ["npm","start"]
EXPOSE 8082


