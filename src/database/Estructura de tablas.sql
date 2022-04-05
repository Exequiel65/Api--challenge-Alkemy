drop database if exists movies;
CREATE DATABASE IF NOT EXISTS movies;

use movies;
CREATE TABLE genres(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    image VARCHAR(50)
);

CREATE TABLE movies(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(50),
    title VARCHAR(50) NOT NULL,
    date_create DATETIME NOT NULL,
    ranking INT(2) NOT NULL,
    id_genre INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_genre) REFERENCES genres(id)
);

CREATE TABLE characters(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(50),
    name VARCHAR(50) NOT NULL,
    age INT(2) NOT NULL,
    weigth INT(3) NOT NULL,
    history VARCHAR(100) NOT NULL
);


CREATE TABLE character_movies(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_movie INT UNSIGNED NOT NULL,
    id_character INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_movie) REFERENCES movies(id),
    FOREIGN KEY (id_character) REFERENCES characters(id)
);

CREATE TABLE users(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(100) NOT NULL
);

INSERT INTO genres
values(default, "fantasia","default-image.png"),
(default, "drama","default-image.png"),
(default, "animación","default-image.png");

