CREATE TABLE jobs (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- account of whoever posted the job (same person as recruiter_id's user)
    company_id UUID NOT NULL REFERENCES company(company_id), -- company this job is posted under
    recruiter_id UUID NOT NULL REFERENCES recruiter(recruiter_id), -- the membership row of the recruiter who owns this posting, used to scope "see own jobs only"

    category_id UUID NOT NULL
        REFERENCES categories(category_id), -- job category/domain, e.g. "Engineering"

    title VARCHAR(255) NOT NULL, -- job title, e.g. "React Developer"
    description TEXT NOT NULL, -- full rich-text job description
    location VARCHAR(255), -- work location, e.g. "Bangalore" or "Remote"
    salary_range VARCHAR(255), -- displayed salary band, e.g. "₹10L-₹14L"
    employment_type employment_type, -- full-time / part-time / internship / ...
    experience_level experience_level, -- entry-level / mid-level / senior-level / ...
    skills_required JSONB, -- array of required skill tags shown as chips on the job card

    openings INT NOT NULL DEFAULT 1, -- number of positions being hired for
    application_deadline DATE, -- last date candidates can apply
    status job_status NOT NULL DEFAULT 'active', -- active / paused / closed, drives the ●/◌/✕ markers on the recruiter job list
    is_featured BOOLEAN NOT NULL DEFAULT FALSE, -- admin-set flag that pins the job to the top of search results (paid feature)

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the job was posted
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time any field on this row changed
);

CREATE INDEX idx_jobs_user ON jobs(user_id);
CREATE INDEX idx_jobs_company ON jobs(company_id);
CREATE INDEX idx_jobs_recruiter ON jobs(recruiter_id);
CREATE INDEX idx_jobs_category ON jobs(category_id);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_employment_type ON jobs(employment_type);
CREATE INDEX idx_jobs_experience_level ON jobs(experience_level);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
