-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: tkbsgusort
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

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
-- Table structure for table `ds_khoa`
--

DROP TABLE IF EXISTS `ds_khoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ds_khoa` (
  `id` varchar(4) NOT NULL,
  `display_name` varchar(41) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ds_khoa`
--

LOCK TABLES `ds_khoa` WRITE;
/*!40000 ALTER TABLE `ds_khoa` DISABLE KEYS */;
INSERT INTO `ds_khoa` VALUES ('CTCT','(ngành) Công nghệ thông tin'),('DV','Khoa Điện tử viễn thông'),('DVDV','(ngành) Kỹ thuật điện tử - viễn thông'),('GMGM','(ngành) Giáo dục Mầm non'),('GTGT','(ngành) Giáo dục Tiểu học'),('LC','Khoa Giáo dục chính trị'),('LCGD','(ngành) Giáo dục Chính trị'),('LULH','Luật Hành chinh (không còn dùng)'),('LULK','Luật Kinh doanh (không còn dùng)'),('LULU','(ngành) Luật'),('MIMI','(ngành) SP Mỹ thuật'),('MO','Khoa Môi trường'),('MOCM','(ngành) Công nghệ kỹ thuật môi trường'),('MOKM','(ngành) Khoa học môi trường'),('NN','Khoa Ngoại ngữ'),('NNSA','(ngành) SP Tiếng Anh'),('NNTA','(ngành) Tiếng Anh (Thương mại và du lịch)'),('NT','Khoa Nghệ thuật'),('NTNA','(ngành) Thanh nhạc'),('NTNH','(ngành) SP Âm nhạc'),('NTNT','(khoa) Nghệ thuật'),('QDQK','(ngành) Quản trị kinh doanh'),('QG','Khoa Giáo dục'),('QGQG','(ngành) Quản lý Giáo dục'),('QGTL','(ngành) Tâm lí học'),('TD','Khoa Toán - ứng dụng'),('TDTO','(ngành) SP Toán học'),('TDTU','(ngành) Toán ứng dụng'),('TE','Khoa Tài chính - Kế toán'),('TEKE','(ngành) Kế toán'),('TETN','(ngành) Tài chính - Ngân hàng'),('TN','Khoa SP Khoa học Tự nhiên'),('TNHO','(ngành) SP Hóa học'),('TNLI','(ngành) SP Vật lý'),('TNSI','(ngành) SP Sinh học'),('TT','Khoa Thư viện - Văn phòng'),('TTQV','(ngành) Quản trị văn phòng'),('TTTV','(ngành) Thư viện - Văn phòng'),('VD','Khoa Văn hóa và Du lịch'),('VDQT','(ngành) Quốc tế học'),('VDVI','(ngành) Việt Nam học (Văn hóa - Du lịch)'),('XH','Khoa SP Khoa học Xã hội'),('XHDI','(ngành) SP Địa lý'),('XHSU','(ngành) SP Lịch sử'),('XHVA','(ngành) SP Ngữ văn'),('XHXH','(khoa) SP Khoa học Xã hội');
/*!40000 ALTER TABLE `ds_khoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ds_lop`
--

DROP TABLE IF EXISTS `ds_lop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ds_lop` (
  `id` varchar(7) NOT NULL,
  `display_name` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ds_lop`
--

LOCK TABLES `ds_lop` WRITE;
/*!40000 ALTER TABLE `ds_lop` DISABLE KEYS */;
INSERT INTO `ds_lop` VALUES ('*','Lớp chung'),('DAN1201','Đại học chính quy - ngành Ngôn ngữ Anh - K.20 - Lớp 1'),('DAN1211','ĐH chính quy - ngành Ngôn ngữ Anh - K.21 - Lớp 1'),('DAN1212','ĐH chính quy - ngành Ngôn ngữ Anh - K.21 - Lớp 2'),('DAN1213','ĐH chính quy - ngành Ngôn ngữ Anh - K.21 - Lớp 3'),('DAN1214','ĐH chính quy - ngành Ngôn ngữ Anh - K.21 - Lớp 4'),('DAN1215','ĐH chính quy - ngành Ngôn ngữ Anh - K.21 - Lớp 5'),('DAN1221','ĐH chính quy - ngành Ngôn ngữ Anh - K.22 - Lớp 1'),('DAN1222','ĐH chính quy - ngành Ngôn ngữ Anh - K.22 - Lớp 2'),('DAN1223','ĐH chính quy - ngành Ngôn ngữ Anh - K.22 - Lớp 3'),('DAN1224','ĐH chính quy - ngành Ngôn ngữ Anh - K.22 - Lớp 4'),('DAN1225','ĐH chính quy - ngành Ngôn ngữ Anh - K.22 - Lớp 5'),('DAN1231','ĐH chính quy - ngành Ngôn ngữ Anh - K.23 - Lớp 1'),('DAN1232','ĐH chính quy - ngành Ngôn ngữ Anh - K.23 - Lớp 2'),('DAN1233','ĐH chính quy - ngành Ngôn ngữ Anh - K.23 - Lớp 3'),('DAN1234','ĐH chính quy - ngành Ngôn ngữ Anh - K.23 - Lớp 4'),('DAN1235','ĐH chính quy - ngành Ngôn ngữ Anh - K.23 - Lớp 5'),('DCM1201','Đại học chính quy - ngành Công nghệ Kĩ thuật Môi trường - K.20 - Lớp 1'),('DCM1211','ĐH chính quy - ngành CN Kĩ thuật Môi trường - K.21 - Lớp 1'),('DCM1221','ĐH chính quy - ngành CN Kĩ thuật Môi trường - K.22 - Lớp 1'),('DCM1231','ĐH chính quy - ngành CN Kĩ thuật Môi trường - K.23 - Lớp 1'),('DCT1201','Đại học chính quy - ngành Công nghệ thông tin - K.20 - Lớp 1'),('DCT1202','Đại học chính quy - ngành Công nghệ thông tin - K.20 - Lớp 2'),('DCT1211','ĐH chính quy - ngành Công nghệ thông tin - K.21 - Lớp 1'),('DCT1212','ĐH chính quy - ngành Công nghệ thông tin - K.21 - Lớp 2'),('DCT1213','ĐH chính quy - ngành Công nghệ thông tin - K.21 - Lớp 3'),('DCT1214','ĐH chính quy - ngành Công nghệ thông tin - K.21 - Lớp 4'),('DCT1215','ĐH chính quy - ngành Công nghệ thông tin - K.21 - Lớp 5'),('DCT1221','ĐH chính quy - ngành Công nghệ thông tin - K.22 - Lớp 1'),('DCT1222','ĐH chính quy - ngành Công nghệ thông tin - K.22 - Lớp 2'),('DCT1223','ĐH chính quy - ngành Công nghệ thông tin - K.22 - Lớp 3'),('DCT1224','ĐH chính quy - ngành Công nghệ thông tin - K.22 - Lớp 4'),('DCT1231','ĐH chính quy - ngành Công nghệ thông tin - K.23 - Lớp 1'),('DCT1232','ĐH chính quy - ngành Công nghệ thông tin - K.23 - Lớp 2'),('DCT1233','ĐH chính quy - ngành Công nghệ thông tin - K.23 - Lớp 3'),('DCT1234','ĐH chính quy - ngành Công nghệ thông tin - K.23 - Lớp 4'),('DCV1201','Đại học chính quy - ngành Công nghệ kỹ thuật điện tử - viễn thông - K.20 - Lớp 1'),('DCV1211','ĐH chính quy - ngành CN kỹ thuật điện tử - viễn thông - K.21 - Lớp 1'),('DCV1221','ĐH chính quy - ngành CN kỹ thuật điện tử - viễn thông - K.22 - Lớp 1'),('DCV1231','ĐH chính quy - ngành CN kỹ thuật điện tử - viễn thông - K.23 - Lớp 1'),('DDE1201','Đại học chính quy - ngành Kỹ thuật điện - K.20 - Lớp 1'),('DDE1211','ĐH chính quy - ngành Kỹ thuật điện - K.21 - Lớp 1'),('DDE1221','ĐH chính quy - ngành Kỹ thuật điện - K.22 - Lớp 1'),('DDE1231','ĐH chính quy - ngành Kỹ thuật điện - K.23 - Lớp 1'),('DDI1201','Đại học chính quy - ngành SP Địa lý  - K.20 - Lớp 1'),('DDI1211','ĐH chính quy - ngành SP Địa lý - K.21 - Lớp 1'),('DDI1221','ĐH chính quy - ngành SP Địa lý - K.22 - Lớp 1'),('DDI1231','ĐH chính quy - ngành SP Địa lý - K.23 - Lớp 1'),('DDL1211','ĐH chính quy - ngành Du lịch - K.21 - Lớp 1'),('DDL1221','ĐH chính quy - ngành Du lịch - K.22 - Lớp 1'),('DDL1231','ĐH chính quy - ngành Du lịch - K.23 - Lớp 1'),('DDU1231','ĐH chính quy - ngành Khoa học dữ liệu - K.23 - Lớp 1'),('DDV1201','Đại học chính quy - ngành Kỹ thuật điện tử - viễn thông - K.20 - Lớp 1'),('DDV1211','ĐH chính quy - ngành Kỹ thuật điện tử - viễn thông - K.21 - Lớp 1'),('DDV1221','ĐH chính quy - ngành Kỹ thuật điện tử - viễn thông - K.22 - Lớp 1'),('DDV1231','ĐH chính quy - ngành Kỹ thuật điện tử - viễn thông - K.23 - Lớp 1'),('DGD1201','Đại học chính quy - ngành Giáo dục Chính trị  - K.20 - Lớp 1'),('DGD1211','ĐH chính quy - ngành Giáo dục Chính trị - K.21 - Lớp 1'),('DGD1221','ĐH chính quy - ngành Giáo dục Chính trị - K.22 - Lớp 1'),('DGD1231','ĐH chính quy - ngành Giáo dục Chính trị - K.23 - Lớp 1'),('DGM1211','ĐH chính quy - ngành Giáo dục Mầm non - K.21 - Lớp 1'),('DGM1212','ĐH chính quy - ngành Giáo dục Mầm non - K.21 - Lớp 2'),('DGM1221','ĐH chính quy - ngành Giáo dục Mầm non - K.22 - Lớp 1'),('DGM1222','ĐH chính quy - ngành Giáo dục Mầm non - K.22 - Lớp 2'),('DGM1231','ĐH chính quy - ngành Giáo dục Mầm non - K.23 - Lớp 1'),('DGM1232','ĐH chính quy - ngành Giáo dục Mầm non - K.23 - Lớp 2'),('DGT1201','Đại học chính quy - ngành Giáo dục Tiểu học - K.20 - Lớp 1'),('DGT1211','ĐH chính quy - ngành Giáo dục Tiểu học - K.21 - Lớp 1'),('DGT1212','ĐH chính quy - ngành Giáo dục Tiểu học - K.21 - Lớp 2'),('DGT1221','ĐH chính quy - ngành Giáo dục Tiểu học - K.22 - Lớp 1'),('DGT1222','ĐH chính quy - ngành Giáo dục Tiểu học - K.22 - Lớp 2'),('DGT1231','ĐH chính quy - ngành Giáo dục Tiểu học - K.23 - Lớp 1'),('DGT1232','ĐH chính quy - ngành Giáo dục Tiểu học - K.23 - Lớp 2'),('DHA1231','ĐH chính quy - ngành QT nhà hàng và dịch vụ ăn uống - K.23 - Lớp 1'),('DHO1201','Đại học chính quy - ngành SP Hóa  - K.20 - Lớp 1'),('DHO1211','ĐH chính quy - ngành SP Hóa - K.21 - Lớp 1'),('DHO1221','ĐH chính quy - ngành SP Hóa - K.22 - Lớp 1'),('DHO1231','ĐH chính quy - ngành SP Hóa - K.23 - Lớp 1'),('DKD1201','Đại học chính quy - ngành Công nghệ Kĩ thuật điện, điện tử - K.20 - Lớp 1'),('DKD1211','ĐH chính quy - ngành CN Kĩ thuật điện, điện tử - K.21 - Lớp 1'),('DKD1221','ĐH chính quy - ngành CN Kĩ thuật điện, điện tử - K.22 - Lớp 1'),('DKD1231','ĐH chính quy - ngành CN Kĩ thuật điện, điện tử - K.23 - Lớp 1'),('DKE1201','Đại học chính quy - ngành Kế toán - K.20 - Lớp 1'),('DKE1202','Đại học chính quy - ngành Kế toán - K.20 - Lớp 2'),('DKE1211','ĐH chính quy - ngành Kế toán - K.21 - Lớp 1'),('DKE1212','ĐH chính quy - ngành Kế toán - K.21 - Lớp 2'),('DKE1213','ĐH chính quy - ngành Kế toán - K.21 - Lớp 3'),('DKE1214','ĐH chính quy - ngành Kế toán - K.21 - Lớp 4'),('DKE1221','ĐH chính quy - ngành Kế toán - K.22 - Lớp 1'),('DKE1222','ĐH chính quy - ngành Kế toán - K.22 - Lớp 2'),('DKE1223','ĐH chính quy - ngành Kế toán - K.22 - Lớp 3'),('DKE1224','ĐH chính quy - ngành Kế toán - K.22 - Lớp 4'),('DKE1231','ĐH chính quy - ngành Kế toán - K.23 - Lớp 1'),('DKE1232','ĐH chính quy - ngành Kế toán - K.23 - Lớp 2'),('DKE1233','ĐH chính quy - ngành Kế toán - K.23 - Lớp 3'),('DKE1234','ĐH chính quy - ngành Kế toán - K.23 - Lớp 4'),('DKH1201','Đại học chính quy - ngành SP Khoa học tự nhiên  - K.20 - Lớp 1'),('DKH1211','ĐH chính quy - ngành SP Khoa học tự nhiên - K.21 - Lớp 1'),('DKH1221','ĐH chính quy - ngành SP Khoa học tự nhiên - K.22 - Lớp 1'),('DKH1231','ĐH chính quy - ngành SP Khoa học tự nhiên - K.23 - Lớp 1'),('DKM1201','Đại học chính quy - ngành Khoa học môi trường - K.20 - Lớp 1'),('DKM1211','ĐH chính quy - ngành Khoa học môi trường - K.21 - Lớp 1'),('DKM1221','ĐH chính quy - ngành Khoa học môi trường - K.22 - Lớp 1'),('DKM1231','ĐH chính quy - ngành Khoa học môi trường - K.23 - Lớp 1'),('DKP1201','Đại học chính quy - ngành Kỹ thuật phần mềm - K.20 - Lớp 1'),('DKP1211','ĐH chính quy - ngành Kỹ thuật phần mềm - K.21 - Lớp 1'),('DKP1221','ĐH chính quy - ngành Kỹ thuật phần mềm - K.22 - Lớp 1'),('DKP1231','ĐH chính quy - ngành Kỹ thuật phần mềm - K.23 - Lớp 1'),('DKQ1201','Đại học chính quy - ngành Kinh doanh quốc tế - K.20 - Lớp 1'),('DKQ1211','ĐH chính quy - ngành Kinh doanh quốc tế - K.21 - Lớp 1'),('DKQ1221','ĐH chính quy - ngành Kinh doanh quốc tế - K.22 - Lớp 1'),('DKQ1231','ĐH chính quy - ngành Kinh doanh quốc tế - K.23 - Lớp 1'),('DKQ1232','ĐH chính quy - ngành Kinh doanh quốc tế - K.23 - Lớp 2'),('DLD1201','Đại học chính quy - ngành SP Lịch sử - Địa lý  - K.20 - Lớp 1'),('DLD1211','ĐH chính quy - ngành SP Lịch sử - Địa lý - K.21 - Lớp 1'),('DLD1221','ĐH chính quy - ngành SP Lịch sử - Địa lý - K.22 - Lớp 1'),('DLD1231','ĐH chính quy - ngành SP Lịch sử - Địa lý - K.23 - Lớp 1'),('DLI1201','Đại học chính quy - ngành SP Vật lí  - K.20 - Lớp 1'),('DLI1211','ĐH chính quy - ngành SP Vật lí - K.21 - Lớp 1'),('DLI1221','ĐH chính quy - ngành SP Vật lí - K.22 - Lớp 1'),('DLI1231','ĐH chính quy - ngành SP Vật lí - K.23 - Lớp 1'),('DLU1201','Đại học chính quy - ngành Luật - K.20 - Lớp 1'),('DLU1202','Đại học chính quy - ngành Luật - K.20 - Lớp 2'),('DLU1211','ĐH chính quy - ngành Luật - K.21 - Lớp 1'),('DLU1212','ĐH chính quy - ngành Luật - K.21 - Lớp 2'),('DLU1221','ĐH chính quy - ngành Luật - K.22 - Lớp 1'),('DLU1222','ĐH chính quy - ngành Luật - K.22 - Lớp 2'),('DLU1231','ĐH chính quy - ngành Luật - K.23 - Lớp 1'),('DLU1232','ĐH chính quy - ngành Luật - K.23 - Lớp 2'),('DMI1201','Đại học chính quy - ngành SP Mỹ thuật - K.20 - Lớp 1'),('DMI1211','ĐH chính quy - ngành SP Mỹ thuật - K.21 - Lớp 1'),('DMI1221','ĐH chính quy - ngành SP Mỹ thuật - K.22 - Lớp 1'),('DMI1231','ĐH chính quy - ngành SP Mỹ thuật - K.23 - Lớp 1'),('DNA1201','Đại học chính quy - ngành Thanh nhạc - K.20 - Lớp 1'),('DNA1211','ĐH chính quy - ngành Thanh nhạc - K.21 - Lớp 1'),('DNA1221','ĐH chính quy - ngành Thanh nhạc - K.22 - Lớp 1'),('DNH1201','Đại học chính quy - ngành SP Âm nhạc - K.20 - Lớp 1'),('DNH1211','ĐH chính quy - ngành SP Âm nhạc - K.21 - Lớp 1'),('DNH1221','ĐH chính quy - ngành SP Âm nhạc - K.22 - Lớp 1'),('DNH1231','ĐH chính quy - ngành SP Âm nhạc - K.23 - Lớp 1'),('DQG1211','ĐH chính quy - ngành Quản lý Giáo dục - K.21 - Lớp 1'),('DQG1221','ĐH chính quy - ngành Quản lý Giáo dục - K.22 - Lớp 1'),('DQG1231','ĐH chính quy - ngành Quản lý Giáo dục - K.23 - Lớp 1'),('DQK1201','Đại học chính quy - ngành Quản trị kinh doanh - K.20 - Lớp 1'),('DQK1202','Đại học chính quy - ngành Quản trị kinh doanh - K.20 - Lớp 2'),('DQK1203','Đại học chính quy - ngành Quản trị kinh doanh - K.20 - Lớp 3'),('DQK1204','Đại học chính quy - ngành Quản trị kinh doanh - K.20 - Lớp 4'),('DQK1211','ĐH chính quy - ngành Quản trị kinh doanh - K.21 - Lớp 1'),('DQK1212','ĐH chính quy - ngành Quản trị kinh doanh - K.21 - Lớp 2'),('DQK1221','ĐH chính quy - ngành Quản trị kinh doanh - K.22 - Lớp 1'),('DQK1222','ĐH chính quy - ngành Quản trị kinh doanh - K.22 - Lớp 2'),('DQK1223','ĐH chính quy - ngành Quản trị kinh doanh - K.22 - Lớp 3'),('DQK1224','ĐH chính quy - ngành Quản trị kinh doanh - K.22 - Lớp 4'),('DQK1231','ĐH chính quy - ngành Quản trị kinh doanh - K.23 - Lớp 1'),('DQK1232','ĐH chính quy - ngành Quản trị kinh doanh - K.23 - Lớp 2'),('DQK1233','ĐH chính quy - ngành Quản trị kinh doanh - K.23 - Lớp 3'),('DQK1234','ĐH chính quy - ngành Quản trị kinh doanh - K.23 - Lớp 4'),('DQT1201','Đại học chính quy - ngành Quốc tế học - K.20 - Lớp 1'),('DQT1211','ĐH chính quy - ngành Quốc tế học - K.21 - Lớp 1'),('DQT1221','ĐH chính quy - ngành Quốc tế học - K.22 - Lớp 1'),('DQT1231','ĐH chính quy - ngành Quốc tế học - K.23 - Lớp 1'),('DQV1201','Đại học chính quy - ngành Quản trị văn phòng - K.20 - Lớp 1'),('DQV1211','ĐH chính quy - ngành Quản trị văn phòng - K.21 - Lớp 1'),('DQV1221','ĐH chính quy - ngành Quản trị văn phòng - K.22 - Lớp 1'),('DQV1231','ĐH chính quy - ngành Quản trị văn phòng - K.23 - Lớp 1'),('DSA1211','ĐH chính quy - ngành SP Tiếng Anh - K.21 - Lớp 1'),('DSA1212','ĐH chính quy - ngành SP Tiếng Anh - K.21 - Lớp 2'),('DSA1213','ĐH chính quy - ngành SP Tiếng Anh - K.21 - Lớp 3'),('DSA1221','ĐH chính quy - ngành SP Tiếng Anh - K.22 - Lớp 1'),('DSA1231','ĐH chính quy - ngành SP Tiếng Anh - K.23 - Lớp 1'),('DSA1232','ĐH chính quy - ngành SP Tiếng Anh - K.23 - Lớp 2'),('DSA1233','ĐH chính quy - ngành SP Tiếng Anh - K.23 - Lớp 3'),('DSI1201','Đại học chính quy - ngành SP Sinh học  - K.20 - Lớp 1'),('DSI1211','ĐH chính quy - ngành SP Sinh học - K.21 - Lớp 1'),('DSI1221','ĐH chính quy - ngành SP Sinh học - K.22 - Lớp 1'),('DSI1231','ĐH chính quy - ngành SP Sinh học - K.23 - Lớp 1'),('DSU1201','Đại học chính quy - ngành SP Lịch sử  - K.20 - Lớp 1'),('DSU1211','ĐH chính quy - ngành SP Lịch sử - K.21 - Lớp 1'),('DSU1221','ĐH chính quy - ngành SP Lịch sử - K.22 - Lớp 1'),('DSU1231','ĐH chính quy - ngành SP Lịch sử - K.23 - Lớp 1'),('DTL1201','Đại học chính quy - ngành Tâm lí học - K.20 - Lớp 1'),('DTL1211','ĐH chính quy - ngành Tâm lí học - K.21 - Lớp 1'),('DTL1212','ĐH chính quy - ngành Tâm lí học - K.21 - Lớp 2'),('DTL1221','ĐH chính quy - ngành Tâm lí học - K.22 - Lớp 1'),('DTL1222','ĐH chính quy - ngành Tâm lí học - K.22 - Lớp 2'),('DTL1231','ĐH chính quy - ngành Tâm lí học - K.23 - Lớp 1'),('DTL1232','ĐH chính quy - ngành Tâm lí học - K.23 - Lớp 2'),('DTN1201','Đại học chính quy - ngành Tài chính - Ngân hàng - K.20 - Lớp 1'),('DTN1202','Đại học chính quy - ngành Tài chính - Ngân hàng - K.20 - Lớp 2'),('DTN1211','ĐH chính quy - ngành Tài chính - Ngân hàng - K.21 - Lớp 1'),('DTN1212','ĐH chính quy - ngành Tài chính - Ngân hàng - K.21 - Lớp 2'),('DTN1213','ĐH chính quy - ngành Tài chính - Ngân hàng - K.21 - Lớp 3'),('DTN1214','ĐH chính quy - ngành Tài chính - Ngân hàng - K.21 - Lớp 4'),('DTN1221','ĐH chính quy - ngành Tài chính - Ngân hàng - K.22 - Lớp 1'),('DTN1222','ĐH chính quy - ngành Tài chính - Ngân hàng - K.22 - Lớp 2'),('DTN1223','ĐH chính quy - ngành Tài chính - Ngân hàng - K.22 - Lớp 3'),('DTN1224','ĐH chính quy - ngành Tài chính - Ngân hàng - K.22 - Lớp 4'),('DTN1231','ĐH chính quy - ngành Tài chính - Ngân hàng - K.23 - Lớp 1'),('DTN1232','ĐH chính quy - ngành Tài chính - Ngân hàng - K.23 - Lớp 2'),('DTN1233','ĐH chính quy - ngành Tài chính - Ngân hàng - K.23 - Lớp 3'),('DTN1234','ĐH chính quy - ngành Tài chính - Ngân hàng - K.23 - Lớp 4'),('DTO1201','Đại học chính quy - ngành SP Toán  - K.20 - Lớp 1'),('DTO1211','ĐH chính quy - ngành SP Toán - K.21 - Lớp 1'),('DTO1221','ĐH chính quy - ngành SP Toán - K.22 - Lớp 1'),('DTO1231','ĐH chính quy - ngành SP Toán - K.23 - Lớp 1'),('DTT1201','Đại học chính quy - ngành Thông tin - Thư viện - K.20 - Lớp 1'),('DTT1211','ĐH chính quy - ngành Thông tin - Thư viện - K.21 - Lớp 1'),('DTT1221','ĐH chính quy - ngành Thông tin - Thư viện - K.22 - Lớp 1'),('DTT1231','ĐH chính quy - ngành Thông tin - Thư viện - K.23 - Lớp 1'),('DTU1201','Đại học chính quy - ngành Toán ứng dụng - K.20 - Lớp 1'),('DTU1202','Đại học chính quy - ngành Toán ứng dụng - K.20 - Lớp 2'),('DTU1211','ĐH chính quy - ngành Toán ứng dụng - K.21 - Lớp 1'),('DTU1221','ĐH chính quy - ngành Toán ứng dụng - K.22 - Lớp 1'),('DTU1231','ĐH chính quy - ngành Toán ứng dụng - K.23 - Lớp 1'),('DVA1201','Đại học chính quy - ngành SP Ngữ văn  - K.20 - Lớp 1'),('DVA1211','ĐH chính quy - ngành SP Ngữ văn - K.21 - Lớp 1'),('DVA1221','ĐH chính quy - ngành SP Ngữ văn - K.22 - Lớp 1'),('DVA1231','ĐH chính quy - ngành SP Ngữ văn - K.23 - Lớp 1'),('DVI1201','Đại học chính quy - ngành Việt Nam học - K.20 - Lớp 1'),('DVI1211','ĐH chính quy - ngành Việt Nam học - K.21 - Lớp 1'),('DVI1221','ĐH chính quy - ngành Việt Nam học - K.22 - Lớp 1'),('DVI1231','ĐH chính quy - ngành Việt Nam học - K.23 - Lớp 1');
/*!40000 ALTER TABLE `ds_lop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invite_link`
--

DROP TABLE IF EXISTS `invite_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invite_link` (
  `id` varchar(48) NOT NULL,
  `tkb_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tkb_id` (`tkb_id`),
  CONSTRAINT `invite_link_ibfk_1` FOREIGN KEY (`tkb_id`) REFERENCES `tkb_save` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite_link`
--

LOCK TABLES `invite_link` WRITE;
/*!40000 ALTER TABLE `invite_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `invite_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tkb_save`
--

DROP TABLE IF EXISTS `tkb_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tkb_save` (
  `id` varchar(36) NOT NULL,
  `id_user` json DEFAULT NULL,
  `tkb_name` varchar(20) DEFAULT NULL,
  `description` text,
  `json_data` json DEFAULT NULL,
  `thumbnails` mediumblob,
  `date_save` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tkb_save`
--

LOCK TABLES `tkb_save` WRITE;
/*!40000 ALTER TABLE `tkb_save` DISABLE KEYS */;
/*!40000 ALTER TABLE `tkb_save` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` varchar(36) NOT NULL,
  `display_name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ma_sv` varchar(11) DEFAULT NULL,
  `khoa` varchar(4) DEFAULT NULL,
  `lop` varchar(7) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `khoa` (`khoa`),
  KEY `lop` (`lop`),
  KEY `username` (`username`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`khoa`) REFERENCES `ds_khoa` (`id`),
  CONSTRAINT `user_info_ibfk_2` FOREIGN KEY (`lop`) REFERENCES `ds_lop` (`id`),
  CONSTRAINT `user_info_ibfk_3` FOREIGN KEY (`username`) REFERENCES `user_login_info` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES ('3259f909-cfe7-418e-8e9e-694223ad4cdd','Nguyễn Khắc Hiếu','3123560027',NULL,NULL,NULL),('5e171712-cdc4-4168-a7d6-16e666745c25','Nguyễn Khắc Hiếu','3123560027',NULL,NULL,NULL),('c26993c5-7a29-4912-81a7-1095ddda995a','Nguyễn Khắc Hiếu','3123560027',NULL,NULL,'3123560027');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_login_info`
--

DROP TABLE IF EXISTS `user_login_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_login_info` (
  `username` varchar(20) NOT NULL,
  `pass` char(40) NOT NULL,
  `email` varchar(320) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `created` datetime NOT NULL,
  `token` varchar(36) DEFAULT NULL,
  `type_signup` varchar(10) DEFAULT (_utf8mb4'DEFAULT'),
  PRIMARY KEY (`username`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login_info`
--

LOCK TABLES `user_login_info` WRITE;
/*!40000 ALTER TABLE `user_login_info` DISABLE KEYS */;
INSERT INTO `user_login_info` VALUES ('3123560027','f60c72530ab08df8d668ff1e34803c61bb1b5569','nguyenkhachieu117@gmail.com','c26993c5-7a29-4912-81a7-1095ddda995a','2024-04-06 09:43:19','9a6722ff60bfda6829699b8f41a64c2e1d93','DEFAULT');
/*!40000 ALTER TABLE `user_login_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-06 18:37:22
