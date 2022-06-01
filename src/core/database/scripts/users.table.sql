CREATE TABLE users (
        userId varchar(255) PRIMARY KEY,
        email varchar(50) UNIQUE NOT NULL,
        username varchar(50),
        password varchar(100),
        firstName varchar(50),
        lastName varchar(50),
        hashedRefreshToken varchar(100) DEFAULT NULL
);