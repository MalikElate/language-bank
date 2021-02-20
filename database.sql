CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "student" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (30),
    "email" VARCHAR (30),
    "class" VARCHAR (50), 
    "lesson_id" INTEGER REFERENCES "lesson"
); 

CREATE TABLE "lesson" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (255),
    "notes" VARCHAR (255),
    "name" VARCHAR (255) NOT NULL,
    "lesson_code" SERIAL UNIQUE,
    "country" VARCHAR (255),
    "public" BOOLEAN DEFAULT NULL,
    "language" VARCHAR (30) NOT NULL,
    "lesson_owner_id" INTEGER REFERENCES "user", 
    "code" VARCHAR (50)
); 

CREATE TABLE "question" (
    "id" SERIAL PRIMARY KEY,
    "question" VARCHAR (255),
    "lesson_id" INTEGER REFERENCES "lesson"
); 

CREATE TABLE "answer" (
    "id" SERIAL PRIMARY KEY,
    "answer" VARCHAR (255), 
    "correct" BOOLEAN DEFAULT False, 
    "question_id" INTEGER REFERENCES "question", 
    "lesson_id" INTEGER REFERENCES "lesson"
); 