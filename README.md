## DB import
DB는 MySQL에서 카톡에 올려놓은  `Dump20250322.sql ` import 하시면 됩니다.

![image](https://github.com/user-attachments/assets/167b8cb4-01b1-4253-8b58-d547b84ce086)


위 사진처럼 스키마명 수정하세요.

참고로 제 MySQL 버전은  `8.0.21 `입니다. < 상관있을까요?





## db.js 일부 코드 수정 
 ```
// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0809',
    database: 'parkgolf_db',
});
 ```
이 코드를

 ```
// MySQL 연결 설정
const db = mysql.createConnection({
    host: '본인 MySQL의 Hostname',
    user: '본인 MySQL의 Username',
    password: '본인 MySQL의 Password ',
    database: 'parkgolf_db',
});
 ```
로 수정하세요




## 실행
nodejsexpress 폴더에서 터미널에
 ```
 nodemon server.js
 ```
실행 안 되면 `nodemon` 설치 후 실행하세요.

