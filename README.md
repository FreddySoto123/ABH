# Academia Boliviana de Historia - Sistema de Gestión

> Sistema completo de gestión para la Academia Boliviana de Historia con arquitectura moderna, base de datos sincronizada y herramientas de desarrollo avanzadas.

## 🏗️ Arquitectura del Proyecto

### Frontend (client/)
- **Tecnología**: React 18 + Vite
- **Puerto**: http://localhost:5173
- **Ubicación**: `./client/`
- **Características**: SPA moderna con Hot Reload

### Backend (server/)
- **Tecnología**: Node.js + Express
- **Puerto**: http://localhost:4000
- **Ubicación**: `./server/`
- **API**: RESTful con endpoints para gestión completa

### Base de Datos
- **Tecnología**: MySQL 8.0 (Dockerizado)
- **Puerto**: localhost:3307
- **Ubicación**: `./db/`
- **Características**: Auto-inicialización con datos de ejemplo

## 🚀 Inicio Rápido

### Prerequisitos
```bash
# Verificar que tienes instalado:
- Docker y Docker Compose
- Node.js 18+
- Git
```

### Instalación Completa (5 minutos)
```bash
# 1. Clonar el proyecto
git clone https://github.com/FreddySoto123/ABH.git
cd ABH

# 2. Configurar entorno
cp .env.example .env
# Editar .env si es necesario (opcional)
npm install

# 3. Iniciar base de datos (tarda 2-3 minutos la primera vez)
npm run db:start

# 4. Esperar a que esté lista
npm run db:status  # Debe mostrar "healthy" (si al lado de health dice starting significa que el se sigue iniciando la base de datos y hay que seguir esperando)

# 5. Iniciar servidor backend
npm run dev

# 6. En otra terminal, iniciar frontend
cd client
npm install
npm run dev
```

### Verificar Instalación
```bash
# Backend funcionando
curl http://localhost:4000/api/test-db

# Frontend funcionando
# Abrir http://localhost:5173 en el navegador
```

### 🗄️ Base de Datos

#### Acceso a la Base de Datos

- **Host:** localhost
- **Puerto:** 3306
- **Usuario:** abh_user
- **Contraseña:** abh_password
- **Base de datos:** abhm

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

## 📁 Estructura Detallada del Proyecto

```
ABH/                                    # 🏠 DIRECTORIO RAÍZ
│
├── 📱 client/                         # FRONTEND (React + Vite)
│   ├── src/
│   │   ├── App.jsx                   # Componente principal
│   │   ├── main.jsx                  # Punto de entrada
│   │   ├── App.css                   # Estilos principales
│   │   └── assets/                   # Imágenes y recursos
│   ├── public/                       # Archivos públicos
│   ├── package.json                  # Dependencias frontend
│   ├── vite.config.js                # Configuración Vite
│   └── Dockerfile                    # Docker para frontend
│
├── 🔌 server/                         # BACKEND (Node.js + Express)
│   ├── index.js                      # 🚀 Servidor principal
│   ├── config.js                     # ⚙️ Configuración general
│   └── db.js                         # 📦 Conexión a base de datos
│
├── 📊 db/                             # BASE DE DATOS
│   ├── init.sql                      # 🏠 Estructura de tablas
│   ├── data/
│   │   └── 01_seed_data.sql            # 🌱 Datos de ejemplo
│   ├── backups/                      # 💾 Copias de seguridad
│   └── migrations/                   # 🔄 Migraciones futuras
│
├── 🛠️ scripts/                        # HERRAMIENTAS DE DESARROLLO
│   └── db-manage.sh                  # 🎯 Script gestión BD
│
├── 📦 docker-compose.yml              # Orquestación de servicios
├── 📦 Dockerfile                     # Docker para backend
├── ⚙️ .env.example                    # Variables de entorno ejemplo
├── ⚙️ .env                            # Variables de entorno (local)
├── 📄 .gitignore                     # Archivos ignorados
├── 📦 package.json                   # Dependencias raíz
└── 📚 README.md                      # Esta documentación
```

### 🎯 Puntos Clave para Desarrolladores

| Componente    | Ubicación    | Puerto | Comando                       |
|---------------|--------------|--------|-------------------------------|
| **Frontend**  | `./client/`  | 5173   | `cd client && npm run dev`   |
| **Backend**   | `./server/`  | 4000   | `npm run dev`                |
| **Base de Datos** | Docker   | 3307   | `npm run db:start`           |
| **Gestión BD** | `./scripts/`| -      | `./scripts/db-manage.sh help`|

### 📡 Variables de Entorno

```bash
# .env (copiar desde .env.example)
DB_HOST=localhost
DB_PORT=3307
DB_USER=abh_user
DB_PASSWORD=abh_password
DB_NAME=abhm
PORT=4000
NODE_ENV=development
```

## 🚑 Solución de Problemas Comunes

### 💡 La base de datos no inicia
```bash
# 1. Verificar que Docker esté corriendo
sudo systemctl status docker

# 2. Limpiar volumen corrupto
npm run db:reset

# 3. Verificar puertos en uso
sudo netstat -tulpn | grep :3307
```

### 💡 Error de conexión "ECONNREFUSED"
```bash
# 1. Verificar que la BD esté saludable
npm run db:status

# 2. Esperar más tiempo (MySQL tarda 2-3 minutos)
sleep 180 && npm run db:status

# 3. Revisar configuración
cat .env
```

### 💡 "Port 3307 already in use"
```bash
# 1. Encontrar proceso usando el puerto
sudo lsof -i :3307

# 2. Parar servicios Docker existentes
docker-compose down
sudo docker system prune -f

# 3. Reiniciar
npm run db:start
```

### 💡 Frontend no carga
```bash
# 1. Verificar dependencias
cd client && npm install

# 2. Limpiar cache
rm -rf client/node_modules client/dist
cd client && npm install

# 3. Verificar puerto
curl http://localhost:5173
```

## 🏆 Mejores Prácticas

### 📝 Para Desarrolladores
- **Siempre** hacer `npm run db:backup` antes de cambios importantes
- **Nunca** commitear archivos `.env` con datos reales
- **Usar** ramas feature para nuevas funcionalidades
- **Probar** endpoints con `curl` antes de integrar frontend

### 📦 Para Base de Datos
- Los backups se generan automáticamente en `db/backups/`
- Solo se mantienen los últimos 5 backups
- Usar `latest_backup.sql` para restaurar el más reciente

### 🔌 Para API
- Todos los endpoints devuelven JSON
- Usar `status: "success"` o `status: "error"` en respuestas
- Incluir validación de datos en el backend

## 📈 Próximos Pasos

### 🚀 Funcionalidades Planificadas
- [ ] Autenticación y autorización
- [ ] CRUD completo para todas las entidades
- [ ] Sistema de archivos/documentos
- [ ] Panel de administración
- [ ] API REST completa
- [ ] Tests automatizados

### 🤝 Contribución
1. **Fork** el proyecto
2. **Crear** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commitear** cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

### 📞 Soporte

¿Problemas? ¿Preguntas?
- 🐛 **Issues**: [GitHub Issues](https://github.com/FreddySoto123/ABH/issues)
- 💬 **Discusiones**: Usa el sistema de discusiones del repositorio
- 📧 **Email**: Contacta al equipo de desarrollo

---

**🎉 ¡Happy Coding!** - Equipo ABH
