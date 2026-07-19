-- Membership of a user inside a company (the "company_members" join table).
-- One user can belong to multiple companies, and one company can have multiple recruiters,
-- each with their own permission tier (owner/manager/recruiter) as shown in the
-- "COMPANY ROLES & PERMISSIONS" access table.
CREATE TABLE recruiter(
    recruiter_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- the platform account this membership belongs to
    company_id UUID NOT NULL REFERENCES company(company_id) ON DELETE CASCADE, -- the company the user is a member of
    name VARCHAR(255) NOT NULL, -- display name shown in the company's member list
    email VARCHAR(255) UNIQUE NOT NULL, -- contact email for this membership
    phone_number VARCHAR(20) UNIQUE, -- contact phone for this membership
    designation role_at_company NOT NULL DEFAULT 'other', -- job title shown next to their name, e.g. "Manager", "CTO" (display only)
    member_role member_role NOT NULL DEFAULT 'recruiter', -- permission tier: owner, manager, or recruiter (see roles & permissions table)
    status member_status NOT NULL DEFAULT 'pending', -- active once the invite is accepted, "removed" if kicked out instead of hard-deleting the row
    invited_by UUID REFERENCES users(user_id) ON DELETE SET NULL, -- who invited this member (null for the founding owner who created the company)
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when this membership was created
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time role/status/details changed
);

CREATE INDEX idx_recruiter_user ON recruiter(user_id);
CREATE INDEX idx_recruiter_company ON recruiter(company_id);
CREATE INDEX idx_recruiter_email ON recruiter(email);
CREATE INDEX idx_recruiter_company_role ON recruiter(company_id, member_role);
