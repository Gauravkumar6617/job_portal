-- Email invite a company Owner/Manager sends to bring a new recruiter onto the team.
-- Accepting the invite (via token link) creates/activates a matching row in `recruiter`.
CREATE TABLE invites (
    invite_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    company_id UUID NOT NULL REFERENCES company(company_id) ON DELETE CASCADE, -- company the invitee is being invited into
    inviter_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- the Owner/Manager who sent the invite
    invitee_email VARCHAR(255) NOT NULL, -- email address the invite link is sent to
    invitee_name VARCHAR(255), -- optional name filled in by the inviter, used to prefill the invite email
    role member_role NOT NULL DEFAULT 'recruiter', -- permission tier the invitee will be granted once they accept
    status invite_status NOT NULL DEFAULT 'pending', -- pending / accepted / expired / revoked
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the invite was sent
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time status changed (e.g. accepted_at substitute)
);

CREATE INDEX idx_invites_company ON invites(company_id);
CREATE INDEX idx_invites_email ON invites(invitee_email);
CREATE INDEX idx_invites_status ON invites(status);
