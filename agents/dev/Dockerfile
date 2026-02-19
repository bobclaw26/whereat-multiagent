FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache curl git

COPY package.json /app/
RUN npm install --production

COPY agent.js /app/

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "agent.js"]
