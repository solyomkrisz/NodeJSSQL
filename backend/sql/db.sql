CREATE DATABASE nodejssql
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE nodejssql;

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE inventory(
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    quantity INT NOT NULL,

    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE customers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    emai VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE orders(
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,

    FOREIGN KEY (customer_id) REFERENCES customers(id)
);