CREATE TABLE company(
    company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key
    name VARCHAR(255) NOT NULL, -- company display name, e.g. "Acme Corp"
    description TEXT, -- long-form "About the company" text shown on the company profile
    logo_url VARCHAR(255), -- uploaded logo image
    industry VARCHAR(255), -- sector shown next to the company name, e.g. "Software"
    company_size VARCHAR(255), -- employee headcount band, e.g. "500-1000 employees"
    company_type VARCHAR(255), -- org type, e.g. "Startup", "MNC", "Agency"
    email VARCHAR(255) UNIQUE NOT NULL, -- company's contact email
    phone_number VARCHAR(20) UNIQUE, -- company's contact phone number
    city VARCHAR(255), -- headquarters city
    state VARCHAR(255), -- headquarters state/region
    country VARCHAR(255), -- headquarters country
    is_verified BOOLEAN NOT NULL DEFAULT FALSE, -- set by admin after verifying the company is legitimate
    is_active BOOLEAN NOT NULL DEFAULT TRUE, -- set false to suspend the company (admin "Suspend" action)
    location VARCHAR(255), -- free-text display location, e.g. "Bangalore, India"
    website VARCHAR(255), -- company website URL
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- row creation time
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time any field on this row changed
);

CREATE INDEX idx_company_email ON company(email);
CREATE INDEX idx_company_location ON company(city, state, country);
CREATE INDEX idx_company_active ON company(is_active);
CREATE INDEX idx_company_name ON company(name);
