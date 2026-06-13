INSERT INTO plans (
    name,
    price,
    company_limit,
    duration_days
)
VALUES

(
    'FREE',
    0,
    5,
    3650
),

(
    'PREMIUM',
    119,
    150,
    30
)
ON CONFLICT (name) DO UPDATE SET
    price         = EXCLUDED.price,
    company_limit = EXCLUDED.company_limit,
    duration_days = EXCLUDED.duration_days;
