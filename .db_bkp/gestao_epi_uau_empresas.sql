-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: gestao_epi_uau
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RazaoSocial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Cnpj` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Endereco` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'UAU Ingleza Indústria e Comércio Ltda','12.345.678/0001-90','Av. das Indústrias, 500 - Contagem, MG','(31) 3333-4444','contato@uauingleza.com.br'),(2,'UAU Ingleza Indústria e Comércio Ltda','12.345.678/0001-90','Av. das Indústrias, 500 - Contagem, MG','(31) 3333-4444','contato@uauingleza.com.br'),(3,'UAU Ingleza Indústria e Comércio Ltda','12.345.678/0001-90','Av. das Indústrias, 500 - Contagem, MG','(31) 3333-4444','contato@uauingleza.com.br'),(4,'UAU Ingleza Indústria e Comércio Ltda','12.345.678/0001-90','Av. das Indústrias, 500 - Contagem, MG','(31) 3333-4444','contato@uauingleza.com.br'),(5,'UAU Ingleza Indústria e Comércio Ltda','12.345.678/0001-90','Av. das Indústrias, 500 - Contagem, MG','(31) 3333-4444','contato@uauingleza.com.br'),(6,'UAU Ingleza Indústria e Comércio Ltda','12.345.678/0001-90','Av. das Indústrias, 500 - Contagem, MG','(31) 3333-4444','contato@uauingleza.com.br'),(7,'Segurança Total Ltda','98.765.432/0001-12','Rua da Segurança, 123 - Belo Horizonte, MG','(31) 5555-6666','contato@segurancatotal.com.br'),(9,'Segurança Total Ltda','98.765.432/0001-12','Rua da Segurança, 123 - Belo Horizonte, MG','(31) 5555-6666','contato@segurancatotal.com.br');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-14 21:00:21
