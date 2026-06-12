const db =
    require("./connection");

// Idempotent upgrades needed by the retry pipeline.
async function ensureSchema() {
    // Automate core table creation
    await db.query(`
        CREATE TABLE IF NOT EXISTS announcements (
          id SERIAL PRIMARY KEY,
          company_symbol VARCHAR(20) NOT NULL,
          title TEXT,
          pdf_url TEXT NOT NULL UNIQUE,
          local_path TEXT,
          announcement_time TIMESTAMP,
          download_status VARCHAR(20) DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT NOW()
        );
    `);

    // Rename legacy columns created with wrong names (idempotent via DO block)
    await db.query(`
        DO $$
        BEGIN
            IF EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name='announcements' AND column_name='symbol'
            ) THEN
                ALTER TABLE announcements RENAME COLUMN symbol TO company_symbol;
            END IF;
            IF EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name='announcements' AND column_name='announced_at'
            ) THEN
                ALTER TABLE announcements RENAME COLUMN announced_at TO announcement_time;
            END IF;
        END $$;
    `);
    await db.query(`
        CREATE TABLE IF NOT EXISTS company_state (
          symbol VARCHAR(20) PRIMARY KEY,
          last_seen_at TIMESTAMP NOT NULL
        );
    `);
    await db.query(`
        CREATE TABLE IF NOT EXISTS download_jobs (
          id SERIAL PRIMARY KEY,
          announcement_id INTEGER REFERENCES announcements(id),
          pdf_url TEXT NOT NULL,
          status VARCHAR(20) DEFAULT 'PENDING',
          retry_count INTEGER DEFAULT 0,
          claimed_by VARCHAR(100),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
    `);
    await db.query(`
        CREATE INDEX IF NOT EXISTS idx_download_jobs_status ON download_jobs(status);
    `);
    await db.query(`
        CREATE TABLE IF NOT EXISTS failed_jobs (
          id SERIAL PRIMARY KEY,
          announcement_id INTEGER REFERENCES announcements(id),
          pdf_url TEXT,
          error_message TEXT,
          retry_count INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW()
        );
    `);
    await db.query(`
        CREATE TABLE IF NOT EXISTS worker_heartbeats (
          worker_id VARCHAR(100) PRIMARY KEY,
          last_seen TIMESTAMP NOT NULL,
          status VARCHAR(20) DEFAULT 'ACTIVE'
        );
    `);

    // Dedupe before adding the unique index
    await db.query(

        `

DELETE FROM failed_jobs a

USING failed_jobs b

WHERE

a.id > b.id

AND

a.pdf_url = b.pdf_url

`

    );

    await db.query(

        `

ALTER TABLE failed_jobs

ADD COLUMN IF NOT EXISTS

retries INTEGER NOT NULL DEFAULT 0

`

    );

    await db.query(

        `

ALTER TABLE failed_jobs

ADD COLUMN IF NOT EXISTS

last_retry_at TIMESTAMPTZ

`

    );

    await db.query(

        `

CREATE UNIQUE INDEX IF NOT EXISTS

failed_jobs_pdf_url_key

ON failed_jobs(pdf_url)

`

    );

    console.log(
        "Schema Verified"
    );

}

module.exports =
    ensureSchema;
