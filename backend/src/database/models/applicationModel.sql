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

CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_user_status ON applications(user_id, status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);