FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#Crea la carpeta dist para producción, transpila el código TypeScript a JavaScript
RUN npm run build 

FROM node:18-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/package*.json ./
RUN chown -R appuser:appgroup /app

USER appuser
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]
