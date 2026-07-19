CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    name VARCHAR(255) NOT NULL, -- full display name
    email VARCHAR(255) NOT NULL UNIQUE, -- login identifier / contact email
    password_hash VARCHAR(255) NOT NULL, -- bcrypt/argon hash, never the raw password
    role role_type NOT NULL DEFAULT 'candidate', -- account type: candidate, recruiter, admin, or other
    is_verified BOOLEAN NOT NULL DEFAULT FALSE, -- email/identity verified (gates admin "Verify" action)
    phone VARCHAR(15) NOT NULL UNIQUE, -- contact number, also unique login-adjacent identifier
    refresh_token VARCHAR(255), -- current JWT refresh token, rotated on login/logout
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE, -- soft-delete / ban flag, keeps row for audit history
    reset_token VARCHAR(255), -- one-time token issued for password reset flow
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- account creation time
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- last time any field on this row changed
    deleted_at TIMESTAMP WITH TIME ZONE -- set when is_deleted becomes true, null otherwise
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_verified ON users(is_verified);
CREATE INDEX idx_users_deleted ON users(is_deleted);
CREATE INDEX idx_users_phone ON users(phone);
