FROM node:20.18.0 AS base
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.22 && \
  apt-get update && apt-get install -y \
  libxshmfence1 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libgtk-3-0 \
  libgbm1 \
  libasound2 \
  libnss3 \
  libxss1 \
  libxtst6 \
  libx11-xcb1 \
  libxcb-dri3-0 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxkbcommon0 \
  libxkbcommon-x11-0 \
  libpango-1.0-0 \
  libcairo2 \
  && apt-get clean && \
  rm -rf /var/lib/apt/lists/*
ENV PATH="/root/.yarn/bin:${PATH}"
WORKDIR /app
RUN chown -R node:node /app
COPY --chown=node:node package.json yarn.lock ./
USER node
EXPOSE 3000

FROM base AS development
RUN yarn install && yarn electron-builder install-app-deps
COPY --chown=node:node . .
CMD ["yarn", "start"]

FROM base AS production
RUN yarn install && yarn electron-builder install-app-deps
COPY --chown=node:node . .
RUN yarn build
