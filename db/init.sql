CREATE DATABASE IF NOT EXISTS mi_base_de_datos;
USE mi_base_de_datos;

-- ===================== TIPO TABLAS =====================

CREATE TABLE Tipo_Documento (
    id_tipo_documento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Tipo_Persona (
    id_tipo_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Grado_Persona (
    id_grado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    acronimo VARCHAR(50)
);

CREATE TABLE Tipo_Academico (
    id_tipo_academico INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Tipo_Actividad (
    id_tipo_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Cargo (
    id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Red_Social (
    id_red_social INT AUTO_INCREMENT PRIMARY KEY,
    direccion_url TEXT NOT NULL,
    nombre VARCHAR(255) NOT NULL
);

-- ===================== TABLAS BASE =====================

CREATE TABLE Persona (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    id_grado INT,
    id_tipo_persona INT,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    imagen_perfil_url TEXT,
    FOREIGN KEY (id_grado) REFERENCES Grado_Persona(id_grado),
    FOREIGN KEY (id_tipo_persona) REFERENCES Tipo_Persona(id_tipo_persona)
);

CREATE TABLE Libro (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    estado VARCHAR(255),
    isbn VARCHAR(255),
    observaciones TEXT,
    codigo VARCHAR(255),
    titulo VARCHAR(255),
    deposito_legal VARCHAR(255),
    descripcion_acceso TEXT,
    estante VARCHAR(255),
    fecha_publicacion DATE,
    imagen_portada_url TEXT,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

CREATE TABLE Documento (
    id_documento INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_documento INT,
    id_persona INT,
    descripcion_acceso TEXT,
    descripcion TEXT,
    fecha_publicacion DATE,
    imagen_url TEXT,
    titulo VARCHAR(255),
    FOREIGN KEY (id_tipo_documento) REFERENCES Tipo_Documento(id_tipo_documento),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

CREATE TABLE Logs (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    descripcion TEXT,
    tabla_modificada VARCHAR(255),
    fecha_ingreso DATE,
    tipo_evento VARCHAR(255),
    direccion_ip VARCHAR(255),
    sistema_operativo VARCHAR(255),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

CREATE TABLE Academico (
    id_academico INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT,
    id_tipo_academico INT,
    estado VARCHAR(255),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_tipo_academico) REFERENCES Tipo_Academico(id_tipo_academico)
);

CREATE TABLE Academia (
    id_academia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    mision TEXT,
    vision TEXT,
    historia TEXT,
    horario VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(50)
);

CREATE TABLE Filial (
    id_filial INT AUTO_INCREMENT PRIMARY KEY,
    id_academia INT,
    nombre VARCHAR(255),
    descripcion TEXT,
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
    fecha_envio DATE,
    mensaje TEXT,
    email_remitente VARCHAR(255),
    nombre_remitente VARCHAR(255)
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
    titulo VARCHAR(255),
    descripcion TEXT,
    fecha DATE,
    imagen_url TEXT,
    FOREIGN KEY (id_tipo_actividad) REFERENCES Tipo_Actividad(id_tipo_actividad)
);

CREATE TABLE Recorrido_virtual (
    id_recorrido_virtual INT AUTO_INCREMENT PRIMARY KEY,
    imagen_url TEXT,
    titulo VARCHAR(255),
    descripcion TEXT
);