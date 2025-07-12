FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY server ./server

# Exponer puerto
EXPOSE 4000

# Comando por defecto
CMD ["npm", "start"]
