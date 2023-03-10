/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.17-log : Database - cloud_drive
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cloud_drive` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `cloud_drive`;

/*Table structure for table `file` */

DROP TABLE IF EXISTS `file`;

CREATE TABLE `file` (
  `id` varchar(50) NOT NULL COMMENT '文件编号',
  `file_name` varchar(255) NOT NULL COMMENT '文件名称（原始名称）',
  `hash_name` varchar(255) NOT NULL COMMENT '文件名称（程序内部区分文件）',
  `upload_time` date NOT NULL COMMENT '上传时间',
  `type` varchar(255) NOT NULL COMMENT '文件类型',
  `size` varchar(20) NOT NULL COMMENT '文件大小',
  `download` varchar(50) NOT NULL COMMENT '下载次数',
  `uid` int(10) NOT NULL COMMENT '上传者（外键）',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `username` varchar(20) DEFAULT NULL COMMENT '登录名',
  `password` varchar(20) DEFAULT NULL COMMENT '登录密码',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `pic` varchar(100) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
