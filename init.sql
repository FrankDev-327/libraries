SELECT * FROM pg_extension WHERE extname = 'pgcrypto';

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the books table if it does not exist
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  publisher VARCHAR NOT NULL
);

-- Create the users table if it does not exist
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR,
  lastName VARCHAR,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  active BOOLEAN DEFAULT true,
  book_id UUID,
  FOREIGN KEY (book_id) REFERENCES books(id)
);


DO
$$
DECLARE
    lcount VARCHAR := ''

BEGIN    
    SELECT email FROM users 
    WHERE email = 'admin_user@gmail.com';

    IF (lcount = NULL) then
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