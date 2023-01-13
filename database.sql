CREATE DATABASE project;

\connect project;

CREATE TABLE IF NOT EXISTS Users(
	id CHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL, 
    password VARCHAR(30) NOT NULL
);

CREATE TABLE Project (
	id CHAR(36) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    zip_code CHAR(8) NOT NULL,
    cost FLOAT(2) NOT NULL,
    done BOOL NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE,
    userID CHAR(36),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (userID) REFERENCES Users (id)
);