CREATE TABLE IF NOT EXISTS balkon_leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);