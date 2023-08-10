SELECT * FROM pg_extension WHERE extname = 'pgcrypto';

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, "lastName", email, password, role)
VALUES (
    'admin_user', 
    'admin_user', 
    'admin_user@gmail.com',
    crypt('123456789', gen_salt('bf')), 
    'ADMIN'
);