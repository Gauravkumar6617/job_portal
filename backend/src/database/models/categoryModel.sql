CREATE TABLE categories (
    category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    name VARCHAR(255) NOT NULL UNIQUE, -- category name, e.g. "Engineering"
    description TEXT, -- optional description of the category

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- row creation time
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time any field changed
);

CREATE INDEX idx_categories_name ON categories(name);
