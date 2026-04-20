FROM node:18

WORKDIR /app

COPY back-tarefas/package*.json ./
RUN npm install

COPY back-tarefas .

EXPOSE 8080

CMD ["node", "index.js"]