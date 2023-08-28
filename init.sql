SELECT * FROM pg_extension WHERE extname = 'pgcrypto';

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO
$$
DECLARE
    lcount integer;

BEGIN    
    SELECT COUNT(*) FROM users 
    WHERE email = 'admin_user@gmail.com';

    IF (lcount <= 0) then
        INSERT INTO users (name, "lastName", email, password, role)
        VALUES (
        'admin_user', 
        'admin_user', 
        'admin_user@gmail.com',
        crypt('123456789', gen_salt('bf')), 
        'ADMIN'
        );
    END IF;
END;
$$