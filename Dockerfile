FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install -g @google/clasp
COPY ./.clasprc.json /root/.clasprc.json
COPY . /app
VOLUME /app
WORKDIR /app
RUN pnpm install -r --frozen-lockfile

FROM base AS dev
WORKDIR /app
EXPOSE 8000
CMD cd /app/packages/api \
    && echo "API_TOKEN=$(clasp run getToken | sed 's/Running in dev mode.//; s/^ *//; s/ *$//' | tr -d '\n')" > /app/packages/gatsby/.env.local \
    && cd /app \
    && pnpm dev --scope @hgod-in-cv/data --scope @hgod-in-cv/gatsby