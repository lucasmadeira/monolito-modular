# Define a imagem base
FROM node:14.20.0-alpine

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia os arquivos do projeto para a imagem
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.ts ./
COPY src ./src
COPY .swcrc ./

# Instala as dependências do projeto
RUN npm install
RUN npm install --save-dev @types/node @types/validator
RUN npm install sequelize reflect-metadata sequelize-typescript



# Define o comando para iniciar o aplicativo
CMD ["npm", "test", "/src/modules/invoice"]
