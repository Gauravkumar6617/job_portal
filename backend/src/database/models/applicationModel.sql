CREATE TABLE applications (
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- the seeker who applied
    job_id UUID NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE, -- the job applied to

    status application_status NOT NULL DEFAULT 'applied', -- current pipeline stage, mirrors the recruiter's Kanban column
    cover_letter TEXT, -- optional cover letter text submitted with the application
    resume_url VARCHAR(255), -- resume used for this application (profile resume or a freshly uploaded one)
    portfolio_url VARCHAR(255), -- optional link to portfolio/personal site

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the application was submitted
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- last time status or any field changed

    UNIQUE(user_id, job_id) -- a seeker can only apply once to a given job
);

CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_user_status ON applications(user_id, status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);

-- Audit trail of every pipeline-stage change on an application. Powers both the seeker's
-- "My Applications" status tracker and the recruiter's internal notes ("Strong frontend,
-- weak on system design. Schedule round 2.") left when moving a candidate between stages.
CREATE TABLE application_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    application_id UUID NOT NULL REFERENCES applications(application_id) ON DELETE CASCADE, -- application this log entry belongs to
    from_status application_status, -- stage before the change, null for the initial "applied" entry
    to_status application_status NOT NULL, -- stage after the change
    changed_by UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- recruiter (or system) who made the change
    note TEXT, -- optional internal note left by the recruiter at this stage
    changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- when the change happened
);

CREATE INDEX idx_application_logs_application ON application_logs(application_id, changed_at DESC);
CREATE INDEX idx_application_logs_changed_by ON application_logs(changed_by);
