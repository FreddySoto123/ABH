# Academia Boliviana de Historia - Sistema de Gestión

## 🚀 Configuración del Proyecto

Este proyecto utiliza Docker para asegurar que todos los desarrolladores trabajen con la misma base de datos MySQL y configuración.

### 📋 Requisitos

- Docker y Docker Compose
- Git
- Node.js 18+ (para desarrollo local opcional)

### 🔧 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/FreddySoto123/ABH.git
   cd ABH
   ```

2. **Levantar los servicios con Docker:**
   ```bash
   docker-compose up -d
   ```

3. **Verificar que los servicios estén funcionando:**
   ```bash
   docker-compose ps
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

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs server

# Reiniciar un servicio
docker-compose restart server

# Detener todos los servicios
docker-compose down
```

### 📊 Flujo de Trabajo para Desarrolladores

1. **Configuración inicial y desarrollo diario:**
   ```bash
   git clone <repo>
   cd ABH
   docker-compose up -d

   # Para actualizar
   git pull
   docker-compose down
   docker-compose up -d
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
│   ├── data/              # Datos de ejemplo
│   ├── backups/           # Backups
│   └── migrations/        # Migraciones
├── docker-compose.yml     # Configuración Docker
├── Dockerfile.server      # Imagen del servidor
├── Dockerfile.client      # Imagen del cliente
└── README.md             # Este archivo
```

### 🤝 Contribución

1. Crear una rama para tu feature
2. Hacer commits descriptivos
3. Crear un Pull Request
