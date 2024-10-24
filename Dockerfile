# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --only=prod

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación Remix
RUN npm run build

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación Remix
CMD ["npm", "start"]
