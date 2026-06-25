CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
-- this for uviversally unique id 
CREATE EXTENSION IF NOT EXISTS vector;
-- this for ai vector db

CREATE TABLE role_type ENUM ('candidate','recruiter','admin')
-- for user type
CREATE TABLE gender_type ENUM ('male','female','others')

CREATE TABLE employment_type ENUM ('full-time','part-time','contract','temporary','internship','volunteer','per diem','other')
-- for job employment type

CREATE TABLE experience_level ENUM ('entry-level','mid-level','senior-level','director','executive')
-- for job experience level

CREATE TABLE application_status ENUM ('applied','under review','interviewing','offered','rejected','hired')
-- for job application status

CREATE TABLE notification_type ENUM ('info','warning','error','success')
-- for notification type

CREATE TABLE notification_status ENUM ('unread','read')
-- for notification status

CREATE TABLE highest_degree ENUM ('high school','associate','bachelor','master','doctorate','other')
-- for candidate education highest degree

CREATE TABLE skill_proficiency ENUM ('beginner','intermediate','advanced','expert')