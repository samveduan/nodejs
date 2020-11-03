/*
MySQL Backup
Source Server Version: 5.7.17
Source Database: blog
Date: 2020/11/3 15:30:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(6) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `users` VALUES ('1','Tom','22','男','北京'), ('2','user01','18','男','北京'), ('4','user02','22','男','广州'), ('5','user03','18','女','深圳');
