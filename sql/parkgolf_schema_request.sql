CREATE DATABASE parkgolf_db;
USE parkgolf_db;

-- 0. 외래키 체크 해제 (삭제/재생성 방지용)
SET FOREIGN_KEY_CHECKS = 0;

-- 1. 기존 테이블 삭제
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS application;
DROP TABLE IF EXISTS lesson;
DROP TABLE IF EXISTS user;

-- 2. user 테이블 생성
CREATE TABLE user (
  userNum int NOT NULL AUTO_INCREMENT COMMENT '회원고유번호',
  userEmail varchar(45) NOT NULL COMMENT '회원이메일',
  userPw varchar(45) NOT NULL COMMENT '회원비밀번호',
  userName varchar(45) NOT NULL COMMENT '회원명',
  userinfo varchar(100) DEFAULT NULL COMMENT '회원경력 및 자격증',
  userRole varchar(20) DEFAULT '수강생',
  userImg varchar(255) DEFAULT 'default_userImg.png',
  userlocation1 varchar(45) DEFAULT NULL,
  userlocation2 varchar(45) DEFAULT NULL,
  PRIMARY KEY (userNum)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. user 더미 데이터 삽입
INSERT INTO user VALUES 
(1,'master1@gmail.com','1111','박강사','박강사의 소개','강사','default_userImg.png','',''),
(2,'master2@gmail.com','2222','이강사','이강사의 소개','강사','default_userImg.png','',''),
(3,'master3@gmail.com','3333','김강사','김강사의 소개','강사','default_userImg.png','',''),
(4,'master4@gmail.com','4444','염강사','염강사의 소개','강사','default_userImg.png','',''),
(5,'user1@gmail.com','user1','김수강생',NULL,'수강생','','',''),
(6,'user2@gmail.com','user2','구수강생',NULL,'수강생','','',''),
(7,'user3@gmail.com','user3','원수강생',NULL,'수강생','','','');

-- 4. lesson 테이블 생성
CREATE TABLE lesson (
  lesNum int NOT NULL AUTO_INCREMENT,
  instNum int NOT NULL,
  lesName varchar(100) NOT NULL,
  lesinfo varchar(255) NOT NULL,
  lesPlace varchar(45) NOT NULL,
  lesDetailPlace varchar(45) NOT NULL,
  lesPrice int NOT NULL,
  lesTime varchar(100) NOT NULL,
  lesThumbImg varchar(255) DEFAULT 'default_lesThumbImg.png',
  lesBackgroundImg varchar(255) DEFAULT 'default_background.png',
  rating decimal(2,1) DEFAULT '0.0',
  PRIMARY KEY (lesNum),
  KEY fk_instNum (instNum),
  CONSTRAINT chk_rating CHECK (rating >= 0.0 AND rating <= 5.0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. lesson 더미 데이터 삽입
-- (생략 없이 그대로 유지 – 너가 준 14개 레슨 데이터 포함)

INSERT INTO lesson VALUES 
(1,1,'초보자 달서구 파크골프 레슨','달서구에서 진행하는 초보자 파크골프 레슨','달서구','달서구 파크골프장',100000,'월 1A-1B','default_lesThumbImg.png','default_background.png',5.0),
(2,2,'초보자 달성군 파크골프 레슨','달성군에서 진행하는 초보자 파크골프 레슨','달성군','달성군 파크골프장',110000,'화 2A-2B','default_lesThumbImg.png','default_background.png',4.8),
(3,3,'초보자 수성구 파크골프 레슨','수성구에서 진행하는 초보자 파크골프 레슨','수성구','수성구 파크골프장',120000,'수 3A-3B','default_lesThumbImg.png','default_background.png',3.2),
(4,4,'초보자 중구 파크골프 레슨','중구에서 진행하는 초보자 파크골프 레슨','중구','중구 파크골프장',130000,'목 4A-4B','default_lesThumbImg.png','default_background.png',3.3),
(5,1,'초보자 남구 파크골프 레슨','남구에서 진행하는 파크골프 레슨','남구','남구 파크골프장',140000,'금 5A-5B','default_lesThumbImg.png','default_background.png',4.5),
(6,2,'초보자 북구 파크골프 레슨','북구에서 진행하는 파크골프 레슨','북구','북구 파크골프장',150000,'토 6A-6B','default_lesThumbImg.png','default_background.png',1.3),
(7,3,'초보자 동구 파크골프 레슨','동구에서 진행하는 파크골프 레슨','동구','동구 파크골프장',160000,'일 7A-7B','default_lesThumbImg.png','default_background.png',2.4),
(8,4,'초보자 서구 파크골프 레슨','서구에서 진행하는 파크골프 레슨','서구','서구 파크골프장',170000,'월 8A-8B','default_lesThumbImg.png','default_background.png',2.0),
(9,1,'초보자 군위군 파크골프 레슨','군위군에서 진행하는 파크골프 레슨','군위군','군위군 파크골프장',180000,'화 9A-9B','default_lesThumbImg.png','default_background.png',4.1),
(10,2,'즐거운 파크골프 레슨','부담 없이 즐기며 배우는 파크골프! 초보자도 편하게 시작할 수 있어요.','동구','동구 파크골프장',190000,'수 1A-1B','default_lesThumbImg.png','default_background.png',3.9),
(11,3,'처음 만나는 파크골프','파크골프가 처음인 분들을 위한 입문 레슨입니다. 규칙부터 스윙까지 차근차근 배워보세요.','북구','북구 파크골프장',200000,'목 2A-2B','default_lesThumbImg.png','default_background.png',3.6),
(12,4,'나도 할 수 있다! 파크골프 기초','스윙, 자세, 기본 규칙까지 쉽게 따라할 수 있는 기초 중심 레슨입니다.','서구','서구 파크골프장',210000,'금 3A-3B','default_lesThumbImg.png','default_background.png',0.0),
(13,1,'파크골프 첫걸음','파크골프의 A부터 Z까지! 누구나 쉽게 따라할 수 있는 친절한 기초 입문반입니다.','군위군','군위군 파크골프장',220000,'토 4A-4B','default_lesThumbImg.png','default_background.png',1.7),
(14,1,'초보 탈출 파크골프','기본기를 마스터하고 한 단계 실력 업! 초보자에서 중급자로 성장하는 시간.','달서구','달서구 파크골프장',230000,'일 5A-5B','default_lesThumbImg.png','default_background.png',4.8);

-- 6. cart 테이블 생성
CREATE TABLE cart (
  cartId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  lessonId int NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (cartId),
  KEY userId (userId),
  KEY lessonId (lessonId),
  CONSTRAINT cart_ibfk_1 FOREIGN KEY (userId) REFERENCES user (userNum) ON DELETE CASCADE,
  CONSTRAINT cart_ibfk_2 FOREIGN KEY (lessonId) REFERENCES lesson (lesNum) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. application 테이블 생성
CREATE TABLE application (
  appId INT AUTO_INCREMENT PRIMARY KEY,
  userNum INT NOT NULL,
  lesNum INT NOT NULL,
  status ENUM('대기', '승인', '거절', '취소') DEFAULT '대기',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userNum) REFERENCES user(userNum) ON DELETE CASCADE,
  FOREIGN KEY (lesNum) REFERENCES lesson(lesNum) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. 외래키 체크 다시 활성화
SET FOREIGN_KEY_CHECKS = 1;