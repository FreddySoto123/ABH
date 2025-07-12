USE abhm;

-- Datos para Tipo_Documento
INSERT INTO Tipo_Documento (nombre_tipo_documento) VALUES
('Libro'),
('Publicacion Oficial'),
('Trabajo Historico'),
('Gaceta Academica'),
('Otro Documento'),
('Resolucion');

-- Datos para Tipo_Persona
INSERT INTO Tipo_Persona (nombre_tipo_persona) VALUES
('Autor'),
('Academico'),
('Directivo'),
('Orador');

-- Datos para Grado_Persona
INSERT INTO Grado_Persona (nombre_grado_persona, acronimo_grado_persona) VALUES
('Doctor', 'Dr.'),
('Licenciado', 'Lic.'),
('Coronel', 'Cnl.'),
('Mayor', 'My.'),
('General', 'Gral.'),
('Brigadier Aéreo', 'Brig. Aé.'),
('Doctor Emérito', 'Dr. Emérito');

-- Datos para Tipo_Academico
INSERT INTO Tipo_Academico (nombre_tipo_academico) VALUES
('Honorario'),
('De Número'),
('Consultor'),
('Postulante'),
('Aspirante');

-- Datos para Tipo_Actividad
INSERT INTO Tipo_Actividad (nombre_tipo_actividad) VALUES
('Cultural'),
('Oficial'),
('Conferencia');

-- Datos para Cargo
INSERT INTO Cargo (nombre_cargo) VALUES
('Director General'),
('Subdirector'),
('Secretario Académico'),
('Tesorero');

-- Datos para Red_Social
INSERT INTO Red_Social (nombre_red_social, direccion_url_red_social) VALUES
('Facebook', 'https://www.facebook.com/ABHM.Oficial'),
('Instagram', 'https://www.instagram.com/ABHM.Oficial'),
('YouTube', 'https://www.youtube.com/ABHM.Oficial'),
('WhatsApp', 'https://wa.me/59165164240');

-- Datos para Persona
INSERT INTO Persona (id_grado_persona, id_tipo_persona, nombre_persona, apellido_persona, imagen_perfil_url_persona) VALUES
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'Dr.'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Directivo'), 'Hugo Esteban', 'Rivero Camacho', 'https://example.com/hugo_rivero.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'Dr. Emérito'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Academico'), 'Daniel', 'Zamora Céspedes', 'https://example.com/daniel_zamora.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'Lic.'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Autor'), 'Carolina', 'Gonzales', 'https://example.com/carolina_gonzales.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona IS NULL), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Autor'), 'Jorge', 'Abastoflor Frey', 'https://example.com/jorge_abastoflor.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'Dr.'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Orador'), 'Armando', 'Cordero', 'https://example.com/armando_cordero.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'Brig. Aé.'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Directivo'), 'Ernesto', 'Camacho Hurtado', 'https://example.com/ernesto_camacho.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'Gral.'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Directivo'), 'Enrique', 'Vidaurre Retamoz', 'https://example.com/enrique_vidaurre.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'Cnl.'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Directivo'), 'Fransisco', 'Barrero Urquid', 'https://example.com/fransisco_barrero.jpg'),
((SELECT id_grado_persona FROM Grado_Persona WHERE acronimo_grado_persona = 'My.'), (SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = 'Directivo'), 'Alfonso', 'Arana Gandarillas', 'https://example.com/alfonso_arana.jpg');

-- Datos para Academia
INSERT INTO Academia (nombre_academia, mision_academia, vision_academia, historia_academia, horario_academia, email_academia, telefono_academia) VALUES
('Academia Boliviana de Historia Militar', 'Preservando la gloria de nuestros héroes y la grandeza de nuestra historia militar boliviana para las generaciones venideras', 'Ser la institución líder en la investigación y difusión de la historia militar boliviana.', 'La creación de la Academia Boliviana de Historia Militar fue una de las necesidades más sentidas de la cultura nacional y de la vida de las Fuerzas Armadas. Esa necesidad era repetidamente postergada por diversos factores que se oponían al conocimiento de la realidad de nuestra Nación. Ese objetivo fue satisfecho hace 33 años de acuerdo a la iniciativa de destacados historiadores militares y civiles y, finalmente, se hizo realidad por el gobierno del General David Padilla Arancibia, el 16 de mayo de 1979. Desde entonces esta ilustre Academia registra un progreso ininterrumpido y ha formado una pléya de historiadores. Está revisando y poniendo de pie la historia boliviana, descubriendo la verdad y la esencia de su proceso vital, dentro del cual las Fuerzas Armadas tuvieron innegable participación.', 'Lunes a Viernes: 09:00 a 12:00', 'info@academiadehistorialmilita.r.com', '(+591) 65164240');

-- Datos para Filial
INSERT INTO Filial (id_academia, nombre_filial, descripcion_filial) VALUES
((SELECT id_academia FROM Academia WHERE nombre_academia = 'Academia Boliviana de Historia Militar'), 'La Paz', 'Sede principal de la Academia Boliviana de Historia Militar.'),
((SELECT id_academia FROM Academia WHERE nombre_academia = 'Academia Boliviana de Historia Militar'), 'Cochabamba', 'Filial Cochabamba de la Academia Boliviana de Historia Militar, ubicada en C. Santivañez 4373.'),
((SELECT id_academia FROM Academia WHERE nombre_academia = 'Academia Boliviana de Historia Militar'), 'Santa Cruz', 'Filial Santa Cruz de la Sierra de la Academia Boliviana de Historia Militar, ubicada en C. Bolivar 402.');

-- Datos para Directiva (Ejemplos basados en el PDF)
-- Directiva Nacional
INSERT INTO Directiva (id_persona, id_cargo, id_filial) VALUES
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Director General'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'La Paz')),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Subdirector'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'La Paz')),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Secretario Académico'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'La Paz'));

-- Directiva Filial Cochabamba (asumiendo que es la misma persona para el ejemplo del PDF)
INSERT INTO Directiva (id_persona, id_cargo, id_filial) VALUES
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Director General'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'Cochabamba')),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Subdirector'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'Cochabamba')),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Secretario Académico'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'Cochabamba'));

-- Directiva Filial Santa Cruz (asumiendo que es la misma persona para el ejemplo del PDF)
INSERT INTO Directiva (id_persona, id_cargo, id_filial) VALUES
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Director General'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'Santa Cruz')),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Subdirector'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'Santa Cruz')),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), (SELECT id_cargo FROM Cargo WHERE nombre_cargo = 'Secretario Académico'), (SELECT id_filial FROM Filial WHERE nombre_filial = 'Santa Cruz'));

-- Datos para Academico
INSERT INTO Academico (id_persona, id_tipo_academico, estado_academico) VALUES
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Daniel' AND apellido_persona = 'Zamora Céspedes'), (SELECT id_tipo_academico FROM Tipo_Academico WHERE nombre_tipo_academico = 'Honorario'), 'Activo'),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Daniel' AND apellido_persona = 'Zamora Céspedes'), (SELECT id_tipo_academico FROM Tipo_Academico WHERE nombre_tipo_academico = 'De Número'), 'Activo'),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Daniel' AND apellido_persona = 'Zamora Céspedes'), (SELECT id_tipo_academico FROM Tipo_Academico WHERE nombre_tipo_academico = 'Consultor'), 'Activo'),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Daniel' AND apellido_persona = 'Zamora Céspedes'), (SELECT id_tipo_academico FROM Tipo_Academico WHERE nombre_tipo_academico = 'Postulante'), 'Activo'),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Daniel' AND apellido_persona = 'Zamora Céspedes'), (SELECT id_tipo_academico FROM Tipo_Academico WHERE nombre_tipo_academico = 'Aspirante'), 'Activo');

-- Datos para Libro
INSERT INTO Libro (id_persona, estado_libro, isbn_libro, observaciones_libro, codigo_libro, titulo_libro, deposito_legal_libro, descripcion_acceso_libro, estante_libro, fecha_publicacion_libro, imagen_portada_url_libro) VALUES
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Jorge' AND apellido_persona = 'Abastoflor Frey'), 'Disponible', '978189485613', NULL, 'A26805 - 4', 'El Sitio de Boquerón: Estrategia y Resistencia', '3-1-595-20', 'Ya disponible para consulta en la Biblioteca de la ABHM.', 'A - 4', '2024-01-01', 'https://example.com/boqueron_estrategia_resistencia.jpg'),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Jorge' AND apellido_persona = 'Abastoflor Frey'), 'Disponible', NULL, NULL, NULL, 'Los 7 Mariscales de Bolivia', NULL, 'Ya disponible para lectura virtual en la Biblioteca Digital de la ABHM.', NULL, '2025-06-21', 'https://example.com/7_mariscales_bolivia.jpg'),
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Jorge' AND apellido_persona = 'Abastoflor Frey'), 'Disponible', NULL, NULL, 'A26805-4', 'Guerras de Bolivia', NULL, 'Ya disponible para consulta en la Biblioteca de la ABHM.', NULL, '2024-01-01', 'https://example.com/guerras_bolivia.jpg');

-- Datos para Documento (Publicaciones Oficiales, Trabajos Históricos, Gacetas Académicas, Otros Documentos, Resoluciones)
INSERT INTO Documento (id_tipo_documento, id_persona, descripcion_acceso_documento, descripcion_documento, fecha_publicacion_documento, imagen_url_documento, titulo_documento) VALUES
((SELECT id_tipo_documento FROM Tipo_Documento WHERE nombre_tipo_documento = 'Publicacion Oficial'), (SELECT id_persona FROM Persona WHERE nombre_persona = 'Jorge' AND apellido_persona = 'Abastoflor Frey'), 'Ya disponible para lectura virtual en la Biblioteca Digital de la ABHM.', 'Publicación digital del libro "Los 7 Mariscales de Bolivia"', '2025-06-21', 'https://example.com/7_mariscales_bolivia_doc.jpg', 'Publicación digital del libro "Los 7 Mariscales de Bolivia"'),
((SELECT id_tipo_documento FROM Tipo_Documento WHERE nombre_tipo_documento = 'Trabajo Historico'), (SELECT id_persona FROM Persona WHERE nombre_persona = 'Jorge' AND apellido_persona = 'Abastoflor Frey'), 'Ya disponible para consulta en la Biblioteca de la ABHM.', 'Estrategia y Resistencia', '2025-06-21', 'https://example.com/boqueron_estrategia_resistencia_doc.jpg', 'El Sitio de Boquerón: Estrategia y Resistencia'),
((SELECT id_tipo_documento FROM Tipo_Documento WHERE nombre_tipo_documento = 'Gaceta Academica'), (SELECT id_persona FROM Persona WHERE nombre_persona = 'Jorge' AND apellido_persona = 'Abastoflor Frey'), 'Resumen de actividades del año pasado y objetivos para fortalecer la academia en 2024.', 'Resumen Anual y Retos', '2025-06-21', 'https://example.com/gaceta_academica_01.jpg', 'Edición N°01 - Enero 2024: Resumen Anual y Retos'),
((SELECT id_tipo_documento FROM Tipo_Documento WHERE nombre_tipo_documento = 'Otro Documento'), (SELECT id_persona FROM Persona WHERE nombre_persona = 'Carolina' AND apellido_persona = 'Gonzales'), 'Ya disponible para consulta en la Biblioteca de la ABHM.', 'Carta de Donación del Archivo Goitia', '2023-11-05', 'https://example.com/carta_donacion_goitia.jpg', 'Carta de Donación del Archivo Goitia'),
((SELECT id_tipo_documento FROM Tipo_Documento WHERE nombre_tipo_documento = 'Resolucion'), NULL, NULL, 'Resolución genérica de ejemplo.', '2025-01-15', NULL, 'Resolución Interna 001/2025');

-- Datos para Logs (Ejemplo, se generarán automáticamente en un sistema real)
INSERT INTO Logs (id_persona, descripcion_log, tabla_modificada_log, fecha_ingreso_log, tipo_evento_log, direccion_ip_log, sistema_operativo_log) VALUES
((SELECT id_persona FROM Persona WHERE nombre_persona = 'Hugo Esteban' AND apellido_persona = 'Rivero Camacho'), 'Acceso a la sección de directiva', 'Directiva', '2025-07-12', 'Acceso', '192.168.1.100', 'Windows 10');

-- Datos para Academia_Red_Social
INSERT INTO Academia_Red_Social (id_academia, id_red_social) VALUES
((SELECT id_academia FROM Academia WHERE nombre_academia = 'Academia Boliviana de Historia Militar'), (SELECT id_red_social FROM Red_Social WHERE nombre_red_social = 'Facebook')),
((SELECT id_academia FROM Academia WHERE nombre_academia = 'Academia Boliviana de Historia Militar'), (SELECT id_red_social FROM Red_Social WHERE nombre_red_social = 'Instagram')),
((SELECT id_academia FROM Academia WHERE nombre_academia = 'Academia Boliviana de Historia Militar'), (SELECT id_red_social FROM Red_Social WHERE nombre_red_social = 'YouTube')),
((SELECT id_academia FROM Academia WHERE nombre_academia = 'Academia Boliviana de Historia Militar'), (SELECT id_red_social FROM Red_Social WHERE nombre_red_social = 'WhatsApp'));

-- Datos para Actividad
INSERT INTO Actividad (id_tipo_actividad, titulo_actividad, descripcion_actividad, fecha_actividad, imagen_url_actividad) VALUES
((SELECT id_tipo_actividad FROM Tipo_Actividad WHERE nombre_tipo_actividad = 'Conferencia'), 'Conferencia magistral sobre la historia del Palacio Goitia', 'Conferencia magistral dedicada a la historia arquitectónica, institucional y cultural del emblemático Palacio Goitia, a cargo del Dr. Armando Cordero.', '2025-04-05', 'https://example.com/palacio_goitia_conferencia.jpg'),
((SELECT id_tipo_actividad FROM Tipo_Actividad WHERE nombre_tipo_actividad = 'Cultural'), 'El Sitio de Boquerón: Estrategia y Resistencia', 'Actividad cultural sobre la estrategia y resistencia en el Sitio de Boquerón.', '2025-06-21', 'https://example.com/boqueron_actividad.jpg'),
((SELECT id_tipo_actividad FROM Tipo_Actividad WHERE nombre_tipo_actividad = 'Oficial'), 'Evento Oficial: El Sitio de Boquerón', 'Evento oficial conmemorativo sobre el Sitio de Boquerón.', '2025-06-21', 'https://example.com/boqueron_evento_oficial.jpg');

-- Datos para Recorrido_virtual
INSERT INTO Recorrido_virtual (imagen_url_recorrido_virtual, titulo_recorrido_virtual, descripcion_recorrido_virtual) VALUES
('https://example.com/recorrido_museo.jpg', 'Recorrido Virtual del Museo ABHM', 'Explora la colección del Museo y una selección de objetos de manera virtual con toda la información disponible. Incluye visitas guiadas con tours de audio.');

-- Datos para Mensaje_Contacto (Ejemplo)
INSERT INTO Mensaje_Contacto (fecha_envio_mensaje_contacto, mensaje_mensaje_contacto, email_remitente_mensaje_contacto, nombre_remitente_mensaje_contacto) VALUES
('2025-07-12', 'Me gustaría obtener más información sobre las actividades de la academia.', 'interesado@email.com', 'Juan Pérez');