@echo off
REM Script para gestionar la base de datos ABH en Windows
REM Configuración
set DB_HOST=localhost
set DB_PORT=3307
set DB_USER=abh_user
set DB_PASSWORD=abh_password
set DB_NAME=abhm
set DB_ROOT_PASSWORD=admin123
set BACKUP_DIR=.\db\backups

REM Generar timestamp
for /f "tokens=1-6 delims=/ : " %%a in ('echo %date% %time%') do set TIMESTAMP=%%c%%a%%b_%%d%%e%%f
set TIMESTAMP=%TIMESTAMP: =0%

REM Función para mostrar mensajes con colores
:echo_success
echo [92m✅ %~1[0m
goto :eof

:echo_error
echo [91m❌ %~1[0m
goto :eof

:echo_info
echo [93m🔍 %~1[0m
goto :eof

REM Función para verificar si Docker está corriendo
:check_docker
docker info >nul 2>&1
if %errorlevel% neq 0 (
    call :echo_error Docker no está corriendo
    exit /b 1
)
goto :eof

REM Función para iniciar la base de datos
:start_db
call :echo_info Iniciando base de datos MySQL...
docker start abh_mysql
if %errorlevel% equ 0 (
    call :echo_success Base de datos iniciada
) else (
    call :echo_error Error al iniciar la base de datos
    exit /b 1
)
goto :eof

REM Función para detener la base de datos
:stop_db
call :echo_info Deteniendo base de datos MySQL...
docker stop abh_mysql
if %errorlevel% equ 0 (
    call :echo_success Base de datos detenida
) else (
    call :echo_error Error al detener la base de datos
    exit /b 1
)
goto :eof

REM Función para verificar el estado de la base de datos
:status_db
call :echo_info Verificando estado de la base de datos...
docker ps -f name=abh_mysql
goto :eof

REM Función para hacer backup de la base de datos
:backup_db
call :echo_info Creando backup de la base de datos...

REM Crear directorio de backups si no existe
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM Nombre del archivo de backup
set BACKUP_FILE=%BACKUP_DIR%\backup_%TIMESTAMP%.sql

REM Ejecutar mysqldump dentro del contenedor
docker exec abh_mysql mysqldump -u root -p%DB_ROOT_PASSWORD% %DB_NAME% > "%BACKUP_FILE%"

if %errorlevel% equ 0 (
    call :echo_success Backup creado exitosamente: %BACKUP_FILE%
    
    REM Crear copia como latest_backup.sql
    copy "%BACKUP_FILE%" "%BACKUP_DIR%\latest_backup.sql" >nul
    
    REM Mantener solo los últimos 5 backups
    for /f "skip=5 delims=" %%i in ('dir /b /o-d "%BACKUP_DIR%\backup_*.sql" 2^>nul') do (
        del "%BACKUP_DIR%\%%i" >nul 2>&1
    )
    
    call :echo_success Backup gestionado correctamente
) else (
    call :echo_error Error al crear el backup
    exit /b 1
)
goto :eof

REM Función para restaurar backup
:restore_db
if "%~2"=="" (
    call :echo_error Debe especificar el archivo de backup
    echo Uso: %~nx0 restore ^<archivo_backup.sql^>
    exit /b 1
)

set BACKUP_FILE=%~2

if not exist "%BACKUP_FILE%" (
    call :echo_error El archivo de backup no existe: %BACKUP_FILE%
    exit /b 1
)

call :echo_info Restaurando backup: %BACKUP_FILE%

REM Restaurar la base de datos
docker exec -i abh_mysql mysql -u root -p%DB_ROOT_PASSWORD% %DB_NAME% < "%BACKUP_FILE%"

if %errorlevel% equ 0 (
    call :echo_success Backup restaurado exitosamente
) else (
    call :echo_error Error al restaurar el backup
    exit /b 1
)
goto :eof

REM Función para conectarse a la base de datos
:connect_db
call :echo_info Conectando a la base de datos MySQL...
docker exec -it abh_mysql mysql -u %DB_USER% -p%DB_PASSWORD% %DB_NAME%
goto :eof

REM Función para ver logs de la base de datos
:logs_db
call :echo_info Mostrando logs de la base de datos...
docker logs -f abh_mysql
goto :eof

REM Función para reiniciar completamente la base de datos
:reset_db
call :echo_info ⚠️  Reiniciando completamente la base de datos...
set /p confirm="¿Está seguro? Esto eliminará todos los datos actuales (y/n): "
if /i "%confirm%"=="y" (
    docker stop abh_mysql
    docker rm abh_mysql
    docker volume rm abh_db_data 2>nul
    docker run -d --name abh_mysql -e MYSQL_ROOT_PASSWORD=%DB_ROOT_PASSWORD% -e MYSQL_DATABASE=%DB_NAME% -e MYSQL_USER=%DB_USER% -e MYSQL_PASSWORD=%DB_PASSWORD% -p %DB_PORT%:3306 -v abh_db_data:/var/lib/mysql mysql:8.0
    call :echo_success Base de datos reiniciada completamente
) else (
    call :echo_info Operación cancelada
)
goto :eof

REM Función para mostrar ayuda
:show_help
echo Gestor de Base de Datos ABH
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
echo   %~nx0 connect
goto :eof

REM Verificar Docker
call :check_docker
if %errorlevel% neq 0 exit /b 1

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
    call :restore_db %1 %2
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
) else if "%~1"=="" (
    call :show_help
) else (
    call :echo_error Comando no reconocido: %~1
    call :show_help
    exit /b 1
)