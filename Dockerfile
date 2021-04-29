FROM browserless/base:1.9.0

# FROM node:12

WORKDIR /src

COPY package*.json ./

RUN npm install

ARG CHROME_VERSION="86.0.4238.0-1"

RUN apt-get update \
  # Download & install latest dev Chrome
  && wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-unstable/google-chrome-unstable_${CHROME_VERSION}_amd64.deb \
  && apt-get install -y /tmp/chrome.deb --no-install-recommends --allow-downgrades

ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome-unstable
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/google-chrome-unstable

COPY . .

ENV PORT=8080

EXPOSE 8080

USER blessuser

CMD [ "node", "main.js" ]
