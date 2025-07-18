@echo off
REM Script de gestión de base de datos ABH para Windows
REM Academia Boliviana de Historia Militar - Sistema de gestión de BD

setlocal enabledelayedexpansion

REM Configuración
set DB_HOST=localhost
set DB_PORT=3307
set DB_USER=abh_user
set DB_PASSWORD=abh_password
set DB_NAME=abhm
set DB_ROOT_PASSWORD=admin123
set BACKUP_DIR=.\db\backups

REM Comandos del sistema
set DOCKER_CMD=docker
set DOCKER_COMPOSE_CMD=docker-compose
set DOCKER_INTERACTIVE=docker

REM Crear timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set TIMESTAMP=%dt:~0,4%%dt:~4,2%%dt:~6,2%_%dt:~8,2%%dt:~10,2%%dt:~12,2%

REM Colores para Windows (usando echo con colores básicos)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "NC=[0m"

REM Funciones de salida
:echo_success
echo %GREEN%✅ %~1%NC%
goto :eof

:echo_error
echo %RED%❌ %~1%NC%
goto :eof

:echo_info
echo %YELLOW%🔍 %~1%NC%
goto :eof

REM Función para verificar si Docker está corriendo
:check_docker
%DOCKER_CMD% info >nul 2>&1
if errorlevel 1 (
    call :echo_error "Docker no está corriendo"
    call :echo_info "Asegúrate de que Docker Desktop esté iniciado"
    exit /b 1
)
goto :eof

REM Función para crear directorio de backups
:create_backup_dir
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"
goto :eof

REM Función para iniciar la base de datos
:start_db
call :echo_info "Iniciando base de datos MySQL..."
%DOCKER_COMPOSE_CMD% up -d db
if errorlevel 1 (
    call :echo_error "Error al iniciar la base de datos"
    exit /b 1
)
call :echo_success "Base de datos iniciada"
goto :eof

REM Función para detener la base de datos
:stop_db
call :echo_info "Deteniendo base de datos MySQL..."
%DOCKER_COMPOSE_CMD% down
if errorlevel 1 (
    call :echo_error "Error al detener la base de datos"
    exit /b 1
)
call :echo_success "Base de datos detenida"
goto :eof

REM Función para verificar el estado de la base de datos
:status_db
call :echo_info "Verificando estado de la base de datos..."
%DOCKER_COMPOSE_CMD% ps db
goto :eof

REM Función para hacer backup de la base de datos
:backup_db
call :echo_info "Creando backup de la base de datos..."

REM Crear directorio de backups si no existe
call :create_backup_dir

REM Nombre del archivo de backup
set BACKUP_FILE=%BACKUP_DIR%\backup_%TIMESTAMP%.sql

REM Ejecutar mysqldump dentro del contenedor
%DOCKER_CMD% exec abh_mysql mysqldump -u root -p%DB_ROOT_PASSWORD% %DB_NAME% > "%BACKUP_FILE%"

if errorlevel 1 (
    call :echo_error "Error al crear el backup"
    exit /b 1
)

call :echo_success "Backup creado exitosamente: %BACKUP_FILE%"

REM Copiar como latest_backup.sql
copy "%BACKUP_FILE%" "%BACKUP_DIR%\latest_backup.sql" >nul

REM Limpiar backups antiguos
call :cleanup_old_backups

call :echo_success "Backup gestionado correctamente"
goto :eof

REM Función para limpiar backups antiguos
:cleanup_old_backups
REM Mantener solo los últimos 5 backups
set count=0
for /f "delims=" %%f in ('dir /b /o-d "%BACKUP_DIR%\backup_*.sql" 2^>nul') do (
    set /a count+=1
    if !count! gtr 5 (
        del "%BACKUP_DIR%\%%f" >nul 2>&1
    )
)
goto :eof

REM Función para restaurar backup
:restore_db
if "%~1"=="" (
    call :echo_error "Debe especificar el archivo de backup"
    echo Uso: %~nx0 restore ^<archivo_backup.sql^>
    echo Ejemplo: %~nx0 restore .\db\backups\backup_20240101_120000.sql
    echo O usar el último backup: %~nx0 restore .\db\backups\latest_backup.sql
    exit /b 1
)

set BACKUP_FILE=%~1

if not exist "%BACKUP_FILE%" (
    call :echo_error "El archivo de backup no existe: %BACKUP_FILE%"
    exit /b 1
)

call :echo_info "Restaurando backup: %BACKUP_FILE%"

REM Restaurar la base de datos
%DOCKER_CMD% exec -i abh_mysql mysql -u root -p%DB_ROOT_PASSWORD% %DB_NAME% < "%BACKUP_FILE%"

if errorlevel 1 (
    call :echo_error "Error al restaurar el backup"
    exit /b 1
)

call :echo_success "Backup restaurado exitosamente"
goto :eof

REM Función para conectarse a la base de datos
:connect_db
call :echo_info "Conectando a la base de datos MySQL..."
%DOCKER_INTERACTIVE% exec -it abh_mysql mysql -u %DB_USER% -p%DB_PASSWORD% %DB_NAME%
goto :eof

REM Función para ver logs de la base de datos
:logs_db
call :echo_info "Mostrando logs de la base de datos..."
%DOCKER_COMPOSE_CMD% logs -f db
goto :eof

REM Función para reiniciar completamente la base de datos
:reset_db
call :echo_info "⚠️  Reiniciando completamente la base de datos..."
set /p confirm="¿Está seguro? Esto eliminará todos los datos actuales (y/n): "
if /i "%confirm%"=="y" (
    %DOCKER_COMPOSE_CMD% down
    %DOCKER_CMD% volume rm abh_db_data 2>nul
    %DOCKER_COMPOSE_CMD% up -d db
    call :echo_success "Base de datos reiniciada completamente"
) else (
    call :echo_info "Operación cancelada"
)
goto :eof

REM Función para mostrar ayuda
:show_help
echo Gestor de Base de Datos ABH - Windows
echo Academia Boliviana de Historia Militar
echo Uso: %~nx0 [comando]
echo.
echo Comandos disponibles:
echo   start      - Iniciar la base de datos
echo   stop       - Detener la base de datos
echo   status     - Verificar estado de la base de datos
echo   backup     - Crear backup de la base de datos
echo   restore    - Restaurar backup (requiere archivo)
echo   connect    - Conectar a la base de datos
echo   logs       - Ver logs de la base de datos
echo   reset      - Reiniciar completamente la base de datos
echo   help       - Mostrar esta ayuda
echo.
echo Ejemplos:
echo   %~nx0 start
echo   %~nx0 backup
echo   %~nx0 restore .\db\backups\backup_20240101_120000.sql
echo   %~nx0 restore .\db\backups\latest_backup.sql
echo   %~nx0 connect
echo.
echo Sistema: Windows
goto :eof

REM Verificar Docker
call :check_docker

REM Procesamiento de argumentos
if "%~1"=="start" (
    call :start_db
) else if "%~1"=="stop" (
    call :stop_db
) else if "%~1"=="status" (
    call :status_db
) else if "%~1"=="backup" (
    call :backup_db
) else if "%~1"=="restore" (
    call :restore_db "%~2"
) else if "%~1"=="connect" (
    call :connect_db
) else if "%~1"=="logs" (
    call :logs_db
) else if "%~1"=="reset" (
    call :reset_db
) else if "%~1"=="help" (
    call :show_help
) else if "%~1"=="--help" (
    call :show_help
) else if "%~1"=="-h" (
    call :show_help
) else (
    call :echo_error "Comando no reconocido: %~1"
    call :show_help
    exit /b 1
)