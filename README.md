# Academia Boliviana de Historia - Sistema de Gestión

## 🚀 Configuración del Proyecto

Este proyecto utiliza Docker para asegurar que todos los desarrolladores trabajen con la misma base de datos MySQL y configuración. El sistema incluye herramientas avanzadas de gestión de base de datos y sincronización entre desarrolladores.

### 📋 Requisitos

- Docker y Docker Compose
- Git
- Node.js 18+ (para desarrollo local opcional)
- curl (para pruebas de API)

### 🔧 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/FreddySoto123/ABH.git
   cd ABH
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env si es necesario
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar la base de datos:**
   ```bash
   npm run db:start
   # o usar el script directamente
   ./scripts/db-manage.sh start
   ```

5. **Verificar que la base de datos esté funcionando:**
   ```bash
   npm run db:status
   ```

6. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

### 🗄️ Base de Datos

#### Acceso a la Base de Datos

- **Host:** localhost
- **Puerto:** 3306
- **Usuario:** abh_user
- **Contraseña:** abh_password
- **Base de datos:** mi_base_de_datos

#### Estructura de la Base de Datos

La base de datos se inicializa automáticamente con:
- `db/init.sql` - Estructura de tablas
- `db/data/01_seed_data.sql` - Datos de ejemplo

### 🔄 Sincronización entre Desarrolladores

Usando Docker, todos los desarrolladores tendrán la misma base de datos. Los datos y el estado del entorno se mantienen consistentes al compartir volúmenes de datos mediante Docker.

### 🖥️ Servicios Disponibles

#### Backend (Node.js + Express)
- **URL:** http://localhost:4000

#### Frontend (React + Vite)
- **URL:** http://localhost:5173

### 📡 Endpoints de la API

- `GET /` - Estado del servidor
- `GET /api/test-db` - Prueba de conexión a la base de datos
- `GET /api/personas` - Obtener todas las personas
- `POST /api/personas` - Crear una nueva persona

### 🔨 Comandos Útiles

#### Gestión de Base de Datos
```bash
# Iniciar base de datos
npm run db:start

# Verificar estado
npm run db:status

# Hacer backup
npm run db:backup

# Conectar a la base de datos
npm run db:connect

# Ver logs de la base de datos
npm run db:logs

# Reiniciar base de datos (¡CUIDADO! Elimina todos los datos)
npm run db:reset

# Detener base de datos
npm run db:stop
```

#### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Iniciar servidor de producción
npm start

# Configuración completa (base de datos + servidor)
npm run setup

# Probar API
npm run test:api
```

#### Docker
```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs db

# Reiniciar un servicio
docker-compose restart db

# Detener todos los servicios
docker-compose down
```

### 📊 Flujo de Trabajo para Desarrolladores

#### Configuración Inicial
```bash
# 1. Clonar el repositorio
git clone https://github.com/FreddySoto123/ABH.git
cd ABH

# 2. Configurar entorno
cp .env.example .env
npm install

# 3. Iniciar base de datos
npm run db:start

# 4. Esperar a que esté lista (esto puede tomar 1-2 minutos)
npm run db:status

# 5. Iniciar servidor
npm run dev
```

#### Desarrollo Diario
```bash
# Actualizar código
git pull

# Reiniciar servicios si es necesario
npm run db:start
npm run dev

# Hacer backup antes de cambios importantes
npm run db:backup
```

#### Sincronización de Datos
```bash
# Para compartir cambios en la base de datos:
# 1. Hacer backup
npm run db:backup

# 2. Commitear el backup si es necesario
git add db/backups/
git commit -m "Backup de base de datos con nuevos datos"

# 3. Otros desarrolladores pueden restaurar:
# npm run db:reset
# ./scripts/db-manage.sh restore db/backups/backup_FECHA.sql
```

### 🧪 Pruebas

#### Probar la API
```bash
# Probar conexión
curl http://localhost:4000/api/test-db

# Obtener personas
curl http://localhost:4000/api/personas

# Crear persona
curl -X POST http://localhost:4000/api/personas \
  -H "Content-Type: application/json" \
  -d '{
    "id_grado": 1,
    "id_tipo_persona": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "imagen_perfil_url": "https://example.com/imagen.jpg"
  }'
```

### 📁 Estructura del Proyecto

```
ABH/
├── client/                 # Frontend React
│   ├── src/
│   └── package.json
├── server/                 # Backend Node.js
│   ├── index.js           # Servidor principal
│   ├── config.js          # Configuración
│   └── db.js              # Conexión a BD
├── db/                     # Base de datos
│   ├── init.sql           # Estructura inicial
│   └── data/              # Datos de ejemplo
├── docker-compose.yml     # Configuración Docker
├── .env.example           # Ejemplo de variables de entorno
├── .gitignore             # Archivos ignorados por Git
├── package.json           # Dependencias del proyecto
└── README.md             # Este archivo
```

### 🤝 Contribución

1. Crear una rama para tu feature
2. Hacer commits descriptivos
3. Crear un Pull Request
