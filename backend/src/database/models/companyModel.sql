CREATE TABLE company(
    company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(255),
    company_size VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    location VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()

)
;