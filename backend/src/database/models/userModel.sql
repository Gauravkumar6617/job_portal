CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Updated default function
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role role_type NOT NULL DEFAULT 'candidate',      
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    phone VARCHAR(15) NOT NULL UNIQUE,   
    refresh_token VARCHAR(255),                         
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,          
    reset_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- Upgraded to timezone-aware
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- Upgraded to timezone-aware
    deleted_at TIMESTAMP WITH TIME ZONE                         -- Upgraded to timezone-aware
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_verified ON users(is_verified);
CREATE INDEX idx_users_deleted ON users(is_deleted); 
CREATE INDEX idx_users_phone ON users(phone);