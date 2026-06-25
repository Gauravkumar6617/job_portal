CREATE TABLE candidate_profiles (
    profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,

    -- Personal Information
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender gender_type,
    bio TEXT,

    -- Contact
    phone_number VARCHAR(20),
    address TEXT,
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),

    -- Links
    website_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    profile_image_url VARCHAR(255),

    -- Resume & AI
    resume_url VARCHAR(255),
    raw_resume_text TEXT,
    ai_resume_score INT CHECK (ai_resume_score BETWEEN 0 AND 100),
    resume_embedding vector(1536),
    skill_gap_analysis JSONB,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);



CREATE TABLE candidate_experiences (
    experience_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,

    start_date DATE NOT NULL,
    end_date DATE,

    description TEXT,

    is_current BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CHECK (
        end_date IS NULL
        OR end_date >= start_date
    )
);
--  CANDITATE EDUCATION TABLE
CREATE TABLE candidate_educations (
    education_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    highest_degree highest_degree NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    end_date DATE,
    gpa DECIMAL(3, 2) CHECK (gpa >= 0 AND gpa <= 4.0),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);



CREATE TABLE candidate_skills (
    skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level skill_proficiency,
    years_of_experience INT CHECK (years_of_experience >= 0),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);