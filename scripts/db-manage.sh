#!/bin/bash

# Script para gestionar la base de datos ABH
# Configuración
DB_HOST="localhost"
DB_PORT="3307"
DB_USER="abh_user"
DB_PASSWORD="abh_password"
DB_NAME="mi_base_de_datos"
DB_ROOT_PASSWORD="admin123"
BACKUP_DIR="./db/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo_info() {
    echo -e "${YELLOW}🔍 $1${NC}"
}

# Función para verificar si Docker está corriendo
check_docker() {
    if ! sudo docker info &> /dev/null; then
        echo_error "Docker no está corriendo"
        exit 1
    fi
}

# Función para iniciar la base de datos
start_db() {
    echo_info "Iniciando base de datos MySQL..."
    sudo docker-compose up -d db
    echo_success "Base de datos iniciada"
}

# Función para detener la base de datos
stop_db() {
    echo_info "Deteniendo base de datos MySQL..."
    sudo docker-compose down
    echo_success "Base de datos detenida"
}

# Función para verificar el estado de la base de datos
status_db() {
    echo_info "Verificando estado de la base de datos..."
    sudo docker-compose ps db
}

# Función para hacer backup de la base de datos
backup_db() {
    echo_info "Creando backup de la base de datos..."
    
    # Crear directorio de backups si no existe
    mkdir -p "$BACKUP_DIR"
    
    # Nombre del archivo de backup
    BACKUP_FILE="$BACKUP_DIR/backup_${TIMESTAMP}.sql"
    
    # Ejecutar mysqldump dentro del contenedor
    sudo docker exec abh_mysql mysqldump -u root -p$DB_ROOT_PASSWORD $DB_NAME > "$BACKUP_FILE"
    
    if [ $? -eq 0 ]; then
        echo_success "Backup creado exitosamente: $BACKUP_FILE"
        
        # Crear enlace simbólico al backup más reciente
        ln -sf "backup_${TIMESTAMP}.sql" "$BACKUP_DIR/latest_backup.sql"
        
        # Mantener solo los últimos 5 backups
        ls -t "$BACKUP_DIR"/backup_*.sql 2>/dev/null | tail -n +6 | xargs -r rm
        
        echo_success "Backup gestionado correctamente"
    else
        echo_error "Error al crear el backup"
        exit 1
    fi
}

# Función para restaurar backup
restore_db() {
    if [ -z "$1" ]; then
        echo_error "Debe especificar el archivo de backup"
        echo "Uso: $0 restore <archivo_backup.sql>"
        exit 1
    fi
    
    BACKUP_FILE="$1"
    
    if [ ! -f "$BACKUP_FILE" ]; then
        echo_error "El archivo de backup no existe: $BACKUP_FILE"
        exit 1
    fi
    
    echo_info "Restaurando backup: $BACKUP_FILE"
    
    # Restaurar la base de datos
    sudo docker exec -i abh_mysql mysql -u root -p$DB_ROOT_PASSWORD $DB_NAME < "$BACKUP_FILE"
    
    if [ $? -eq 0 ]; then
        echo_success "Backup restaurado exitosamente"
    else
        echo_error "Error al restaurar el backup"
        exit 1
    fi
}

# Función para conectarse a la base de datos
connect_db() {
    echo_info "Conectando a la base de datos MySQL..."
    sudo docker exec -it abh_mysql mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME
}

# Función para ver logs de la base de datos
logs_db() {
    echo_info "Mostrando logs de la base de datos..."
    sudo docker-compose logs -f db
}

# Función para reiniciar completamente la base de datos
reset_db() {
    echo_info "⚠️  Reiniciando completamente la base de datos..."
    read -p "¿Está seguro? Esto eliminará todos los datos actuales (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo docker-compose down
        sudo docker volume rm abh_db_data 2>/dev/null || true
        sudo docker-compose up -d db
        echo_success "Base de datos reiniciada completamente"
    else
        echo_info "Operación cancelada"
    fi
}

# Función para mostrar ayuda
show_help() {
    echo "Gestor de Base de Datos ABH"
    echo "Uso: $0 [comando]"
    echo
    echo "Comandos disponibles:"
    echo "  start      - Iniciar la base de datos"
    echo "  stop       - Detener la base de datos"
    echo "  status     - Verificar estado de la base de datos"
    echo "  backup     - Crear backup de la base de datos"
    echo "  restore    - Restaurar backup (requiere archivo)"
    echo "  connect    - Conectar a la base de datos"
    echo "  logs       - Ver logs de la base de datos"
    echo "  reset      - Reiniciar completamente la base de datos"
    echo "  help       - Mostrar esta ayuda"
    echo
    echo "Ejemplos:"
    echo "  $0 start"
    echo "  $0 backup"
    echo "  $0 restore ./db/backups/backup_20240101_120000.sql"
    echo "  $0 connect"
}

# Verificar Docker
check_docker

# Procesamiento de argumentos
case "$1" in
    "start")
        start_db
        ;;
    "stop")
        stop_db
        ;;
    "status")
        status_db
        ;;
    "backup")
        backup_db
        ;;
    "restore")
        restore_db "$2"
        ;;
    "connect")
        connect_db
        ;;
    "logs")
        logs_db
        ;;
    "reset")
        reset_db
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        echo_error "Comando no reconocido: $1"
        show_help
        exit 1
        ;;
esac
