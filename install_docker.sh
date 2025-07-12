#!/bin/bash

# Script para instalar Docker en sistemas basados en Debian/Ubuntu
# Este script debe ejecutarse con sudo

echo "🔧 Instalando Docker..."

# Actualizar repositorios
apt-get update

# Instalar dependencias
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Agregar clave GPG oficial de Docker
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Agregar repositorio de Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Actualizar repositorios
apt-get update

# Instalar Docker
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Iniciar Docker
systemctl start docker
systemctl enable docker

# Agregar usuario al grupo docker
usermod -aG docker $SUDO_USER

echo "✅ Docker instalado exitosamente"
echo "🔄 Reinicia tu sesión para usar Docker sin sudo"
echo "🚀 Para probar: docker run hello-world"
