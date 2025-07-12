-- Datos de ejemplo para la base de datos ABH

-- Tipos de documento
INSERT INTO Tipo_Documento (nombre) VALUES 
('Artículo Científico'),
('Tesis'),
('Informe de Investigación'),
('Reporte Técnico'),
('Ensayo Académico');

-- Tipos de persona
INSERT INTO Tipo_Persona (nombre) VALUES 
('Académico'),
('Investigador'),
('Estudiante'),
('Profesor'),
('Director');

-- Grados de persona
INSERT INTO Grado_Persona (nombre, acronimo) VALUES 
('Doctor', 'Dr.'),
('Licenciado', 'Lic.'),
('Magister', 'Mg.'),
('Ingeniero', 'Ing.'),
('Bachiller', 'Bach.');

-- Tipos académicos
INSERT INTO Tipo_Academico (nombre) VALUES 
('Numerario'),
('Correspondiente'),
('Honorario'),
('Visitante'),
('Emérito');

-- Tipos de actividad
INSERT INTO Tipo_Actividad (nombre) VALUES 
('Conferencia'),
('Seminario'),
('Taller'),
('Congreso'),
('Simposio');

-- Cargos
INSERT INTO Cargo (nombre) VALUES 
('Presidente'),
('Vicepresidente'),
('Secretario'),
('Tesorero'),
('Vocal');

-- Redes sociales
INSERT INTO Red_Social (direccion_url, nombre) VALUES 
('https://facebook.com/academia', 'Facebook'),
('https://twitter.com/academia', 'Twitter'),
('https://instagram.com/academia', 'Instagram'),
('https://linkedin.com/academia', 'LinkedIn');

-- Academia principal
INSERT INTO Academia (nombre, mision, vision, historia, horario, email, telefono) VALUES 
('Academia Boliviana de Historia', 
 'Promover la investigación y divulgación de la historia boliviana',
 'Ser la institución líder en investigación histórica en Bolivia',
 'Fundada en 1929, la Academia Boliviana de Historia es una institución...',
 'Lunes a Viernes 9:00 - 17:00',
 'info@abh.bo',
 '+591 2 2345678');

-- Filiales
INSERT INTO Filial (id_academia, nombre, descripcion) VALUES 
(1, 'Filial La Paz', 'Filial principal ubicada en La Paz'),
(1, 'Filial Cochabamba', 'Filial regional de Cochabamba'),
(1, 'Filial Santa Cruz', 'Filial regional de Santa Cruz');

-- Personas de ejemplo
INSERT INTO Persona (id_grado, id_tipo_persona, nombre, apellido, imagen_perfil_url) VALUES 
(1, 1, 'Juan Carlos', 'Mendoza López', 'https://example.com/imagen1.jpg'),
(2, 2, 'María Elena', 'Vásquez Rojas', 'https://example.com/imagen2.jpg'),
(3, 3, 'Roberto', 'Gutiérrez Paz', 'https://example.com/imagen3.jpg'),
(4, 4, 'Ana Lucia', 'Morales Jiménez', 'https://example.com/imagen4.jpg'),
(5, 5, 'Carlos Alberto', 'Fernández Silva', 'https://example.com/imagen5.jpg');

-- Académicos
INSERT INTO Academico (id_persona, id_tipo_academico, estado) VALUES 
(1, 1, 'Activo'),
(2, 2, 'Activo'),
(3, 3, 'Activo'),
(4, 4, 'Activo'),
(5, 5, 'Activo');

-- Directiva
INSERT INTO Directiva (id_persona, id_cargo, id_filial) VALUES 
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 2),
(5, 5, 3);

-- Libros de ejemplo
INSERT INTO Libro (id_persona, estado, isbn, observaciones, codigo, titulo, deposito_legal, descripcion_acceso, estante, fecha_publicacion, imagen_portada_url) VALUES 
(1, 'Disponible', '978-3-16-148410-0', 'Primera edición', 'LIB001', 'Historia de Bolivia Colonial', 'DL-001-2023', 'Acceso libre', 'A1', '2023-01-15', 'https://example.com/libro1.jpg'),
(2, 'Disponible', '978-3-16-148410-1', 'Segunda edición', 'LIB002', 'La Guerra del Chaco', 'DL-002-2023', 'Acceso libre', 'A2', '2023-02-20', 'https://example.com/libro2.jpg');

-- Documentos de ejemplo
INSERT INTO Documento (id_tipo_documento, id_persona, descripcion_acceso, descripcion, fecha_publicacion, imagen_url, titulo) VALUES 
(1, 1, 'Acceso libre', 'Análisis histórico del período colonial', '2023-03-10', 'https://example.com/doc1.jpg', 'El Período Colonial en Bolivia'),
(2, 2, 'Acceso restringido', 'Tesis doctoral sobre la Guerra del Chaco', '2023-04-15', 'https://example.com/doc2.jpg', 'Análisis Militar de la Guerra del Chaco');

-- Actividades de ejemplo
INSERT INTO Actividad (id_tipo_actividad, titulo, descripcion, fecha, imagen_url) VALUES 
(1, 'Conferencia sobre Historia Colonial', 'Conferencia magistral sobre el período colonial boliviano', '2023-05-20', 'https://example.com/act1.jpg'),
(2, 'Seminario de Investigación', 'Seminario sobre metodología de investigación histórica', '2023-06-15', 'https://example.com/act2.jpg');

-- Mensajes de contacto de ejemplo
INSERT INTO Mensaje_Contacto (fecha_envio, mensaje, email_remitente, nombre_remitente) VALUES 
('2023-07-01', 'Interesado en conocer más sobre la academia', 'juan@example.com', 'Juan Pérez'),
('2023-07-05', 'Consulta sobre publicaciones disponibles', 'maria@example.com', 'María González');

-- Relación academia-redes sociales
INSERT INTO Academia_Red_Social (id_academia, id_red_social) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4);

-- Recorridos virtuales
INSERT INTO Recorrido_virtual (imagen_url, titulo, descripcion) VALUES 
('https://example.com/recorrido1.jpg', 'Biblioteca Principal', 'Recorrido virtual por la biblioteca principal de la academia'),
('https://example.com/recorrido2.jpg', 'Salón de Conferencias', 'Tour virtual del salón de conferencias histórico');

-- Logs de ejemplo
INSERT INTO Logs (id_persona, descripcion, tabla_modificada, fecha_ingreso, tipo_evento, direccion_ip, sistema_operativo) VALUES 
(1, 'Creación de nuevo libro', 'Libro', '2023-08-01', 'CREATE', '192.168.1.100', 'Linux'),
(2, 'Actualización de perfil', 'Persona', '2023-08-02', 'UPDATE', '192.168.1.101', 'Windows');
