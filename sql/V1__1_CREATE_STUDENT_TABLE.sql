CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE student (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    age INTEGER NOT NULL,
    roll_number INTEGER NOT NULL,
    email VARCHAR (100) NOT NULL
);