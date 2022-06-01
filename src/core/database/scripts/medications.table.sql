CREATE TABLE medications (
        medicationId varchar(255) PRIMARY KEY,
        signature varchar(50) UNIQUE NOT NULL,
        alias varchar(50) NOT NULL,
        basePrice numeric NOT NULL,
);