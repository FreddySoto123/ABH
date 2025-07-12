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

#### Opción 1: Usando Docker (Recomendado)

Todos los desarrolladores trabajarán con la misma base de datos al usar Docker. Los datos se sincronizan automáticamente.

#### Opción 2: Backup y Restauración Manual

```bash
# Hacer backup de la base de datos
node db/backup_restore.js backup

# Restaurar desde un backup
node db/backup_restore.js restore db/backups/backup_2024-01-01.sql

# Sincronizar (backup + instrucciones)
node db/backup_restore.js sync
```

### 🖥️ Servicios Disponibles

#### Backend (Node.js + Express)
- **URL:** http://localhost:4000
- **API:** http://localhost:4000/api/

#### Frontend (React + Vite)
- **URL:** http://localhost:5173

#### Base de Datos (MySQL)
- **Puerto:** 3306

### 📡 Endpoints de la API

#### Pruebas
- `GET /` - Estado del servidor
- `GET /api/test-db` - Prueba de conexión a la base de datos

#### Personas
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

# Detener y eliminar volúmenes (⚠️ ELIMINA DATOS)
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache

# Acceder al contenedor de la base de datos
docker exec -it abh_mysql mysql -u abh_user -p mi_base_de_datos
```

### 📊 Flujo de Trabajo para Desarrolladores

1. **Configuración inicial:**
   ```bash
   git clone <repo>
   cd ABH
   docker-compose up -d
   ```

2. **Desarrollo diario:**
   ```bash
   # Obtener cambios
   git pull

   # Si hay cambios en Docker
   docker-compose down
   docker-compose up -d

   # Verificar estado
   curl http://localhost:4000/api/test-db
   ```

3. **Compartir cambios en la BD:**
   ```bash
   # Hacer backup
   node db/backup_restore.js backup

   # Commit y push
   git add .
   git commit -m "Actualización de base de datos"
   git push
   ```

4. **Aplicar cambios de otros desarrolladores:**
   ```bash
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

### 🔧 Troubleshooting

#### Error de conexión a la base de datos
```bash
# Verificar que MySQL esté corriendo
docker-compose ps

# Ver logs de MySQL
docker-compose logs db

# Reiniciar el servicio
docker-compose restart db
```

#### Problemas con permisos
```bash
# En sistemas Linux/Mac
sudo chown -R $USER:$USER .

# Reconstruir contenedores
docker-compose down
docker-compose up -d --build
```

#### Limpiar todo y empezar de nuevo
```bash
# ⚠️ ESTO ELIMINA TODOS LOS DATOS
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

### 🤝 Contribución

1. Crear una rama para tu feature
2. Hacer commits descriptivos
3. Hacer backup de la BD si hay cambios
4. Crear un Pull Request

### 📞 Soporte

Para problemas o dudas, contactar al equipo de desarrollo o crear un issue en el repositorio.
