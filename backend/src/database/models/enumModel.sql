CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- provides gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS vector;
-- provides the vector data type for AI embeddings

CREATE TYPE role_type AS ENUM ('candidate', 'recruiter', 'admin');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'others');
CREATE TYPE employment_type AS ENUM ('full-time', 'part-time', 'contract', 'temporary', 'internship', 'volunteer', 'per diem', 'other');
CREATE TYPE experience_level AS ENUM ('entry-level', 'mid-level', 'senior-level', 'director', 'executive');
CREATE TYPE application_status AS ENUM ('pending', 'applied', 'under review', 'interviewing', 'offered', 'rejected', 'hired');
CREATE TYPE notification_type AS ENUM ('info', 'warning', 'error', 'success');
CREATE TYPE notification_status AS ENUM ('unread', 'read');
CREATE TYPE highest_degree AS ENUM ('high school', 'associate', 'bachelor', 'master', 'doctorate', 'other');
CREATE TYPE skill_proficiency AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');