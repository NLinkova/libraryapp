-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: popularbooks
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `authorID` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `nationality` varchar(30) NOT NULL,
  `birthYear` int unsigned NOT NULL,
  `deathYear` int unsigned DEFAULT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Miguel','de Cervantes Saavedra','Spanish',1547,1616),(2,'Charles','Dickens','British',1812,1870),(3,'J.R.R.','Tolkien','British',1892,1973),(4,'Antoine','de Saint-Exupery','French',1900,1944),(5,'J.K.','Rowling','British',1965,NULL),(6,'Agatha','Christie','British',1890,1976),(7,'Cao','Xueqin','Chinese',1715,1763),(8,'Henry',' Rider Haggard','British',1856,1925),(9,'C.S.','Lewis','British',1898,1963),(10,'Fedor','Dostoevsky','Russian',1832,1877),(11,'Mihail','Bulgakov','Russian',1877,1939);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bookID` int unsigned NOT NULL AUTO_INCREMENT,
  `bookTitle` varchar(255) NOT NULL,
  `originalTitle` varchar(255) DEFAULT NULL,
  `yearofPublication` int DEFAULT NULL,
  `genre` varchar(30) DEFAULT NULL,
  `millionsSold` int DEFAULT NULL,
  `languageWritten` varchar(30) DEFAULT NULL,
  `coverImagePath` varchar(255) DEFAULT NULL,
  `authorID` int unsigned NOT NULL,
  PRIMARY KEY (`bookID`),
  KEY `fk_author` (`authorID`),
  CONSTRAINT `fk_author` FOREIGN KEY (`authorID`) REFERENCES `author` (`authorID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Don Quixote','El Ingenioso Hidalgo Don Quixote de la Mancha',1605,'Novel',500,'Spanish','./images/don.jpg',1),(2,'A Tale of Two Cities','A Tale of Two Cities',1859,'Historical Fiction',200,'English','./images/a-tale.jpg',2),(3,'The Lord of the Rings','The Lord of the Rings',1954,'Fantasy/Adventure',150,'English','./images/lord.jpg',3),(4,'The Litle Prince','Le Petit Prince',1943,'Fable',142,'French','',4),(5,'Harry Potter and the Sorcerer\'s Stone','Harry Potter and the Sorcerer\'s Stone',1997,'Fantasy Fiction',107,'English','',5),(6,'And Then There Were None','Ten Little Niggers',1939,'Mystery',100,'English','',6),(7,'The Dream of the Red Chamber','The Story of the Stone',1792,'Novel',100,'Chinese','',7),(8,'The Hobbit ','There and Back Again',1937,'High Fantasy',100,'English','',3),(9,'She: A History of Adventure','She',1886,'Fiction',100,'English','',8),(10,'The Lion, the Witch and the Wardrobe','The Lion, the Witch and the Wardrobe',1950,'Fantasy',85,'English ','',9),(33,'Test','Test',2132,'Fiction',5,'English','.&#x2F;images&#x2F;a-tale.jpg',6),(39,'Test33','Test',3333,'Fiction',3,'English','./images/lord.jpg',8);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookplot`
--

DROP TABLE IF EXISTS `bookplot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookplot` (
  `bookPlotID` int unsigned NOT NULL AUTO_INCREMENT,
  `plot` blob NOT NULL,
  `plotSource` varchar(255) NOT NULL,
  `bookID` int unsigned NOT NULL,
  PRIMARY KEY (`bookPlotID`),
  KEY `fk_bookID_P` (`bookID`),
  CONSTRAINT `fk_bookID_P` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookplot`
--

LOCK TABLES `bookplot` WRITE;
/*!40000 ALTER TABLE `bookplot` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookplot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changeLogID` int unsigned NOT NULL AUTO_INCREMENT,
  `dateCreated` date NOT NULL,
  `dateChanged` date DEFAULT NULL,
  `bookID` int unsigned NOT NULL,
  `userID` int unsigned NOT NULL,
  PRIMARY KEY (`changeLogID`),
  KEY `fk_bookID_C` (`bookID`),
  KEY `fk_userID_C` (`userID`),
  CONSTRAINT `fk_bookID_C` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userID_C` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (1,'2021-11-24',NULL,1,1),(2,'2021-11-24',NULL,1,1),(3,'2021-11-24',NULL,2,1),(4,'2021-11-24',NULL,3,1),(5,'2021-11-24',NULL,4,1),(6,'2021-11-24',NULL,5,1),(7,'2021-11-24',NULL,6,1),(8,'2021-11-24',NULL,7,1),(9,'2021-11-24',NULL,8,1),(10,'2021-11-24',NULL,9,1),(11,'2021-11-24',NULL,10,1),(14,'2021-11-24','2021-11-26',33,1),(16,'2021-11-25',NULL,39,2);
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessRights` varchar(200) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nat','L','ddf@ffg.ffsg','Nat','$2b$06$I87rZRJX0Jq7Erw0n/d/AeM8O1MgTWOE5GYvbzsM4D47YteuSvqYy','admin'),(2,'Rose','R','xxx@dfh.gy','Rose','$2b$06$MjqFKyVYdo5Auau6u2/9iOi7DPNm04XtkBGIY/eP8ftsvo9izng5W','user'),(7,'Robert','Stark','sgs@fgd.vf','Rob','$2b$06$YfmhPsTYz8P9jog/9CefW.Ed.MkGjwIjlHGPSX0.j3fS.9.Llym1y','user'),(10,'Rick','Stark','sd@sdf.df','Stark','$2b$06$33tO2DISJBd0UDPggbT.N.yppUCRKO4Vx160fmL4AhwPdQmHePWhK','user'),(11,'Kate','Stark','wda@dfg.kl','Kate','$2b$06$PqlahiSeaPYR5phQpW5EiO4hD02Oua2M8mB.e6npVUUpMGkSgOIRu','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-26 21:07:29
