import { createConnection } from 'mysql2/promise';
import { readFileSync, writeFileSync } from 'fs';
import { DB_CONFIG } from '../server/config.js';

// Función para hacer backup de la base de datos
export async function backupDatabase() {
    try {
        console.log('🔄 Iniciando backup de la base de datos...');
        
        const connection = await createConnection(DB_CONFIG);
        
        // Obtener todas las tablas
        const [tables] = await connection.execute('SHOW TABLES');
        const tableNames = tables.map(table => Object.values(table)[0]);
        
        let backupSQL = `-- Backup de la base de datos ABH\n-- Fecha: ${new Date().toISOString()}\n\n`;
        backupSQL += `USE ${DB_CONFIG.database};\n\n`;
        backupSQL += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;
        
        // Hacer backup de cada tabla
        for (const tableName of tableNames) {
            console.log(`📁 Haciendo backup de tabla: ${tableName}`);
            
            // Estructura de la tabla
            const [createTable] = await connection.execute(`SHOW CREATE TABLE ${tableName}`);
            backupSQL += `-- Estructura de la tabla ${tableName}\n`;
            backupSQL += `DROP TABLE IF EXISTS ${tableName};\n`;
            backupSQL += `${createTable[0]['Create Table']};\n\n`;
            
            // Datos de la tabla
            const [rows] = await connection.execute(`SELECT * FROM ${tableName}`);
            
            if (rows.length > 0) {
                backupSQL += `-- Datos de la tabla ${tableName}\n`;
                
                // Obtener columnas
                const [columns] = await connection.execute(`SHOW COLUMNS FROM ${tableName}`);
                const columnNames = columns.map(col => col.Field);
                
                backupSQL += `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES\n`;
                
                const values = rows.map(row => {
                    const rowValues = columnNames.map(col => {
                        const value = row[col];
                        if (value === null) return 'NULL';
                        if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
                        if (value instanceof Date) return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
                        return value;
                    });
                    return `(${rowValues.join(', ')})`;\n                });\n                \n                backupSQL += values.join(',\\n');\n                backupSQL += ';\\n\\n';\n            }\n        }\n        \n        backupSQL += `SET FOREIGN_KEY_CHECKS = 1;\\n`;\n        \n        // Guardar el archivo de backup\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const filename = `backup_${timestamp}.sql`;\n        const filepath = `./db/backups/${filename}`;\n        \n        writeFileSync(filepath, backupSQL);\n        \n        await connection.end();\n        \n        console.log(`✅ Backup completado: ${filepath}`);\n        return filepath;\n        \n    } catch (error) {\n        console.error('❌ Error durante el backup:', error.message);\n        throw error;\n    }\n}\n\n// Función para restaurar la base de datos\nexport async function restoreDatabase(backupFile) {\n    try {\n        console.log(`🔄 Restaurando base de datos desde: ${backupFile}`);\n        \n        const connection = await createConnection({\n            ...DB_CONFIG,\n            multipleStatements: true\n        });\n        \n        const sql = readFileSync(backupFile, 'utf8');\n        \n        // Ejecutar el SQL de restauración\n        await connection.execute(sql);\n        \n        await connection.end();\n        \n        console.log('✅ Base de datos restaurada exitosamente');\n        \n    } catch (error) {\n        console.error('❌ Error durante la restauración:', error.message);\n        throw error;\n    }\n}\n\n// Función para sincronizar datos entre desarrolladores\nexport async function syncDatabase() {\n    try {\n        console.log('🔄 Sincronizando base de datos...');\n        \n        // Hacer backup actual\n        const backupFile = await backupDatabase();\n        \n        console.log('✅ Sincronización completada');\n        console.log('📝 Archivo de backup creado:', backupFile);\n        console.log('💡 Para aplicar cambios, otros desarrolladores deben:');\n        console.log('   1. Hacer pull del repositorio');\n        console.log('   2. Ejecutar: docker-compose down && docker-compose up -d');\n        \n        return backupFile;\n        \n    } catch (error) {\n        console.error('❌ Error durante la sincronización:', error.message);\n        throw error;\n    }\n}\n\n// Si se ejecuta directamente el script\nif (import.meta.url === `file://${process.argv[1]}`) {\n    const command = process.argv[2];\n    \n    switch (command) {\n        case 'backup':\n            await backupDatabase();\n            break;\n        case 'restore':\n            const backupFile = process.argv[3];\n            if (!backupFile) {\n                console.error('❌ Especifica el archivo de backup');\n                console.log('Uso: node backup_restore.js restore <archivo_backup>');\n                process.exit(1);\n            }\n            await restoreDatabase(backupFile);\n            break;\n        case 'sync':\n            await syncDatabase();\n            break;\n        default:\n            console.log('Comandos disponibles:');\n            console.log('  backup - Hacer backup de la base de datos');\n            console.log('  restore <archivo> - Restaurar desde un backup');\n            console.log('  sync - Sincronizar base de datos');\n            break;\n    }\n}"
