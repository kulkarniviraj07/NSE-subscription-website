CREATE TABLE IF NOT EXISTS payments (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    subscription_id BIGINT,

    razorpay_order_id VARCHAR(255),

    razorpay_payment_id VARCHAR(255),

    amount NUMERIC(10,2),

    status VARCHAR(20),

    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_payment_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_payment_subscription
        FOREIGN KEY(subscription_id)
        REFERENCES subscriptions(id)
        ON DELETE SET NULL

);