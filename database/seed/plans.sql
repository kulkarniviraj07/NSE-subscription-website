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
    25,
    30
)
ON CONFLICT (name) DO NOTHING;