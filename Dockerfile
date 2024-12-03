FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install -g @google/clasp
COPY ./.clasprc.json /root/.clasprc.json
COPY . /app
VOLUME /app
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm setup:install
CMD ["sh", "-c", "pnpm getToken"]

FROM base AS dev
EXPOSE 8000
CMD ["sh", "-c", "pnpm dev --stream --scope @hgod-in-cv/types --scope @hgod-in-cv/data --scope @hgod-in-cv/gatsby"]