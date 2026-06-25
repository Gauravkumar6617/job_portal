CREATE TABLE applications (
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,

    status application_status NOT NULL DEFAULT 'pending',
    cover_letter TEXT,
    resume_url VARCHAR(255),
    portfolio_url VARCHAR(255),

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);