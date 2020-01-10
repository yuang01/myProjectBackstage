/*
Navicat MySQL Data Transfer

Source Server         : aaa
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : ayudev

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-01-10 11:56:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '总公司', '总公司就是牛', '2019-12-25 11:49:00', '2019-12-31 03:49:25', '0');
INSERT INTO `department` VALUES ('2', '技术部', '技术部死宅', '2019-12-25 10:18:00', '2019-12-31 03:53:45', '1');
INSERT INTO `department` VALUES ('3', '前端', '前端页面狗', '2019-12-25 11:50:00', '2019-12-31 03:54:07', '2');
INSERT INTO `department` VALUES ('4', '后端', '后端增删狗', '2019-12-25 11:51:00', '2020-01-02 06:30:29', '2');
INSERT INTO `department` VALUES ('5', '销售部', '销售部垃圾', '2019-12-25 11:51:00', '2019-12-31 03:54:31', '1');
INSERT INTO `department` VALUES ('6', '设计部', 'ps绘图', '2020-01-02 06:46:38', '2020-01-02 06:46:38', '1');
INSERT INTO `department` VALUES ('7', 'ps', '专业ps绘图', '2020-01-02 06:47:00', '2020-01-03 07:57:24', '6');
INSERT INTO `department` VALUES ('8', 'web前端', '页面', '2020-01-02 06:56:44', '2020-01-02 06:56:44', '3');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `component` varchar(255) DEFAULT NULL,
  `isMenu` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('1', '0', 'Excel', '/excel', null, null, null, '表格excel', 'excel', 'Layout', '1');
INSERT INTO `menus` VALUES ('2', '1', 'ExportExcel', 'export-excel', null, null, null, 'Export Excel', null, 'exportExcel', '1');
INSERT INTO `menus` VALUES ('3', '1', 'SelectExcel', 'export-selected-excel', null, null, null, 'Export Selected', null, 'selectExcel', '1');
INSERT INTO `menus` VALUES ('4', '0', 'setting', '/setting', null, null, null, '系统设置', 'user', 'Layout', '1');
INSERT INTO `menus` VALUES ('5', '4', 'personalSetting', 'page', null, null, null, '个人设置', null, 'personalSetting', '1');
INSERT INTO `menus` VALUES ('6', '4', 'setUsers', 'setUsers', null, null, null, '用户管理', null, 'setUsers', '1');
INSERT INTO `menus` VALUES ('7', '4', 'rolesManage', 'rolesManage', null, null, null, '角色管理', null, 'rolesManage', '1');
INSERT INTO `menus` VALUES ('8', '4', 'departmentManage', 'departmentManage', null, null, null, '部门管理', null, 'departmentManage', '1');
INSERT INTO `menus` VALUES ('9', '4', 'menusManage', 'menusManage', null, null, null, '菜单管理', null, 'menusManage', '1');
INSERT INTO `menus` VALUES ('10', '4', null, 'test', null, null, null, '测试', null, 'test', '1');
INSERT INTO `menus` VALUES ('11', '6', 'userManage/add', 'oparation', null, null, null, '新增用户', null, null, '0');
INSERT INTO `menus` VALUES ('12', '6', 'userManage/edit', 'oparation', null, null, null, '编辑用户', null, null, '0');
INSERT INTO `menus` VALUES ('13', null, 'userManage/delete', 'oparation', null, null, null, '删除用户', null, null, '0');

-- ----------------------------
-- Table structure for roleMenu
-- ----------------------------
DROP TABLE IF EXISTS `roleMenu`;
CREATE TABLE `roleMenu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `menuId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roleMenu_menuId_roleId_unique` (`roleId`,`menuId`),
  KEY `menuId` (`menuId`),
  CONSTRAINT `roleMenu_ibfk_365` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roleMenu_ibfk_366` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roleMenu
-- ----------------------------
INSERT INTO `roleMenu` VALUES ('14', '2019-12-26 07:49:51', '2019-12-26 07:49:51', '1', '5');
INSERT INTO `roleMenu` VALUES ('16', '2019-12-26 07:49:51', '2019-12-26 07:49:51', '1', '7');
INSERT INTO `roleMenu` VALUES ('37', '2019-12-27 03:36:03', '2019-12-27 03:36:03', '1', '3');
INSERT INTO `roleMenu` VALUES ('44', '2019-12-27 03:49:56', '2019-12-27 03:49:56', '3', '5');
INSERT INTO `roleMenu` VALUES ('50', '2019-12-27 06:21:21', '2019-12-27 06:21:21', '2', '3');
INSERT INTO `roleMenu` VALUES ('52', '2020-01-02 07:49:57', '2020-01-02 07:49:57', '16', '1');
INSERT INTO `roleMenu` VALUES ('53', '2020-01-02 07:49:57', '2020-01-02 07:49:57', '16', '2');
INSERT INTO `roleMenu` VALUES ('54', '2020-01-02 07:49:57', '2020-01-02 07:49:57', '16', '3');
INSERT INTO `roleMenu` VALUES ('55', '2020-01-02 08:26:13', '2020-01-02 08:26:13', '16', '5');
INSERT INTO `roleMenu` VALUES ('57', '2020-01-02 08:27:34', '2020-01-02 08:27:34', '1', '8');
INSERT INTO `roleMenu` VALUES ('58', '2020-01-03 07:49:26', '2020-01-03 07:49:26', '17', '1');
INSERT INTO `roleMenu` VALUES ('59', '2020-01-03 07:49:26', '2020-01-03 07:49:26', '17', '2');
INSERT INTO `roleMenu` VALUES ('60', '2020-01-03 07:49:26', '2020-01-03 07:49:26', '17', '3');
INSERT INTO `roleMenu` VALUES ('61', '2020-01-03 07:50:26', '2020-01-03 07:50:26', '17', '4');
INSERT INTO `roleMenu` VALUES ('62', '2020-01-03 07:50:26', '2020-01-03 07:50:26', '17', '5');
INSERT INTO `roleMenu` VALUES ('63', '2020-01-03 07:50:26', '2020-01-03 07:50:26', '17', '6');
INSERT INTO `roleMenu` VALUES ('64', '2020-01-03 07:50:26', '2020-01-03 07:50:26', '17', '7');
INSERT INTO `roleMenu` VALUES ('65', '2020-01-03 07:50:26', '2020-01-03 07:50:26', '17', '8');
INSERT INTO `roleMenu` VALUES ('66', '2020-01-03 07:51:24', '2020-01-03 07:51:24', '19', '1');
INSERT INTO `roleMenu` VALUES ('67', '2020-01-03 07:51:24', '2020-01-03 07:51:24', '19', '2');
INSERT INTO `roleMenu` VALUES ('68', '2020-01-03 07:51:24', '2020-01-03 07:51:24', '19', '3');
INSERT INTO `roleMenu` VALUES ('75', '2020-01-03 07:56:49', '2020-01-03 07:56:49', '6', '7');
INSERT INTO `roleMenu` VALUES ('76', '2020-01-03 07:56:49', '2020-01-03 07:56:49', '6', '8');
INSERT INTO `roleMenu` VALUES ('77', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '1');
INSERT INTO `roleMenu` VALUES ('78', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '2');
INSERT INTO `roleMenu` VALUES ('79', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '3');
INSERT INTO `roleMenu` VALUES ('80', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '4');
INSERT INTO `roleMenu` VALUES ('81', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '5');
INSERT INTO `roleMenu` VALUES ('82', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '6');
INSERT INTO `roleMenu` VALUES ('83', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '7');
INSERT INTO `roleMenu` VALUES ('84', '2020-01-03 07:56:56', '2020-01-03 07:56:56', '7', '8');
INSERT INTO `roleMenu` VALUES ('85', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '1');
INSERT INTO `roleMenu` VALUES ('86', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '2');
INSERT INTO `roleMenu` VALUES ('87', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '3');
INSERT INTO `roleMenu` VALUES ('88', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '4');
INSERT INTO `roleMenu` VALUES ('89', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '5');
INSERT INTO `roleMenu` VALUES ('90', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '6');
INSERT INTO `roleMenu` VALUES ('91', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '7');
INSERT INTO `roleMenu` VALUES ('92', '2020-01-03 07:57:08', '2020-01-03 07:57:08', '9', '8');
INSERT INTO `roleMenu` VALUES ('95', '2020-01-07 08:40:13', '2020-01-07 08:40:13', '1', '1');
INSERT INTO `roleMenu` VALUES ('96', '2020-01-07 08:40:13', '2020-01-07 08:40:13', '1', '2');
INSERT INTO `roleMenu` VALUES ('98', '2020-01-07 08:47:28', '2020-01-07 08:47:28', '1', '9');
INSERT INTO `roleMenu` VALUES ('99', '2020-01-07 09:41:46', '2020-01-07 09:41:46', '1', '10');
INSERT INTO `roleMenu` VALUES ('102', '2020-01-09 08:11:25', '2020-01-09 08:11:25', '3', '3');
INSERT INTO `roleMenu` VALUES ('125', '2020-01-10 01:24:38', '2020-01-10 01:24:38', '1', '4');
INSERT INTO `roleMenu` VALUES ('127', '2020-01-10 01:37:03', '2020-01-10 01:37:03', '1', '11');
INSERT INTO `roleMenu` VALUES ('128', '2020-01-10 01:37:03', '2020-01-10 01:37:03', '1', '6');
INSERT INTO `roleMenu` VALUES ('129', '2020-01-10 03:33:56', '2020-01-10 03:33:56', '1', '12');
INSERT INTO `roleMenu` VALUES ('132', '2020-01-10 03:37:25', '2020-01-10 03:37:25', '6', '4');
INSERT INTO `roleMenu` VALUES ('133', '2020-01-10 03:42:55', '2020-01-10 03:42:55', '6', '11');
INSERT INTO `roleMenu` VALUES ('134', '2020-01-10 03:42:55', '2020-01-10 03:42:55', '6', '6');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentName` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_parentName_unique` (`parentName`),
  UNIQUE KEY `roles_name_unique` (`name`),
  KEY `departmentId` (`departmentId`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', null, 'admin', '管理员', '2019-12-24 17:56:00', '2020-01-10 03:33:56', '1');
INSERT INTO `roles` VALUES ('2', null, 'developer', '开发者', '2019-12-25 10:18:00', '2020-01-09 08:11:19', '2');
INSERT INTO `roles` VALUES ('3', null, 'other', '游客', '2019-12-25 10:18:07', '2020-01-09 08:11:25', '6');
INSERT INTO `roles` VALUES ('4', null, 'aa', '我', '2019-12-25 08:35:08', '2019-12-25 08:35:08', null);
INSERT INTO `roles` VALUES ('6', null, 'bb', '测试', '2019-12-25 08:36:51', '2020-01-10 03:42:55', '1');
INSERT INTO `roles` VALUES ('7', null, 'cc', '哈哈', '2019-12-25 08:38:52', '2020-01-03 07:56:56', '4');
INSERT INTO `roles` VALUES ('9', null, 'dd', 'dedede', '2020-01-02 07:16:16', '2020-01-03 07:57:08', '7');
INSERT INTO `roles` VALUES ('10', null, 'ee', 'ererer', '2020-01-02 07:20:17', '2020-01-02 07:20:17', null);
INSERT INTO `roles` VALUES ('11', null, 'rr', 'rtrt', '2020-01-02 07:22:43', '2020-01-02 07:22:43', null);
INSERT INTO `roles` VALUES ('13', null, 'rrrtrtr', 'rtrt', '2020-01-02 07:22:51', '2020-01-02 07:22:51', null);
INSERT INTO `roles` VALUES ('14', null, '1212', '121212121', '2020-01-02 07:47:40', '2020-01-02 07:47:40', null);
INSERT INTO `roles` VALUES ('15', null, '2323', '2323232', '2020-01-02 07:49:00', '2020-01-02 07:49:00', null);
INSERT INTO `roles` VALUES ('16', null, '1111', '2222', '2020-01-02 07:49:57', '2020-01-02 08:26:13', null);
INSERT INTO `roles` VALUES ('17', null, 'popo', 'qqqq', '2020-01-03 07:49:25', '2020-01-03 07:50:37', '3');
INSERT INTO `roles` VALUES ('19', null, '8989', 'sss', '2020-01-03 07:51:24', '2020-01-03 07:54:04', '5');

-- ----------------------------
-- Table structure for roleUser
-- ----------------------------
DROP TABLE IF EXISTS `roleUser`;
CREATE TABLE `roleUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roleUser_userId_roleId_unique` (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `roleUser_ibfk_469` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roleUser_ibfk_470` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roleUser
-- ----------------------------
INSERT INTO `roleUser` VALUES ('1', '2019-12-24 15:54:26', '2019-12-24 15:54:28', '1', '1');
INSERT INTO `roleUser` VALUES ('2', '2019-12-24 08:04:58', '2019-12-24 08:04:58', '3', '2');
INSERT INTO `roleUser` VALUES ('4', '2020-01-07 01:44:54', '2020-01-07 01:44:54', '3', '4');
INSERT INTO `roleUser` VALUES ('8', '2020-01-07 03:14:59', '2020-01-07 03:14:59', '6', '6');
INSERT INTO `roleUser` VALUES ('9', '2020-01-09 06:47:27', '2020-01-09 06:47:27', '2', '5');
INSERT INTO `roleUser` VALUES ('10', '2020-01-09 07:08:17', '2020-01-09 07:08:17', '6', '5');
INSERT INTO `roleUser` VALUES ('11', '2020-01-09 08:39:16', '2020-01-09 08:39:16', '2', '3');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `test` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_name_unique` (`name`),
  UNIQUE KEY `tag_test_unique` (`test`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `sex` int(2) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'ayu', '123456', 'http://localhost:3000/upload/0.7797981766361568.jpg', '0', '有钱任性买辣条', null, '2019-12-30 01:53:29');
INSERT INTO `users` VALUES ('2', '爱吃辣条的小欣', '123456', 'http://localhost:3000/upload/0.49852474395151103.png', '1', '23333333', '2019-12-24 08:04:00', '2020-01-02 07:00:13');
INSERT INTO `users` VALUES ('3', 'youke', '123', 'http://localhost:3000/upload/0.3121317647405968.jpeg', '0', '我是游客', '2019-12-25 09:11:02', '2020-01-09 08:39:16');
INSERT INTO `users` VALUES ('4', 'qwe', 'qwe', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576503673945&di=4427f71ea7562f888f52c5614fad9f27&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2019-01-16%2F145116704.jpg', '0', 'qweqe', '2020-01-07 01:44:54', '2020-01-07 01:44:54');
INSERT INTO `users` VALUES ('5', 'www', '123', 'http://localhost:3000/upload/0.16612990512342507.png', '1', 'asdfdfdf', '2020-01-07 01:45:41', '2020-01-09 07:08:17');
INSERT INTO `users` VALUES ('6', 'qqq', '123', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576503673945&di=4427f71ea7562f888f52c5614fad9f27&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2019-01-16%2F145116704.jpg', '0', '2132131', '2020-01-07 02:48:39', '2020-01-07 03:15:24');
