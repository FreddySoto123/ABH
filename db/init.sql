CREATE DATABASE IF NOT EXISTS abhm;
USE abhm;

-- Crear usuario si no existe y otorgar permisos
CREATE USER IF NOT EXISTS 'abh_user'@'%' IDENTIFIED BY 'abh_password';
GRANT ALL PRIVILEGES ON abhm.* TO 'abh_user'@'%';
FLUSH PRIVILEGES;

-- ===================== TIPO TABLAS =====================

CREATE TABLE Tipo_Documento (
    id_tipo_documento INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_documento VARCHAR(255) NOT NULL
);

CREATE TABLE Tipo_Persona (
    id_tipo_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_persona VARCHAR(255) NOT NULL
);

CREATE TABLE Grado_Persona (
    id_grado_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre_grado_persona VARCHAR(255) NOT NULL,
    acronimo_grado_persona VARCHAR(50)
);

CREATE TABLE Tipo_Academico (
    id_tipo_academico INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_academico VARCHAR(255) NOT NULL
);

CREATE TABLE Tipo_Actividad (
    id_tipo_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_actividad VARCHAR(255) NOT NULL
);

CREATE TABLE Cargo (
    id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cargo VARCHAR(255) NOT NULL
);

CREATE TABLE Red_Social (
    id_red_social INT AUTO_INCREMENT PRIMARY KEY,
    direccion_url_red_social TEXT NOT NULL,
    nombre_red_social VARCHAR(255) NOT NULL
);

-- ===================== TABLAS BASE =====================

CREATE TABLE Persona (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    id_grado_persona INT,
    id_tipo_persona INT,
    nombre_persona VARCHAR(255),
    apellido_persona VARCHAR(255),
    imagen_perfil_url_persona TEXT,
    FOREIGN KEY (id_grado_persona) REFERENCES Grado_Persona(id_grado_persona),
    FOREIGN KEY (id_tipo_persona) REFERENCES Tipo_Persona(id_tipo_persona)
);

CREATE TABLE Libro (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    estado_libro VARCHAR(255),
    isbn_libro VARCHAR(255),
    observaciones_libro TEXT,
    codigo_libro VARCHAR(255),
    titulo_libro VARCHAR(255),
    deposito_legal_libro VARCHAR(255),
    descripcion_acceso_libro TEXT,
    estante_libro VARCHAR(255),
    fecha_publicacion_libro DATE,
    imagen_portada_url_libro TEXT,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

CREATE TABLE Documento (
    id_documento INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_documento INT,
    id_persona INT,
    descripcion_acceso_documento TEXT,
    descripcion_documento TEXT,
    fecha_publicacion_documento DATE,
    imagen_url_documento TEXT,
    titulo_documento VARCHAR(255),
    FOREIGN KEY (id_tipo_documento) REFERENCES Tipo_Documento(id_tipo_documento),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

CREATE TABLE Logs (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    descripcion_log TEXT,
    tabla_modificada_log VARCHAR(255),
    fecha_ingreso_log DATE,
    tipo_evento_log VARCHAR(255),
    direccion_ip_log VARCHAR(255),
    sistema_operativo_log VARCHAR(255),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

CREATE TABLE Academico (
    id_academico INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    id_tipo_academico INT,
    estado_academico VARCHAR(255),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_tipo_academico) REFERENCES Tipo_Academico(id_tipo_academico)
);

CREATE TABLE Academia (
    id_academia INT AUTO_INCREMENT PRIMARY KEY,
    nombre_academia VARCHAR(255),
    mision_academia TEXT,
    vision_academia TEXT,
    historia_academia TEXT,
    horario_academia VARCHAR(255),
    email_academia VARCHAR(255),
    telefono_academia VARCHAR(50)
);

CREATE TABLE Filial (
    id_filial INT AUTO_INCREMENT PRIMARY KEY,
    id_academia INT,
    nombre_filial VARCHAR(255),
    descripcion_filial TEXT,
    FOREIGN KEY (id_academia) REFERENCES Academia(id_academia)
);

CREATE TABLE Directiva (
    id_directiva INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    id_cargo INT,
    id_filial INT,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_cargo) REFERENCES Cargo(id_cargo),
    FOREIGN KEY (id_filial) REFERENCES Filial(id_filial)
);

CREATE TABLE Mensaje_Contacto (
    id_mensaje_contacto INT AUTO_INCREMENT PRIMARY KEY,
    fecha_envio_mensaje_contacto DATE,
    mensaje_mensaje_contacto TEXT,
    email_remitente_mensaje_contacto VARCHAR(255),
    nombre_remitente_mensaje_contacto VARCHAR(255)
);

CREATE TABLE Academia_Red_Social (
    id_academia INT,
    id_red_social INT,
    PRIMARY KEY (id_academia, id_red_social),
    FOREIGN KEY (id_academia) REFERENCES Academia(id_academia),
    FOREIGN KEY (id_red_social) REFERENCES Red_Social(id_red_social)
);

CREATE TABLE Actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_actividad INT,
    titulo_actividad VARCHAR(255),
    descripcion_actividad TEXT,
    fecha_actividad DATE,
    imagen_url_actividad TEXT,
    FOREIGN KEY (id_tipo_actividad) REFERENCES Tipo_Actividad(id_tipo_actividad)
);

CREATE TABLE Recorrido_virtual (
    id_recorrido_virtual INT AUTO_INCREMENT PRIMARY KEY,
    imagen_url_recorrido_virtual TEXT,
    titulo_recorrido_virtual VARCHAR(255),
    descripcion_recorrido_virtual TEXT
);