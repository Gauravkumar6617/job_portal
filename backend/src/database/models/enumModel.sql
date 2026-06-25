CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
-- this for uviversally unique id 
CREATE EXTENSION IF NOT EXISTS vector;
-- this for ai vector db

CREATE TABLE role_type ENUM ('candidate','recruiter','admin')
-- for user type
