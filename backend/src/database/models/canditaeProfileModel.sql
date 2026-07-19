CREATE TABLE candidate_profiles (
    profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE, -- owning account, one profile per user

    -- Personal Information
    first_name VARCHAR(255) NOT NULL, -- given name
    last_name VARCHAR(255) NOT NULL, -- family name
    date_of_birth DATE, -- optional date of birth
    gender gender_type, -- optional gender
    headline VARCHAR(255), -- short title under the name, e.g. "Frontend Developer @ XYZ"
    bio TEXT, -- longer free-text "about me" section
    open_to_work BOOLEAN NOT NULL DEFAULT FALSE, -- toggle shown on the profile signalling availability to recruiters

    -- Contact
    phone_number VARCHAR(20), -- contact number shown to recruiters
    address TEXT, -- street-level address
    city VARCHAR(255), -- current city
    state VARCHAR(255), -- current state/region
    country VARCHAR(255), -- current country

    -- Links
    website_url VARCHAR(255), -- personal website/portfolio link
    linkedin_url VARCHAR(255), -- LinkedIn profile link
    github_url VARCHAR(255), -- GitHub profile link
    profile_image_url VARCHAR(255), -- avatar/profile photo

    -- Resume & AI
    resume_url VARCHAR(255), -- uploaded resume PDF, used as the default resume on Apply
    raw_resume_text TEXT, -- extracted plain text of the resume, used for AI matching
    ai_resume_score INT CHECK (ai_resume_score BETWEEN 0 AND 100), -- AI-generated resume quality score
    resume_embedding vector(1536), -- vector embedding of the resume, used for semantic job matching
    skill_gap_analysis JSONB, -- AI-generated breakdown of missing skills vs target roles

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- profile creation time
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time any field changed
);

CREATE INDEX idx_candidate_profiles_user ON candidate_profiles(user_id);
CREATE INDEX idx_candidate_profiles_location ON candidate_profiles(city, state, country);
CREATE INDEX idx_candidate_profiles_resume_score ON candidate_profiles(ai_resume_score DESC);
CREATE INDEX idx_candidate_profiles_open_to_work ON candidate_profiles(open_to_work);



CREATE TABLE candidate_experiences (
    experience_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- owning account

    company_name VARCHAR(255) NOT NULL, -- employer name for this work-experience entry
    job_title VARCHAR(255) NOT NULL, -- role held at that employer

    start_date DATE NOT NULL, -- when the role started
    end_date DATE, -- when the role ended, null if ongoing

    description TEXT, -- optional description of responsibilities/achievements

    is_current BOOLEAN NOT NULL DEFAULT FALSE, -- whether this is the candidate's current role

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- row creation time
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- last time any field changed

    CHECK (
        end_date IS NULL
        OR end_date >= start_date
    ) -- end date can never precede the start date
);

CREATE INDEX idx_candidate_experiences_user ON candidate_experiences(user_id);
CREATE INDEX idx_candidate_experiences_dates ON candidate_experiences(start_date, end_date);
--  CANDITATE EDUCATION TABLE
CREATE TABLE candidate_educations (
    education_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- owning account
    highest_degree highest_degree NOT NULL, -- degree level for this education entry
    institution_name VARCHAR(255) NOT NULL, -- school/university name
    field_of_study VARCHAR(255), -- major/field of study
    start_date DATE NOT NULL, -- when studies started
    is_current BOOLEAN NOT NULL DEFAULT FALSE, -- whether the candidate is still enrolled
    description TEXT, -- optional notes, honors, coursework, etc.
    end_date DATE, -- when studies ended, null if ongoing
    gpa DECIMAL(3, 2) CHECK (gpa >= 0 AND gpa <= 4.0), -- optional GPA on a 4.0 scale
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- row creation time
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time any field changed
);

CREATE INDEX idx_candidate_educations_user ON candidate_educations(user_id);
CREATE INDEX idx_candidate_educations_degree ON candidate_educations(highest_degree);



CREATE TABLE candidate_skills (
    skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- owning account
    skill_name VARCHAR(255) NOT NULL, -- skill tag, e.g. "React"
    proficiency_level skill_proficiency, -- self-rated proficiency for this skill
    years_of_experience INT CHECK (years_of_experience >= 0), -- years spent using this skill
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- row creation time
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time any field changed
);

CREATE INDEX idx_candidate_skills_user ON candidate_skills(user_id);
CREATE INDEX idx_candidate_skills_name ON candidate_skills(skill_name);
CREATE INDEX idx_candidate_skills_proficiency ON candidate_skills(proficiency_level);
