create database temp1;
DROP DATABASE temp1;

create database temp2;
DROP DATABASE temp2;

DROP DATABASE IF EXISTS company;

CREATE DATABASE college;
CREATE DATABASE IF NOT EXISTS college;

USE college;

-- CREATE TABLE table_name{
--    column_name1 datatype constraint;
--    column_name2 datatype constraint;
--    column_name3 datatype constraint;
-- ); 

create table student(
		id INT PRIMARY KEY,
        name VARCHAR(50),
        age INT NOT NULL
);

INSERT INTO student value(1,"aman",14);
INSERT INTO student value(2,"rah",23);
INSERT INTO student value(3,"ra",27);
INSERT INTO student value(4,"r",22);

SET SQL_SAFE_UPDATES = 0;

ALTER TABLE student MODIFY COLUMN age INT NOT NULL DEFAULT 19;
ALTER TABLE student MODIFY age VARCHAR(2);
ALTER TABLE student CHANGE age stu_age INT;
ALTER TABLE student DROP COLUMN stu_age;
ALTER TABLE student RENAME TO stu;



SELECT name,age FROM student;
SELECT*FROM stu;

SHOW DATABASES; 
 

