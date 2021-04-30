FROM node:12

WORKDIR /src

COPY package*.json ./

RUN npm install

ARG CHROME_VERSION="86.0.4238.0-1"

RUN apt-get update \
  # Download & install latest dev Chrome
  && wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-unstable/google-chrome-unstable_${CHROME_VERSION}_amd64.deb \
  && apt-get install -y /tmp/chrome.deb --no-install-recommends --allow-downgrades

RUN apt-get update && apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps xvfb


ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome-unstable
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/google-chrome-unstable

COPY . .

ENV PORT=8080

EXPOSE 8080
CMD xvfb-run --server-args="-screen 1 1920x1080x8" node main.js
# CMD [ "node", "main.js" ]