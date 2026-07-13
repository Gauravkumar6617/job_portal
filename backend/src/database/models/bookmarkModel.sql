CREATE TABLE bookmarks (
    bookmark_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(user_id) ON DELETE CASCADE,

    job_id UUID NOT NULL
        REFERENCES jobs(job_id) ON DELETE CASCADE,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    UNIQUE (user_id, job_id)
);

CREATE INDEX idx_bookmarks_job
ON bookmarks(job_id);