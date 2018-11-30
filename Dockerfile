FROM node:10-alpine as base

WORKDIR /usr/src/app

COPY . .

RUN yarn --frozen-lockfile
RUN yarn types
RUN yarn build

# Remove dependencies and install only the ones for production.
RUN rm -rf node_modules
ENV NODE_ENV production
RUN yarn --frozen-lockfile

FROM node:10-alpine

WORKDIR /usr/src/app
ENV NODE_ENV production

COPY . .
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/node_modules ./node_modules

CMD ["node", "dist/src"]
