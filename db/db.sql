CREATE DATABASE tasklyDB;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(20),
    username VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO users (full_name, username, password)
VALUES
(101, 'john_doe', '$2y$12$t3Y');

// delete table
DROP TABLE users;

//return table data

SELECT * FROM users;

//return a user from users table

SELECT * FROM users WHERE id = 101;

//update user data

UPDATE users
SET full_name = 'Jane Doe', username = 'jane_doe'
WHERE id = 101;

//delete user

DELETE FROM users WHERE id = 101;