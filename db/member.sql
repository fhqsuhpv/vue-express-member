/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : member

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 07/11/2017 11:34:01 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `gift`
-- ----------------------------
DROP TABLE IF EXISTS `gift`;
CREATE TABLE `gift` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `main_image` text,
  `cost` decimal(10,0) DEFAULT NULL,
  `total_count` int(11) DEFAULT NULL,
  `current_count` int(11) DEFAULT NULL,
  `is_visible` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `gift`
-- ----------------------------
BEGIN;
INSERT INTO `gift` VALUES ('1', '花花草草', 'http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg', '1200', '10', '9', '1', '2017-07-04 10:42:12', '2017-07-04 10:42:16');
COMMIT;

-- ----------------------------
--  Table structure for `gift_detail`
-- ----------------------------
DROP TABLE IF EXISTS `gift_detail`;
CREATE TABLE `gift_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gift_id` int(11) NOT NULL,
  `image_path` text NOT NULL,
  `priority` int(11) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `gift_detail`
-- ----------------------------
BEGIN;
INSERT INTO `gift_detail` VALUES ('1', '1', 'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg', '1', '2017-07-04 10:48:06'), ('2', '1', 'http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg', '2', '2017-07-04 10:54:15'), ('3', '1', 'http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg', '3', '2017-07-04 10:54:19'), ('4', '1', 'http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg', '4', '2017-07-04 10:54:23'), ('5', '1', 'http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg', '5', '2017-07-04 10:54:26'), ('6', '1', 'http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg', '6', '2017-07-04 10:54:29');
COMMIT;

-- ----------------------------
--  Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` float(10,2) NOT NULL,
  `creat_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `goods`
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES ('1', 'apple', '5.00', '2017-05-11 00:22:10'), ('2', 'banner', '5.00', '2017-05-11 01:37:37');
COMMIT;

-- ----------------------------
--  Table structure for `integral`
-- ----------------------------
DROP TABLE IF EXISTS `integral`;
CREATE TABLE `integral` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `cost` decimal(10,0) NOT NULL,
  `record` varchar(20) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `integral`
-- ----------------------------
BEGIN;
INSERT INTO `integral` VALUES ('1', '1', '100', '冰丝', '2017-07-02 00:00:00'), ('2', '1', '100', '玫瑰', '2017-07-03 00:00:00');
COMMIT;

-- ----------------------------
--  Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `gift_id` int(11) NOT NULL,
  `recipient` varchar(10) DEFAULT NULL,
  `recipient_phone` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `is_del` int(11) DEFAULT NULL,
  `express_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `orders`
-- ----------------------------
BEGIN;
INSERT INTO `orders` VALUES ('21', '1', '1', '莉莉', '1888888888', '北京市朝阳区人民法院', '2017-07-07 15:30:02', '0', '0', null), ('22', '1', '1', '莉莉', '1888888888', '北京市朝阳区人民法院', '2017-07-07 15:30:29', '0', '0', null), ('23', '1', '1', '莉莉', '1888888888', '北京市朝阳区人民法院', '2017-07-07 15:32:11', '0', '0', null), ('24', '1', '1', '莉莉', '1888888888', '北京市朝阳区人民法院', '2017-07-07 15:34:49', '0', '0', null), ('25', '1', '1', '莉莉', '1888888888', '北京市朝阳区人民法院', '2017-07-07 15:35:53', '0', '0', null), ('26', '1', '1', '莉莉', '1888888888', '北京市朝阳区人民法院', '2017-07-07 15:37:25', '0', '0', null), ('27', '1', '1', '莉莉', '1888888888', '北京市朝阳区人民法院 东门', '2017-07-08 09:44:56', '0', '0', null), ('28', '2', '1', '二二', '133333333', '北京海淀区政府所在地距县城约1000000米', '2017-07-08 09:52:24', '0', '0', null), ('29', '2', '1', '二二', '133333333', '北京海淀区政府所在地距县城约1000000米', '2017-07-08 10:24:55', '0', '0', null);
COMMIT;

-- ----------------------------
--  Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `recipient` varchar(10) DEFAULT NULL,
  `recipient_phone` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `total_cost` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user_info`
-- ----------------------------
BEGIN;
INSERT INTO `user_info` VALUES ('1', '17701305311', 'fhqsuhpv', '莉莉', '1888888888', '北京市朝阳区人民法院 东门1011', '2017-07-04 16:04:46', '2017-07-08 09:44:56', '9600'), ('2', '17701305633', 'yjatjatj', '二二', '133333333', '北京海淀区政府所在地距县城约1000000米', '2017-07-08 09:51:32', '2017-07-08 10:24:55', '7803');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
