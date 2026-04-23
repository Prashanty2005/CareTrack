ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user';

-- Let's make an admin user to test with, or upgrade an existing one.
-- UPDATE users SET role = 'admin' WHERE id = 1;
