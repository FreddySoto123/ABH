-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: abhm
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Academia`
--

DROP TABLE IF EXISTS `Academia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Academia` (
  `id_academia` int NOT NULL AUTO_INCREMENT,
  `nombre_academia` varchar(255) DEFAULT NULL,
  `mision_academia` text,
  `vision_academia` text,
  `historia_academia` text,
  `horario_academia` varchar(255) DEFAULT NULL,
  `email_academia` varchar(255) DEFAULT NULL,
  `telefono_academia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_academia`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Academia`
--

LOCK TABLES `Academia` WRITE;
/*!40000 ALTER TABLE `Academia` DISABLE KEYS */;
INSERT INTO `Academia` VALUES (1,'Academia Boliviana de Historia Militar','\"La Academia Boliviana de Historia Militar coordina y fomenta la investigación historiográfica en las FF.AA. con rigor documental y bases científicas, durante todo el proceso de formación, capacitación y especialización militar, para crear la cultura histórica, cívica y patriótica en el personal militar, a fin de formar ciudadanos con identificación y conciencia nacional y alto compromiso con la Patria, aptos para defenderla y apoyar activa  y decididamente a su desarrollo\".','\"La Academia Boliviana de Historia Militar, deberá constituirse en un plazo inmediato, mediato y en el futuro, en el Centro de Estudio de la Historia Militar  de las FF.AA, único y con responsabilidad en el establecimiento y manejo de los objetivos, políticas, estrategias y acciones en los campos culturales e históricos. Siendo además asesor y coordinador con la Universidad de las FF.AA. en materia de historia y geografía, en los diferentes niveles de formación, capacitación y especialización, asimismo ser el ente rector en la implementación manejo y conservación de los Museos y Bibliotecas en las FF.AA. del Estado\".','La creaciÃ³n de la Academia Boliviana de Historia Militar fue una de las necesidades mÃ¡s sentidas de la cultura nacional y de la vida de las Fuerzas Armadas. Esa necesidad era repetidamente postergada por diversos factores que se oponÃ­an al conocimiento de la realidad de nuestra NaciÃ³n. Ese objetivo fue satisfecho hace 33 aÃ±os de acuerdo a la iniciativa de destacados historiadores militares y civiles y, finalmente, se hizo realidad por el gobierno del General David Padilla Arancibia, el 16 de mayo de 1979. Desde entonces esta ilustre Academia registra un progreso ininterrumpido y ha formado una plÃ©ya de historiadores. EstÃ¡ revisando y poniendo de pie la historia boliviana, descubriendo la verdad y la esencia de su proceso vital, dentro del cual las Fuerzas Armadas tuvieron innegable participaciÃ³n.','Lunes a Viernes: 09:00 a 12:00','info@academiadehistorialmilita.r.com','(+591) 65164240');
/*!40000 ALTER TABLE `Academia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Academia_Red_Social`
--

DROP TABLE IF EXISTS `Academia_Red_Social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Academia_Red_Social` (
  `id_academia` int NOT NULL,
  `id_red_social` int NOT NULL,
  PRIMARY KEY (`id_academia`,`id_red_social`),
  KEY `id_red_social` (`id_red_social`),
  CONSTRAINT `Academia_Red_Social_ibfk_1` FOREIGN KEY (`id_academia`) REFERENCES `Academia` (`id_academia`),
  CONSTRAINT `Academia_Red_Social_ibfk_2` FOREIGN KEY (`id_red_social`) REFERENCES `Red_Social` (`id_red_social`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Academia_Red_Social`
--

LOCK TABLES `Academia_Red_Social` WRITE;
/*!40000 ALTER TABLE `Academia_Red_Social` DISABLE KEYS */;
INSERT INTO `Academia_Red_Social` VALUES (1,1),(1,2),(1,3),(1,4);
/*!40000 ALTER TABLE `Academia_Red_Social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Academico`
--

DROP TABLE IF EXISTS `Academico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Academico` (
  `id_academico` int NOT NULL AUTO_INCREMENT,
  `id_persona` int DEFAULT NULL,
  `id_tipo_academico` int DEFAULT NULL,
  `estado_academico` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_academico`),
  KEY `id_persona` (`id_persona`),
  KEY `id_tipo_academico` (`id_tipo_academico`),
  CONSTRAINT `Academico_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id_persona`),
  CONSTRAINT `Academico_ibfk_2` FOREIGN KEY (`id_tipo_academico`) REFERENCES `Tipo_Academico` (`id_tipo_academico`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Academico`
--

LOCK TABLES `Academico` WRITE;
/*!40000 ALTER TABLE `Academico` DISABLE KEYS */;
INSERT INTO `Academico` VALUES (1,2,1,'Activo'),(2,2,2,'Activo'),(3,2,3,'Activo'),(4,2,4,'Activo'),(5,2,5,'Activo');
/*!40000 ALTER TABLE `Academico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Actividad`
--

DROP TABLE IF EXISTS `Actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Actividad` (
  `id_actividad` int NOT NULL AUTO_INCREMENT,
  `id_tipo_actividad` int DEFAULT NULL,
  `titulo_actividad` varchar(255) DEFAULT NULL,
  `descripcion_actividad` text,
  `fecha_actividad` date DEFAULT NULL,
  `imagen_url_actividad` text,
  PRIMARY KEY (`id_actividad`),
  KEY `id_tipo_actividad` (`id_tipo_actividad`),
  CONSTRAINT `Actividad_ibfk_1` FOREIGN KEY (`id_tipo_actividad`) REFERENCES `Tipo_Actividad` (`id_tipo_actividad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Actividad`
--

LOCK TABLES `Actividad` WRITE;
/*!40000 ALTER TABLE `Actividad` DISABLE KEYS */;
INSERT INTO `Actividad` VALUES (1,3,'Conferencia magistral sobre la historia del Palacio Goitia','Conferencia magistral dedicada a la historia arquitectÃ³nica, institucional y cultural del emblemÃ¡tico Palacio Goitia, a cargo del Dr. Armando Cordero.','2025-04-05','https://example.com/palacio_goitia_conferencia.jpg'),(2,1,'El Sitio de BoquerÃ³n: Estrategia y Resistencia','Actividad cultural sobre la estrategia y resistencia en el Sitio de BoquerÃ³n.','2025-06-21','https://example.com/boqueron_actividad.jpg'),(3,2,'Evento Oficial: El Sitio de BoquerÃ³n','Evento oficial conmemorativo sobre el Sitio de BoquerÃ³n.','2025-06-21','https://example.com/boqueron_evento_oficial.jpg');
/*!40000 ALTER TABLE `Actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cargo`
--

DROP TABLE IF EXISTS `Cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cargo` (
  `id_cargo` int NOT NULL AUTO_INCREMENT,
  `nombre_cargo` varchar(255) NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cargo`
--

LOCK TABLES `Cargo` WRITE;
/*!40000 ALTER TABLE `Cargo` DISABLE KEYS */;
INSERT INTO `Cargo` VALUES (1,'Director General'),(2,'Subdirector'),(3,'Secretario AcadÃ©mico'),(4,'Tesorero');
/*!40000 ALTER TABLE `Cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Directiva`
--

DROP TABLE IF EXISTS `Directiva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Directiva` (
  `id_directiva` int NOT NULL AUTO_INCREMENT,
  `id_persona` int DEFAULT NULL,
  `id_cargo` int DEFAULT NULL,
  `id_filial` int DEFAULT NULL,
  PRIMARY KEY (`id_directiva`),
  KEY `id_persona` (`id_persona`),
  KEY `id_cargo` (`id_cargo`),
  KEY `id_filial` (`id_filial`),
  CONSTRAINT `Directiva_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id_persona`),
  CONSTRAINT `Directiva_ibfk_2` FOREIGN KEY (`id_cargo`) REFERENCES `Cargo` (`id_cargo`),
  CONSTRAINT `Directiva_ibfk_3` FOREIGN KEY (`id_filial`) REFERENCES `Filial` (`id_filial`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Directiva`
--

LOCK TABLES `Directiva` WRITE;
/*!40000 ALTER TABLE `Directiva` DISABLE KEYS */;
INSERT INTO `Directiva` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,1,2),(5,1,2,2),(6,1,3,2),(7,1,1,3),(8,1,2,3),(9,1,3,3);
/*!40000 ALTER TABLE `Directiva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Documento`
--

DROP TABLE IF EXISTS `Documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documento` (
  `id_documento` int NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int DEFAULT NULL,
  `id_persona` int DEFAULT NULL,
  `descripcion_acceso_documento` text,
  `descripcion_documento` text,
  `fecha_publicacion_documento` date DEFAULT NULL,
  `imagen_url_documento` text,
  `titulo_documento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_documento`),
  KEY `id_tipo_documento` (`id_tipo_documento`),
  KEY `id_persona` (`id_persona`),
  CONSTRAINT `Documento_ibfk_1` FOREIGN KEY (`id_tipo_documento`) REFERENCES `Tipo_Documento` (`id_tipo_documento`),
  CONSTRAINT `Documento_ibfk_2` FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documento`
--

LOCK TABLES `Documento` WRITE;
/*!40000 ALTER TABLE `Documento` DISABLE KEYS */;
INSERT INTO `Documento` VALUES (1,2,4,'Ya disponible para lectura virtual en la Biblioteca Digital de la ABHM.','PublicaciÃ³n digital del libro \"Los 7 Mariscales de Bolivia\"','2025-06-21','https://example.com/7_mariscales_bolivia_doc.jpg','PublicaciÃ³n digital del libro \"Los 7 Mariscales de Bolivia\"'),(2,3,4,'Ya disponible para consulta en la Biblioteca de la ABHM.','Estrategia y Resistencia','2025-06-21','https://example.com/boqueron_estrategia_resistencia_doc.jpg','El Sitio de BoquerÃ³n: Estrategia y Resistencia'),(3,4,4,'Resumen de actividades del aÃ±o pasado y objetivos para fortalecer la academia en 2024.','Resumen Anual y Retos','2025-06-21','https://example.com/gaceta_academica_01.jpg','EdiciÃ³n NÂ°01 - Enero 2024: Resumen Anual y Retos'),(4,5,3,'Ya disponible para consulta en la Biblioteca de la ABHM.','Carta de DonaciÃ³n del Archivo Goitia','2023-11-05','https://example.com/carta_donacion_goitia.jpg','Carta de DonaciÃ³n del Archivo Goitia'),(5,6,NULL,NULL,'ResoluciÃ³n genÃ©rica de ejemplo.','2025-01-15',NULL,'ResoluciÃ³n Interna 001/2025');
/*!40000 ALTER TABLE `Documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Filial`
--

DROP TABLE IF EXISTS `Filial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Filial` (
  `id_filial` int NOT NULL AUTO_INCREMENT,
  `id_academia` int DEFAULT NULL,
  `nombre_filial` varchar(255) DEFAULT NULL,
  `descripcion_filial` text,
  PRIMARY KEY (`id_filial`),
  KEY `id_academia` (`id_academia`),
  CONSTRAINT `Filial_ibfk_1` FOREIGN KEY (`id_academia`) REFERENCES `Academia` (`id_academia`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Filial`
--

LOCK TABLES `Filial` WRITE;
/*!40000 ALTER TABLE `Filial` DISABLE KEYS */;
INSERT INTO `Filial` VALUES (1,1,'La Paz','Sede principal de la Academia Boliviana de Historia Militar.'),(2,1,'Cochabamba','Filial Cochabamba de la Academia Boliviana de Historia Militar, ubicada en C. SantivaÃ±ez 4373.'),(3,1,'Santa Cruz','Filial Santa Cruz de la Sierra de la Academia Boliviana de Historia Militar, ubicada en C. Bolivar 402.');
/*!40000 ALTER TABLE `Filial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grado_Persona`
--

DROP TABLE IF EXISTS `Grado_Persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Grado_Persona` (
  `id_grado_persona` int NOT NULL AUTO_INCREMENT,
  `nombre_grado_persona` varchar(255) NOT NULL,
  `acronimo_grado_persona` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_grado_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grado_Persona`
--

LOCK TABLES `Grado_Persona` WRITE;
/*!40000 ALTER TABLE `Grado_Persona` DISABLE KEYS */;
INSERT INTO `Grado_Persona` VALUES (1,'Doctor','Dr.'),(2,'Licenciado','Lic.'),(3,'Coronel','Cnl.'),(4,'Mayor','My.'),(5,'General','Gral.'),(6,'Brigadier AÃ©reo','Brig. AÃ©.'),(7,'Doctor EmÃ©rito','Dr. EmÃ©rito');
/*!40000 ALTER TABLE `Grado_Persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Libro`
--

DROP TABLE IF EXISTS `Libro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Libro` (
  `id_libro` int NOT NULL AUTO_INCREMENT,
  `id_persona` int DEFAULT NULL,
  `estado_libro` varchar(255) DEFAULT NULL,
  `isbn_libro` varchar(255) DEFAULT NULL,
  `observaciones_libro` text,
  `codigo_libro` varchar(255) DEFAULT NULL,
  `titulo_libro` varchar(255) DEFAULT NULL,
  `deposito_legal_libro` varchar(255) DEFAULT NULL,
  `descripcion_acceso_libro` text,
  `estante_libro` varchar(255) DEFAULT NULL,
  `fecha_publicacion_libro` date DEFAULT NULL,
  `imagen_portada_url_libro` text,
  PRIMARY KEY (`id_libro`),
  KEY `id_persona` (`id_persona`),
  CONSTRAINT `Libro_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Libro`
--

LOCK TABLES `Libro` WRITE;
/*!40000 ALTER TABLE `Libro` DISABLE KEYS */;
INSERT INTO `Libro` VALUES (1,4,'Disponible','978189485613',NULL,'A26805 - 4','El Sitio de BoquerÃ³n: Estrategia y Resistencia','3-1-595-20','Ya disponible para consulta en la Biblioteca de la ABHM.','A - 4','2024-01-01','https://example.com/boqueron_estrategia_resistencia.jpg'),(2,4,'Disponible',NULL,NULL,NULL,'Los 7 Mariscales de Bolivia',NULL,'Ya disponible para lectura virtual en la Biblioteca Digital de la ABHM.',NULL,'2025-06-21','https://example.com/7_mariscales_bolivia.jpg'),(3,4,'Disponible',NULL,NULL,'A26805-4','Guerras de Bolivia',NULL,'Ya disponible para consulta en la Biblioteca de la ABHM.',NULL,'2024-01-01','https://example.com/guerras_bolivia.jpg');
/*!40000 ALTER TABLE `Libro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logs`
--

DROP TABLE IF EXISTS `Logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logs` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `id_persona` int DEFAULT NULL,
  `descripcion_log` text,
  `tabla_modificada_log` varchar(255) DEFAULT NULL,
  `fecha_ingreso_log` date DEFAULT NULL,
  `tipo_evento_log` varchar(255) DEFAULT NULL,
  `direccion_ip_log` varchar(255) DEFAULT NULL,
  `sistema_operativo_log` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_log`),
  KEY `id_persona` (`id_persona`),
  CONSTRAINT `Logs_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logs`
--

LOCK TABLES `Logs` WRITE;
/*!40000 ALTER TABLE `Logs` DISABLE KEYS */;
INSERT INTO `Logs` VALUES (1,1,'Acceso a la secciÃ³n de directiva','Directiva','2025-07-12','Acceso','192.168.1.100','Windows 10');
/*!40000 ALTER TABLE `Logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mensaje_Contacto`
--

DROP TABLE IF EXISTS `Mensaje_Contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mensaje_Contacto` (
  `id_mensaje_contacto` int NOT NULL AUTO_INCREMENT,
  `fecha_envio_mensaje_contacto` date DEFAULT NULL,
  `mensaje_mensaje_contacto` text,
  `email_remitente_mensaje_contacto` varchar(255) DEFAULT NULL,
  `nombre_remitente_mensaje_contacto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_mensaje_contacto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mensaje_Contacto`
--

LOCK TABLES `Mensaje_Contacto` WRITE;
/*!40000 ALTER TABLE `Mensaje_Contacto` DISABLE KEYS */;
INSERT INTO `Mensaje_Contacto` VALUES (1,'2025-07-12','Me gustarÃ­a obtener mÃ¡s informaciÃ³n sobre las actividades de la academia.','interesado@email.com','Juan PÃ©rez');
/*!40000 ALTER TABLE `Mensaje_Contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Persona`
--

DROP TABLE IF EXISTS `Persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Persona` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `id_grado_persona` int DEFAULT NULL,
  `id_tipo_persona` int DEFAULT NULL,
  `nombre_persona` varchar(255) DEFAULT NULL,
  `apellido_persona` varchar(255) DEFAULT NULL,
  `imagen_perfil_url_persona` text,
  PRIMARY KEY (`id_persona`),
  KEY `id_grado_persona` (`id_grado_persona`),
  KEY `id_tipo_persona` (`id_tipo_persona`),
  CONSTRAINT `Persona_ibfk_1` FOREIGN KEY (`id_grado_persona`) REFERENCES `Grado_Persona` (`id_grado_persona`),
  CONSTRAINT `Persona_ibfk_2` FOREIGN KEY (`id_tipo_persona`) REFERENCES `Tipo_Persona` (`id_tipo_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Persona`
--

LOCK TABLES `Persona` WRITE;
/*!40000 ALTER TABLE `Persona` DISABLE KEYS */;
INSERT INTO `Persona` VALUES (1,1,3,'Hugo Esteban','Rivero Camacho','https://example.com/hugo_rivero.jpg'),(2,7,2,'Daniel','Zamora CÃ©spedes','https://example.com/daniel_zamora.jpg'),(3,2,1,'Carolina','Gonzales','https://example.com/carolina_gonzales.jpg'),(4,NULL,1,'Jorge','Abastoflor Frey','https://example.com/jorge_abastoflor.jpg'),(5,1,4,'Armando','Cordero','https://example.com/armando_cordero.jpg'),(6,6,3,'Ernesto','Camacho Hurtado','https://example.com/ernesto_camacho.jpg'),(7,5,3,'Enrique','Vidaurre Retamoz','https://example.com/enrique_vidaurre.jpg'),(8,3,3,'Fransisco','Barrero Urquid','https://example.com/fransisco_barrero.jpg'),(9,4,3,'Alfonso','Arana Gandarillas','https://example.com/alfonso_arana.jpg'),(10,1,1,'Jesus','Soto','https://sitechecker.pro/wp-content/uploads/2023/05/URL-meaning.jpg'),(11,6,1,'Jebus hola','Soto','https://sitechecker.pro/wp-content/uploads/2023/05/URL-meaning.jpg');
/*!40000 ALTER TABLE `Persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recorrido_virtual`
--

DROP TABLE IF EXISTS `Recorrido_virtual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recorrido_virtual` (
  `id_recorrido_virtual` int NOT NULL AUTO_INCREMENT,
  `imagen_url_recorrido_virtual` text,
  `titulo_recorrido_virtual` varchar(255) DEFAULT NULL,
  `descripcion_recorrido_virtual` text,
  PRIMARY KEY (`id_recorrido_virtual`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recorrido_virtual`
--

LOCK TABLES `Recorrido_virtual` WRITE;
/*!40000 ALTER TABLE `Recorrido_virtual` DISABLE KEYS */;
INSERT INTO `Recorrido_virtual` VALUES (1,'https://example.com/recorrido_museo.jpg','Recorrido Virtual del Museo ABHM','Explora la colecciÃ³n del Museo y una selecciÃ³n de objetos de manera virtual con toda la informaciÃ³n disponible. Incluye visitas guiadas con tours de audio.');
/*!40000 ALTER TABLE `Recorrido_virtual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Red_Social`
--

DROP TABLE IF EXISTS `Red_Social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Red_Social` (
  `id_red_social` int NOT NULL AUTO_INCREMENT,
  `direccion_url_red_social` text NOT NULL,
  `nombre_red_social` varchar(255) NOT NULL,
  PRIMARY KEY (`id_red_social`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Red_Social`
--

LOCK TABLES `Red_Social` WRITE;
/*!40000 ALTER TABLE `Red_Social` DISABLE KEYS */;
INSERT INTO `Red_Social` VALUES (1,'https://www.facebook.com/ABHM.Oficial','Facebook'),(2,'https://www.instagram.com/ABHM.Oficial','Instagram'),(3,'https://www.youtube.com/ABHM.Oficial','YouTube'),(4,'https://wa.me/59165164240','WhatsApp');
/*!40000 ALTER TABLE `Red_Social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tipo_Academico`
--

DROP TABLE IF EXISTS `Tipo_Academico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tipo_Academico` (
  `id_tipo_academico` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo_academico` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_academico`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tipo_Academico`
--

LOCK TABLES `Tipo_Academico` WRITE;
/*!40000 ALTER TABLE `Tipo_Academico` DISABLE KEYS */;
INSERT INTO `Tipo_Academico` VALUES (1,'Honorario'),(2,'De NÃºmero'),(3,'Consultor'),(4,'Postulante'),(5,'Aspirante');
/*!40000 ALTER TABLE `Tipo_Academico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tipo_Actividad`
--

DROP TABLE IF EXISTS `Tipo_Actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tipo_Actividad` (
  `id_tipo_actividad` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo_actividad` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_actividad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tipo_Actividad`
--

LOCK TABLES `Tipo_Actividad` WRITE;
/*!40000 ALTER TABLE `Tipo_Actividad` DISABLE KEYS */;
INSERT INTO `Tipo_Actividad` VALUES (1,'Cultural'),(2,'Oficial'),(3,'Conferencia');
/*!40000 ALTER TABLE `Tipo_Actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tipo_Documento`
--

DROP TABLE IF EXISTS `Tipo_Documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tipo_Documento` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo_documento` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tipo_Documento`
--

LOCK TABLES `Tipo_Documento` WRITE;
/*!40000 ALTER TABLE `Tipo_Documento` DISABLE KEYS */;
INSERT INTO `Tipo_Documento` VALUES (1,'Libro'),(2,'Publicacion Oficial'),(3,'Trabajo Historico'),(4,'Gaceta Academica'),(5,'Otro Documento'),(6,'Resolucion');
/*!40000 ALTER TABLE `Tipo_Documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tipo_Persona`
--

DROP TABLE IF EXISTS `Tipo_Persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tipo_Persona` (
  `id_tipo_persona` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo_persona` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tipo_Persona`
--

LOCK TABLES `Tipo_Persona` WRITE;
/*!40000 ALTER TABLE `Tipo_Persona` DISABLE KEYS */;
INSERT INTO `Tipo_Persona` VALUES (1,'Autor'),(2,'Academico'),(3,'Directivo'),(4,'Orador');
/*!40000 ALTER TABLE `Tipo_Persona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-18  1:15:01
