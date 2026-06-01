CREATE TABLE user_companies (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    company_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_user_company_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_company_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_company
        UNIQUE(user_id, company_id)

);