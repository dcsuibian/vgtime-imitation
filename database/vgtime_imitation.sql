-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `name` varchar(16) NOT NULL UNIQUE,
    `password` char(64) NOT NULL,
    `role` varchar(10) NOT NULL,
    `phone_number` varchar(20) NOT NULL UNIQUE,
    `avatar` varchar(1024) DEFAULT NULL,
    `email` varchar(320) DEFAULT NULL,
    `gender` char(2) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;

CREATE TABLE `topic` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `author_id` bigint NOT NULL,
    `editor_id` bigint DEFAULT NULL,
    `title` varchar(50) NOT NULL,
    `summary` varchar(50) NOT NULL,
    `content` TEXT NOT NULL,
    `type` char(4) NOT NULL,
    `status` varchar(10) NOT NULL,
    `create_time` bigint NOT NULL,
    `update_time` bigint NOT NULL,
    `change_time` bigint NOT NULL,
    `cover` varchar(1024) DEFAULT NULL,
    PRIMARY KEY (`id`)
);