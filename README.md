# Academia Boliviana de Historia - Sistema de Gestión

> Sistema completo de gestión para la Academia Boliviana de Historia con arquitectura moderna full-stack, diseño corporativo ABH y herramientas de desarrollo avanzadas.

## 🏗️ Arquitectura del Proyecto

### 🎨 Frontend (client/)
- **Tecnología**: React 18 + Vite + Axios
- **Puerto**: http://localhost:5173
- **Ubicación**: `./client/`
- **Características**: 
  - SPA moderna con Hot Reload
  - Sistema de diseño ABH corporativo
  - Tipografías Barlow (Desktop & Mobile)
  - Gestión completa de personas (CRUD)
  - Componentes UI reutilizables
  - Estados de carga y manejo de errores
  - Responsive design

### 🔌 Backend (server/)
- **Tecnología**: Node.js + Express + MySQL2
- **Puerto**: http://localhost:4000
- **Ubicación**: `./server/`
- **Características**:
  - API RESTful completa
  - Variables de entorno con dotenv
  - Validación de datos
  - Manejo de errores
  - CORS configurado
  - Conexión con pool de MySQL

### 🗄️ Base de Datos
- **Tecnología**: MySQL 8.0 (Dockerizado)
- **Puerto**: localhost:3307
- **Ubicación**: `./db/`
- **Características**: 
  - Auto-inicialización con datos de ejemplo
  - Estructura completa ABH
  - Backups automatizados
  - Seeds con datos reales

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

## 🎨 Sistema de Diseño ABH

### Paleta de Colores Corporativa
```css
--color-primary: #1A365D    /* Azul principal ABH */
--color-secondary: #2C3E50  /* Gris oscuro */
--color-gray: #7C7C7C       /* Gris medio */
--color-cream: #F4F1E8      /* Crema de fondo */
--color-white: #FFFFFF      /* Blanco */
--color-accent: #D9AB2C     /* Dorado de acento */
```

### Tipografías Barlow
- **Familia Principal**: Barlow (Normal)
- **Familia Secundaria**: Barlow Condensed
- **Pesos Disponibles**: 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Estilos**: Normal e Italic
- **Responsive**: Tamaños automáticamente ajustados para móvil

#### Clases de Tipografía Disponibles:
```css
.heading-1        /* Barlow Bold 70px (75px móvil) */
.heading-2        /* Barlow ExtraBold 55px (70px móvil) */
.heading-3        /* Barlow Condensed Bold 35px (60px móvil) */
.heading-4        /* Barlow Condensed SemiBold 25px (60px móvil) */
.body-large       /* Barlow Medium 20px (60px móvil) */
.body-medium      /* Barlow Condensed Medium 20px (60px móvil) */
.body-small       /* Barlow Regular 15px (55px móvil) */
.text-italic      /* Barlow Condensed Light Italic */
.text-caption     /* Texto pequeño para captions */
```

## 🖥️ Frontend - Gestión de Personas

### Funcionalidades Implementadas
- ✅ **Vista de Lista**: Grid responsive de tarjetas de personas
- ✅ **Crear Persona**: Modal con formulario completo
- ✅ **Editar Persona**: Modal pre-poblado con datos existentes
- ✅ **Eliminar Persona**: Confirmación con overlay
- ✅ **Validación**: En tiempo real con mensajes de error
- ✅ **Estados de Carga**: Spinners y feedback visual
- ✅ **Manejo de Errores**: Mensajes informativos al usuario
- ✅ **Responsive**: Optimizado para móvil, tablet y desktop

### Componentes UI Desarrollados

#### `<Button />` - Botón Reutilizable
```jsx
<Button variant="primary" size="medium" loading={false}>
  Crear Persona
</Button>
```
**Variantes**: `primary`, `secondary`, `success`, `danger`, `outline`  
**Tamaños**: `small`, `medium`, `large`

#### `<Modal />` - Modal Reutilizable
```jsx
<Modal isOpen={true} onClose={handleClose} title="Crear Persona" size="medium">
  <PersonaForm onSubmit={handleSubmit} />
</Modal>
```
**Tamaños**: `small`, `medium`, `large`, `full`

#### `<PersonaCard />` - Tarjeta de Persona
- Avatar con imagen o iniciales
- Información completa (nombre, grado, tipo)
- Acciones (editar/eliminar) con hover
- Badges coloridos para categorización
- Confirmación de eliminación integrada

#### `<PersonaForm />` - Formulario de Persona
- Campos validados en tiempo real
- Selectores dinámicos (grados y tipos desde API)
- Estados de carga durante envío
- Manejo de errores por campo

### Arquitectura Frontend

```
client/src/
├── 🎨 styles/
│   └── root.css                 # Variables del sistema de diseño
├── 🔧 services/
│   └── api.js                   # Cliente HTTP con Axios
├── 🎣 hooks/
│   └── usePersonas.js           # Hook para gestión de estado
├── 🧩 components/
│   ├── ui/
│   │   ├── Button.jsx           # Botón reutilizable
│   │   └── Modal.jsx            # Modal reutilizable
│   ├── PersonaCard.jsx          # Tarjeta de persona
│   └── PersonaForm.jsx          # Formulario de persona
├── 📄 pages/
│   ├── PersonasPage.jsx         # Página principal
│   └── NotFoundPage.jsx         # Página 404
├── App.jsx                      # Componente raíz
└── main.jsx                     # Punto de entrada
```

### 📡 API Endpoints Disponibles

#### Gestión de Personas
- `GET /personas` - Obtener todas las personas con relaciones
- `GET /personas/:id` - Obtener una persona específica
- `POST /personas` - Crear nueva persona
- `PUT /personas/:id` - Actualizar persona existente
- `DELETE /personas/:id` - Eliminar persona (con validación de dependencias)

#### Datos Auxiliares
- `GET /grados` - Obtener todos los grados disponibles
- `GET /tipos-persona` - Obtener todos los tipos de persona

#### Utilidades
- `GET /ping` - Estado del servidor

### Ejemplo de Uso de la API
```bash
# Crear persona
curl -X POST http://localhost:4000/personas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_persona": "Juan",
    "apellido_persona": "Pérez",
    "id_grado_persona": 1,
    "id_tipo_persona": 2,
    "imagen_perfil_url_persona": "https://example.com/photo.jpg"
  }'

# Respuesta
{
  "success": true,
  "message": "Persona creada exitosamente",
  "data": {
    "id_persona": 10,
    "nombre_persona": "Juan",
    "apellido_persona": "Pérez",
    "nombre_grado_persona": "Doctor",
    "acronimo_grado_persona": "Dr.",
    "nombre_tipo_persona": "Académico"
  }
}
```

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

## 🛠️ Tecnologías y Dependencias

### Frontend (React)
```json
{
  "react": "^19.1.0",           // Biblioteca principal UI
  "react-dom": "^19.1.0",       // Renderizado DOM
  "react-router-dom": "^6.30.1", // Navegación SPA
  "axios": "^1.6.0",            // Cliente HTTP
  "react-icons": "^4.12.0",     // Iconografía
  "vite": "^7.0.4"              // Build tool y dev server
}
```

### Backend (Node.js)
```json
{
  "express": "^5.1.0",          // Framework web
  "mysql2": "^3.14.2",          // Driver MySQL con Promise
  "dotenv": "^17.2.0",          // Variables de entorno
  "morgan": "^1.10.0",          // Logging HTTP
  "nodemon": "^3.1.10"          // Auto-restart en desarrollo
}
```

### Infraestructura
- **Docker**: Contenedor MySQL 8.0
- **Docker Compose**: Orquestación de servicios
- **Google Fonts**: Tipografías Barlow
- **Git**: Control de versiones

### Funcionalidades Clave Implementadas

#### 🎨 Sistema de Diseño
- Variables CSS centralizadas
- Paleta de colores corporativa ABH
- Tipografías Barlow responsive
- Componentes UI reutilizables
- Animaciones y transiciones

#### 🔌 API RESTful
- CRUD completo para personas
- Validación de datos
- Manejo de errores consistente
- Respuestas JSON estructuradas
- Variables de entorno

#### 📊 Base de Datos
- Esquema normalizado ABH
- Datos de seed realistas
- Backups automatizados
- Migraciones futuras
- Contenedor Docker

#### 🖥️ Frontend Moderno
- Single Page Application
- Estado global con hooks
- Componentes modulares
- Responsive design
- Estados de carga y error

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
