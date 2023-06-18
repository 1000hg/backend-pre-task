CREATE DATABASE jober_pre_task CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE jober_pre_task;


CREATE TABLE `profile_card` (
  `idx` int NOT NULL AUTO_INCREMENT COMMENT '인덱스',
  `user_idx` int NOT NULL COMMENT '유저인덱스',
  `company_name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '회사명',
  `job_title` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '직무',
  `hire_date` date DEFAULT NULL COMMENT '입사일',
  `quit_date` date DEFAULT NULL COMMENT '퇴사일',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `user_idx` (`user_idx`),
  CONSTRAINT `profile_card_ibfk_1` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `user` (
  `idx` int NOT NULL AUTO_INCREMENT COMMENT '인덱스',
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '이름',
  `nickname` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '닉네임',
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '휴대폰번호',
  `email` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '이메일',
  `birth` date DEFAULT NULL COMMENT '생일',
  `address` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '주소',
  `gender` enum('남자','여자','기타') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '성별',
  `created_at` datetime NOT NULL COMMENT '생성일',
  `updated_at` datetime NOT NULL COMMENT '수정일',
  `deleted_at` datetime DEFAULT NULL COMMENT '삭제일',
  PRIMARY KEY (`idx`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;