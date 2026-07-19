CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- recipient of the notification
    job_id UUID REFERENCES jobs(job_id) ON DELETE CASCADE, -- job this notification is about, e.g. "New applicant on Job X" (nullable)
    application_id UUID REFERENCES applications(application_id) ON DELETE CASCADE, -- application this notification is about, e.g. "Moved to Shortlist" (nullable)
    message TEXT NOT NULL, -- rendered notification text
    notification_type notification_type NOT NULL, -- info / warning / error / success, drives the icon/color
    is_read notification_status NOT NULL DEFAULT 'unread', -- unread / read, toggled once the user opens it
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the notification was generated
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time is_read (or anything else) changed
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
