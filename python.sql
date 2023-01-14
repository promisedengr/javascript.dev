/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : python

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 29/12/2022 05:55:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for passwords
-- ----------------------------
DROP TABLE IF EXISTS `passwords`;
CREATE TABLE `passwords`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `m_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of passwords
-- ----------------------------
INSERT INTO `passwords` VALUES (4, 'snow', 'https://example.com', '536febbe849055dae3bbd15cb1d5e8c8', 'f521fd8bb1c3455bb2e7abb2f6c8fa0f');
INSERT INTO `passwords` VALUES (5, 'murggle', 'https://crypto.com', '358f196bbf7d015d2cda3248953453bc', 'e48ea17773ff2da11838879d777902b2');
INSERT INTO `passwords` VALUES (6, 'adsfaef', 'https://okay.com', 'd9b1d7db4cd6e70935368a1efb10e377', 'd9b1d7db4cd6e70935368a1efb10e377');
INSERT INTO `passwords` VALUES (7, 'updated', 'updated', '0f81d52e06caaa4860887488d18271c7', '0f81d52e06caaa4860887488d18271c7');
INSERT INTO `passwords` VALUES (8, 'grgw', 'grewgerw', '091fb114938ba6615e95036d4d8db56a', '342ff38c2aee13059fd56a66c9cf2b60');
INSERT INTO `passwords` VALUES (9, 'dfa', 'adsfasf', '30681e112faddd2eb9ceeebbfeb6611b', '7b4dafa43458d3a6a232afdd184ecb53');
INSERT INTO `passwords` VALUES (10, 'asdfsda', 'dsafdsa', 'f73070b50a314dbeb183fc4b4127ecac', 'c1ecccfa8ff75c90ea62b3b386aecb48');
INSERT INTO `passwords` VALUES (11, 'fsfs', 'dfdsgsdfg', '9a97085ea2dc67912e461e09bac8d019', '4c35abffe1cec5e9b16189fc0ebff34e');
INSERT INTO `passwords` VALUES (12, 'afd', 'fafas', '64690260a7058d9098918665e2ea5e48', '2236495fe9bf433cf70949790ef20841');
INSERT INTO `passwords` VALUES (13, 'dfsa', 'adsfa', '4943f7a8d4b3bf3cb1b761233fdba839', '8d0c8f9d1a9539021fda006427b993b9');
INSERT INTO `passwords` VALUES (14, 'asdfas', 'asdfas', '940dd2a389a7b09312317bbe5f5b35fa', '90c14aa88ec8288096ad7d579307ea55');
INSERT INTO `passwords` VALUES (15, 'fgsd', 'sdgsd', '85df80243ca3b8919fcb9d55e0d30b82', '21899b7728ddbafdb375c4c0400755ef');
INSERT INTO `passwords` VALUES (16, 'dfdsf', 'dfasfa', 'fa1c31cf1d435a92f50eb3e7e73b8413', '5867253846ad1e7130f5b19ce8506de7');
INSERT INTO `passwords` VALUES (17, 'test', 'https://test', '098f6bcd4621d373cade4e832627b4f6', '098f6bcd4621d373cade4e832627b4f6');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '12', '12');
INSERT INTO `users` VALUES (9, 'Test', '1');
INSERT INTO `users` VALUES (13, 'Test', '1');
INSERT INTO `users` VALUES (14, 'Test', '1');
INSERT INTO `users` VALUES (15, 'Test', '1');
INSERT INTO `users` VALUES (16, 'Anna', '123');
INSERT INTO `users` VALUES (17, 'Anna', '123');
INSERT INTO `users` VALUES (18, 'Anna', '123');

SET FOREIGN_KEY_CHECKS = 1;
