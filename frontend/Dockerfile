FROM node:18.17.0-alpine
LABEL authors="dcsuibian"

WORKDIR /app
COPY .next/standalone .
RUN mkdir -p /app/.next/static
COPY .next/static ./.next/static

ENV NODE_ENV production
ENV PORT 9527

EXPOSE 9527
ENTRYPOINT ["node", "server.js"]
