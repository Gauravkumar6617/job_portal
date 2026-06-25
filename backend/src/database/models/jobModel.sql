CREATE TABLE jobs (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES company(company_id),
    recruiter_id UUID NOT NULL REFERENCES recruiter(recruiter_id),

    category_id UUID NOT NULL
        REFERENCES categories(category_id),



    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    salary_range VARCHAR(255),
    employment_type employment_type,
    experience_level experience_level,
    skills_required JSONB,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);