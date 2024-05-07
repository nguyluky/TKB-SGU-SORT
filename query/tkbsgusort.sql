-- Active: 1709643794316@@127.0.0.1@3306@tkbsgusort
CREATE TABLE IF NOT EXISTS ds_lop (
  id VARCHAR(7) PRIMARY KEY, 
  display_name VARCHAR(80) CHARACTER SET utf8
);

CREATE TABLE IF NOT EXISTS ds_khoa (
  id VARCHAR(4) PRIMARY KEY, 
  display_name VARCHAR(41) CHARACTER SET utf8
);

CREATE TABLE IF NOT EXISTS user_login_info (
  username VARCHAR(20) PRIMARY KEY, 
  pass CHAR(40) NOT NULL, 
  email VARCHAR(320) UNIQUE, 
  id VARCHAR(36) NOT NULL UNIQUE, 
  created DATETIME NOT NULL, 
  token VARCHAR(36), 
  type_signup VARCHAR(10) DEFAULT('DEFAULT')
);

CREATE TABLE IF NOT EXISTS user_info (
  id VARCHAR(36) PRIMARY KEY, 
  display_name VARCHAR(40) CHARSET utf8, 
  ma_sv VARCHAR(11), 
  khoa VARCHAR(4), 
  lop VARCHAR(7), 
  username VARCHAR(20), 
  FOREIGN KEY(khoa) REFERENCES ds_khoa(id), 
  FOREIGN KEY(lop) REFERENCES ds_lop(id), 
  FOREIGN KEY(username) REFERENCES user_login_info(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tkb_save(
  id VARCHAR(36) PRIMARY KEY, 
  id_user JSON,
  tkb_name VARCHAR(20), 
  description TEXT, 
  json_data JSON, 
  thumbnails MEDIUMBLOB,
  date_save DATETIME
);

CREATE TABLE IF NOT EXISTS invite_link(
  id VARCHAR(48) PRIMARY KEY,
  tkb_id VARCHAR(36),
  Foreign Key (tkb_id) REFERENCES tkb_save(id) ON DELETE CASCADE
)

ALTER TABLE 
  user_login_info 
ADD 
  FOREIGN KEY(id) REFERENCES user_info(id) ON DELETE CASCADE


CREATE TABLE IF NOT EXISTS token_table(
  id VARCHAR(48) PRIMARY KEY,
  access_token TEXT(1000)
)