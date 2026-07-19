CREATE TABLE ai_interactions (
    interaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- user who triggered the AI interaction
    job_id UUID REFERENCES jobs(job_id) ON DELETE CASCADE, -- job the interaction relates to, if any

    interaction_type ai_interaction_type NOT NULL DEFAULT 'chat', -- which AI feature produced this row
    prompt TEXT NOT NULL, -- input sent to the model
    response TEXT NOT NULL, -- output returned by the model
    context JSONB, -- extra structured context passed to the model (profile snippet, job snippet, etc.)
    tokens_used INTEGER, -- token count for this call, used for cost tracking
    model_version VARCHAR(100), -- model identifier used for this call

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the interaction happened
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- last time this row changed
);

CREATE TABLE ai_embeddings (
    embedding_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    entity_type ai_entity_type NOT NULL, -- kind of row this embedding represents (job, candidate_profile, company, skill)
    entity_id UUID NOT NULL, -- id of that row (polymorphic, paired with entity_type)
    embedding vector(1536) NOT NULL, -- the embedding vector used for semantic similarity search
    model_version VARCHAR(100) NOT NULL DEFAULT 'text-embedding-ada-002', -- embedding model used to generate this vector

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the embedding was generated
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- last time the embedding was regenerated

    UNIQUE(entity_type, entity_id) -- one current embedding per entity
);

CREATE TABLE ai_recommendations (
    recommendation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- seeker the recommendation was generated for
    job_id UUID NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE, -- recommended job

    score DECIMAL(5,4) NOT NULL, -- match score/confidence, e.g. 0.8500 for "85% match"
    reason TEXT, -- human-readable explanation of the recommendation
    recommendation_type recommendation_type NOT NULL DEFAULT 'job_match', -- category of recommendation

    is_viewed BOOLEAN NOT NULL DEFAULT FALSE, -- whether the seeker has seen this recommendation
    is_applied BOOLEAN NOT NULL DEFAULT FALSE, -- whether the seeker applied to the recommended job

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- when the recommendation was generated
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), -- last time this row changed

    UNIQUE(user_id, job_id) -- one recommendation per user/job pair
);

CREATE TABLE ai_analytics (
    analytics_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- surrogate primary key

    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE, -- user the metric is attributed to, if any
    job_id UUID REFERENCES jobs(job_id) ON DELETE CASCADE, -- job the metric is attributed to, if any

    metric_type ai_metric_type NOT NULL, -- which metric this row records
    metric_value JSONB NOT NULL, -- metric payload, shape depends on metric_type

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() -- when the metric was recorded
);

CREATE INDEX idx_ai_embeddings_entity ON ai_embeddings(entity_type, entity_id);
CREATE INDEX idx_ai_recommendations_user_score ON ai_recommendations(user_id, score DESC);
CREATE INDEX idx_ai_recommendations_job ON ai_recommendations(job_id);
CREATE INDEX idx_ai_interactions_user ON ai_interactions(user_id, created_at DESC);
CREATE INDEX idx_ai_analytics_type ON ai_analytics(metric_type, created_at DESC);
