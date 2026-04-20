# Usa imagem oficial do Node
FROM node:18

# Cria pasta dentro do container
WORKDIR /app

# Copia package.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o projeto
COPY . .

# Porta usada pelo Cloud Run
ENV PORT=8080

# Expõe a porta
EXPOSE 8080

# Comando de inicialização
CMD ["npm", "start"]