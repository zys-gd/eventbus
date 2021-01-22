FROM library/node:14 as development
WORKDIR /usr/src/app
COPY . .
RUN npm install --only=development --no-optional --no-audit --ignore-scripts
RUN npm install --save glob --no-audit
RUN npm run build

FROM library/node:14
WORKDIR /app
COPY package*.json ./
RUN npm install node-gyp -g --no-optional
RUN npm install --only=production --no-audit --ignore-scripts
RUN npm rebuild bcrypt --build-from-source
COPY --from=development /usr/src/app/dist ./dist
USER node
