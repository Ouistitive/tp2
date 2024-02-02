# Utilisez une image Node.js officielle en tant que base
FROM node:lts-bullseye-slim

# Création du répertoire de destination pour l'application
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Définir le répertoire de travail
WORKDIR /home/node/app

# Copie des fichiers package*.json
COPY package*.json ./

# Installation des modules dans le conteneur
RUN npm install

# Copie des fichiers sources
COPY . .

EXPOSE 3000

# Démarrer l'application Node.js
CMD ["node", "src/server.js"]
