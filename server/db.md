```sql

--- table name and database name is in (SAMLL CASE)
--- attributes/or column name is in (CAMEL CASE) 

create database musicapp_db;
use musicapp_db; 

create table user(
    id integer primary key auto_increment,
    firstName varchar(50),
    lastName varchar(50),
    email varchar(80),
    password varchar(200),
    phone varchar(10),
    role varchar(10)
);

ALTER TABLE user ADD CONSTRAINT UNIQUE (email);
`````````````````````````````````````````````````````````
create table song(
    songId integer primary key auto_increment,
    songName varchar(50),
    artist varchar(50),
    genre varchar(50),
    image varchar(100),
    userId integer
);


````````````````````````````````````````````````````````

create table playlist(
    id integer primary key auto_increment,
    songId integer,
    userId integer,
   UNIQUE(songId,userId)
    );


``````````````````````````````````````````````````````````
