USE myproj;

-- Clear out any existing dummy links
DELETE FROM pharmacy_links;

-- Seed highly realistic Indian market pharmacy data
INSERT INTO pharmacy_links (medicine_id, pharmacy_name, url, current_price, in_stock) VALUES
-- 1: Paracetamol 500mg (Regulated: 15.50)
(1, 'Tata 1mg', 'https://www.1mg.com/drugs/paracetamol-500mg-tablet-132304', 14.50, TRUE),
(1, 'PharmEasy', 'https://pharmeasy.in/search/all?name=paracetamol%20500mg', 15.20, TRUE),
(1, 'Netmeds', 'https://www.netmeds.com/prescriptions/paracetamol-500mg', 16.00, TRUE),
(1, 'Apollo Pharmacy', 'https://www.apollopharmacy.in/search-medicines/paracetamol%20500mg', 18.50, FALSE),

-- 2: Dolo 650 (Regulated: 25.00)
(2, 'Tata 1mg', 'https://www.1mg.com/drugs/dolo-650-tablet-74467', 24.00, TRUE),
(2, 'PharmEasy', 'https://pharmeasy.in/search/all?name=dolo%20650', 25.50, TRUE),
(2, 'Apollo Pharmacy', 'https://www.apollopharmacy.in/medicine/dolo-650mg-tab-15-s', 28.00, TRUE),

-- 3: Amoxicillin 250mg (Regulated: 85.00)
(3, 'Netmeds', 'https://www.netmeds.com/prescriptions/amoxicillin-250mg', 82.50, TRUE),
(3, 'Tata 1mg', 'https://www.1mg.com/search/all?name=Amoxicillin%20250mg', 86.00, TRUE),
(3, 'Truemeds', 'https://www.truemeds.in/search?name=amoxicillin', 75.00, TRUE),

-- 4: Cetirizine 10mg (Regulated: 18.00)
(4, 'PharmEasy', 'https://pharmeasy.in/search/all?name=cetirizine', 16.50, TRUE),
(4, 'Tata 1mg', 'https://www.1mg.com/drugs/cetirizine-10mg-tablet-14232', 17.80, TRUE),
(4, 'Netmeds', 'https://www.netmeds.com/prescriptions/cetirizine-10mg', 19.00, FALSE),

-- 5: Aspirin 75mg (Regulated: 12.00)
(5, 'Apollo Pharmacy', 'https://www.apollopharmacy.in/medicine/ecosprin-75mg-tab-14-s', 11.00, TRUE),
(5, 'Tata 1mg', 'https://www.1mg.com/drugs/ecosprin-75-tablet-132304', 11.50, TRUE),
(5, 'PharmEasy', 'https://pharmeasy.in/search/all?name=aspirin%2075', 13.00, TRUE),

-- 6: Azithromycin 500mg (Regulated: 95.00)
(6, 'Tata 1mg', 'https://www.1mg.com/search/all?name=Azithromycin%20500mg', 92.00, TRUE),
(6, 'Netmeds', 'https://www.netmeds.com/prescriptions/azithromycin-500mg', 96.50, TRUE),
(6, 'Apollo Pharmacy', 'https://www.apollopharmacy.in/search-medicines/azithromycin', 105.00, TRUE),

-- 7: Omeprazole 20mg (Regulated: 45.00)
(7, 'PharmEasy', 'https://pharmeasy.in/search/all?name=omeprazole%2020', 42.00, TRUE),
(7, 'Truemeds', 'https://www.truemeds.in/search?name=omeprazole', 39.00, TRUE),
(7, 'Tata 1mg', 'https://www.1mg.com/search/all?name=omeprazole', 46.00, FALSE),

-- 8: Metformin 500mg (Regulated: 28.00)
(8, 'Netmeds', 'https://www.netmeds.com/prescriptions/metformin-500mg', 25.50, TRUE),
(8, 'Tata 1mg', 'https://www.1mg.com/drugs/glycomet-500-tablet-12345', 27.00, TRUE),
(8, 'PharmEasy', 'https://pharmeasy.in/search/all?name=metformin', 29.00, TRUE);
