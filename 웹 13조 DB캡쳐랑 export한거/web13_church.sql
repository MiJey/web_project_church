-- MySQL dump 10.13  Distrib 5.7.19, for Win64 (x86_64)
--
-- Host: localhost    Database: church
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES UTF8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `freeboard`
--

DROP TABLE IF EXISTS `freeboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `freeboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `written` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freeboard`
--

LOCK TABLES `freeboard` WRITE;
/*!40000 ALTER TABLE `freeboard` DISABLE KEYS */;
INSERT INTO `freeboard` VALUES (3,'admin','관리자','asdf','adfs','2017-12-22 01:21:05','2017-12-22 01:21:05',0),(4,'admin','관리자','effefefefe','efefe','2017-12-22 01:57:54','2017-12-22 01:57:54',0),(5,'admin','관리자','아무말','아무말이다','2017-12-22 07:10:30','2017-12-22 07:10:30',0);
/*!40000 ALTER TABLE `freeboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission1`
--

DROP TABLE IF EXISTS `mission1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mission1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `written` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission1`
--

LOCK TABLES `mission1` WRITE;
/*!40000 ALTER TABLE `mission1` DISABLE KEYS */;
INSERT INTO `mission1` VALUES (1,'admin','관리자','8hiuihiu','www','2017-12-22 05:52:32','2017-12-22 05:52:32',12),(2,'admin','관리자','ㅇㅇㅇ','히히헤헤','2017-12-22 16:49:59','2017-12-22 16:49:59',4);
/*!40000 ALTER TABLE `mission1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission2`
--

DROP TABLE IF EXISTS `mission2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mission2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `written` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission2`
--

LOCK TABLES `mission2` WRITE;
/*!40000 ALTER TABLE `mission2` DISABLE KEYS */;
INSERT INTO `mission2` VALUES (1,'admin','관리자','국내선교 글쓰기 테스트','ㅎㅇㅎㅇㅇ','2017-12-22 06:14:02','2017-12-22 06:14:02',0);
/*!40000 ALTER TABLE `mission2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `written` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'admin','관리자','공지합니다','내일까지 과제','2017-12-22 07:10:20','2017-12-22 07:10:20',2);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tvboard`
--

DROP TABLE IF EXISTS `tvboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tvboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `written` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tvboard`
--

LOCK TABLES `tvboard` WRITE;
/*!40000 ALTER TABLE `tvboard` DISABLE KEYS */;
INSERT INTO `tvboard` VALUES (1,'admin','관리자','12월 첫째주 목사님 말씀','테스ㅡ트','2017-12-22 07:03:44','2017-12-22 07:03:44',0),(2,'admin','관리자','ㅁㅁㅁ','ㅁㅁㅁㅁ','2017-12-22 12:35:18','2017-12-22 12:35:18',0),(3,'admin','관리자','ㅁㅁㄴㅁㄹㄹ안녕하세요','ㅎㅇ','2017-12-22 17:10:36','2017-12-22 17:10:36',2);
/*!40000 ALTER TABLE `tvboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` tinyint(4) NOT NULL DEFAULT '0',
  `userid` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `birth` date NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,3,'admin','$2a$10$E1c49a/.7I9tH5gEvMopauLngEVNetX6SIpnDSAGkyct25aVcUpMu','관리자','2017-01-01','010-0000-0000','admin@email.com'),(3,0,'hong','$2a$10$l26RD2THYWRHF.86wPA8se6.4vVzTn9n6GicQswT8uuwPcwtRhSxO','홍길동','1997-02-21','010-0000-0000',''),(4,1,'갸아아악','$2a$10$D8cncJ1DX2gotEfgo5G2W.k.em5hQy83/dk9QMmxDxhjbSwCL3jXy','갸아악','1998-11-11','010-1245-1545',''),(5,1,'ㅁㄹㄴㄷㄴㄻ','$2a$10$9Qbk71HxB2yEMSJ7S.gRe.TQnT0e4g390Fzsj.RJSgzv0xBZVSTH2','김영남','7996-10-28','010-3940-1028','bunpilgaroo@naver.com'),(6,1,'yeji','$2a$10$QoGi3wF4mGL/VRzkPbOfUO2LhDjMdOGwjpvyFnk5vOMWph3I.Lnha','문예지','1997-02-21','010-2322-2222','');
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

-- Dump completed on 2017-12-23 10:26:55
