CREATE TABLE IF NOT EXISTS subscriptions (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    plan_id BIGINT NOT NULL,

    status VARCHAR(20) NOT NULL,

    start_date TIMESTAMP,

    end_date TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_subscription_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_subscription_plan
        FOREIGN KEY(plan_id)
        REFERENCES plans(id)

);