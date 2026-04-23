CREATE TABLE IF NOT EXISTS pharmacy_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_id INT NOT NULL,
    pharmacy_name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
);

-- Insert some dummy data for the first medicine (Paracetamol 500mg, assuming id=1)
-- Also for Dolo 650 (assuming id=2)
INSERT INTO pharmacy_links (medicine_id, pharmacy_name, url, current_price, in_stock) VALUES
(1, '1mg', 'https://www.1mg.com', 28.50, TRUE),
(1, 'PharmEasy', 'https://pharmeasy.in', 29.00, TRUE),
(1, 'Apollo Pharmacy', 'https://www.apollopharmacy.in', 30.00, FALSE),
(2, '1mg', 'https://www.1mg.com', 38.00, TRUE),
(2, 'Netmeds', 'https://www.netmeds.com', 39.50, TRUE);
