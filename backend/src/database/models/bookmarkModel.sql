CREATE TABLE bookmarks (
    bookmark_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    user_id UUID NOT NULL
        REFERENCES users(user_id) ON DELETE CASCADE, -- seeker who saved the job

    job_id UUID NOT NULL
        REFERENCES jobs(job_id) ON DELETE CASCADE, -- job that was saved (the "♡ Save" action on a job card)

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the job was saved

    UNIQUE (user_id, job_id) -- a seeker can only save a given job once
);

CREATE INDEX idx_bookmarks_job
ON bookmarks(job_id);
