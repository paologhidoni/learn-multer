BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar BYTEA
);

INSERT INTO users (id, email, name, avatar) VALUES (
    1,
    'mario@gmail.com',
    'Mario',
    '5672567523'
);

INSERT INTO users (id, email, name, avatar) VALUES (
    2,
    'luigi@gmail.com',
    'Luigi',
    '7686536724'
);

COMMIT;