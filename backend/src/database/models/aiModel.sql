CREATE TABLE ai_interactions (
    interaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(job_id) ON DELETE CASCADE,
    
    interaction_type ai_interaction_type NOT NULL DEFAULT 'chat',
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    context JSONB,
    tokens_used INTEGER,
    model_version VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE ai_embeddings (
    embedding_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    entity_type ai_entity_type NOT NULL,
    entity_id UUID NOT NULL,
    embedding vector(1536) NOT NULL,
    model_version VARCHAR(100) NOT NULL DEFAULT 'text-embedding-ada-002',
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(entity_type, entity_id)
);

CREATE TABLE ai_recommendations (
    recommendation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
    
    score DECIMAL(5,4) NOT NULL,
    reason TEXT,
    recommendation_type recommendation_type NOT NULL DEFAULT 'job_match',
    
    is_viewed BOOLEAN NOT NULL DEFAULT FALSE,
    is_applied BOOLEAN NOT NULL DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(user_id, job_id)
);

CREATE TABLE ai_analytics (
    analytics_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(job_id) ON DELETE CASCADE,
    
    metric_type ai_metric_type NOT NULL,
    metric_value JSONB NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_embeddings_entity ON ai_embeddings(entity_type, entity_id);
CREATE INDEX idx_ai_recommendations_user_score ON ai_recommendations(user_id, score DESC);
CREATE INDEX idx_ai_recommendations_job ON ai_recommendations(job_id);
CREATE INDEX idx_ai_interactions_user ON ai_interactions(user_id, created_at DESC);
CREATE INDEX idx_ai_analytics_type ON ai_analytics(metric_type, created_at DESC);
