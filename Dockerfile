FROM node:12.18.1
WORKDIR /node-project/
COPY package.json ./package.json
RUN npm install
COPY . .
CMD ["node", "./write_to_file.js"]
