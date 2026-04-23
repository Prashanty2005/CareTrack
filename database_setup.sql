-- Medicine Database Schema V2

CREATE DATABASE IF NOT EXISTS medicine_info;
USE medicine_info;

DROP TABLE IF EXISTS medicines;

CREATE TABLE medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    mrp DECIMAL(10, 2) NOT NULL,
    regulated_price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    rank_score DECIMAL(5, 2) DEFAULT 0.0,
    pills_per_day INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 100+ Dummy Medicines
INSERT INTO medicines (name, company_name, generic_name, mrp, regulated_price, description, rank_score, pills_per_day) VALUES
-- Paracetamol Group
('Dolo 650', 'Micro Labs Ltd', 'Paracetamol', 30.00, 15.00, 'Used for fever and pain relief.', 9.5, 3),
('Calpol 500', 'GSK Pharmaceuticals', 'Paracetamol', 18.00, 12.00, 'Used to treat mild to moderate pain.', 8.8, 3),
('Crocin 650', 'GSK Pharmaceuticals', 'Paracetamol', 32.00, 16.00, 'Pain reliever and fever reducer.', 9.2, 3),
('Pacimol 650', 'Ipca Laboratories', 'Paracetamol', 28.00, 14.00, 'Effective in reducing fever.', 8.5, 3),
('P-250', 'Apex Labs', 'Paracetamol', 15.00, 8.00, 'Lower dose paracetamol.', 8.1, 4),
('Pyrigesic 650', 'East India Pharma', 'Paracetamol', 25.00, 12.00, 'For quick relief from fever.', 8.0, 3),
('Fevastin 500', 'Tablets India', 'Paracetamol', 20.00, 10.00, 'Fever medication.', 7.9, 4),
('Para 500', 'Generic Co', 'Paracetamol', 10.00, 5.00, 'Generic paracetamol.', 7.5, 4),
('Macfast 650', 'Macleods', 'Paracetamol', 29.00, 15.00, 'Trusted fever reducer.', 8.9, 3),
('P-650', 'Blue Cross', 'Paracetamol', 27.00, 13.00, 'Fast acting pain relief.', 8.6, 3),

-- Amoxycillin Group
('Augmentin 625 Duo', 'GSK Pharmaceuticals', 'Amoxycillin + Clavulanic Acid', 200.00, 110.00, 'Antibiotic used to treat bacterial infections.', 9.0, 2),
('Moxikind-CV 625', 'Mankind Pharma', 'Amoxycillin + Clavulanic Acid', 180.00, 95.00, 'Treats bacterial infections.', 8.7, 2),
('Clavam 625', 'Alkem Laboratories', 'Amoxycillin + Clavulanic Acid', 190.00, 105.00, 'Broad spectrum antibiotic.', 8.9, 2),
('Advent 625', 'Cipla Ltd', 'Amoxycillin + Clavulanic Acid', 195.00, 100.00, 'Effective against many bacteria.', 8.8, 2),
('Novamox 500', 'Cipla Ltd', 'Amoxycillin', 120.00, 65.00, 'Penicillin antibiotic.', 8.5, 3),
('Mox 500', 'Sun Pharma', 'Amoxycillin', 115.00, 60.00, 'Used for respiratory infections.', 8.6, 3),
('Wymox 500', 'Pfizer', 'Amoxycillin', 130.00, 70.00, 'Premium amoxicillin.', 9.1, 3),
('Amoxil 500', 'GSK', 'Amoxycillin', 125.00, 68.00, 'Standard antibiotic.', 8.4, 3),
('Almox 500', 'Alkem', 'Amoxycillin', 110.00, 55.00, 'Cost-effective antibiotic.', 8.2, 3),
('Synclar 500', 'Cipla Ltd', 'Amoxycillin', 118.00, 62.00, 'Reliable antibiotic.', 8.3, 3),

-- Pantoprazole Group
('Pan 40', 'Alkem Laboratories', 'Pantoprazole', 150.00, 60.00, 'Reduces the amount of acid produced in the stomach.', 9.2, 1),
('Pantocid 40', 'Sun Pharma', 'Pantoprazole', 145.00, 65.00, 'Treats acid reflux.', 9.0, 1),
('Pantodac 40', 'Zydus Cadila', 'Pantoprazole', 140.00, 58.00, 'Effective acidity medication.', 8.8, 1),
('Pentab 40', 'Alembic', 'Pantoprazole', 135.00, 55.00, 'Prevents stomach ulcers.', 8.5, 1),
('Pansec 40', 'Cipla Ltd', 'Pantoprazole', 142.00, 62.00, 'Reduces stomach acid.', 8.9, 1),
('Panto 40', 'Generic Co', 'Pantoprazole', 80.00, 30.00, 'Generic antacid.', 7.8, 1),
('Nupenta 40', 'Macleods', 'Pantoprazole', 130.00, 50.00, 'Trusted acidity reducer.', 8.4, 1),
('Protera 40', 'Lupin', 'Pantoprazole', 138.00, 56.00, 'Fast acting antacid.', 8.6, 1),
('Pantotab 40', 'Micro Labs', 'Pantoprazole', 125.00, 48.00, 'Cost effective acid relief.', 8.2, 1),
('Gastro-P 40', 'Apex', 'Pantoprazole', 120.00, 45.00, 'Daily antacid.', 8.1, 1),

-- Telmisartan Group
('Telmikind 40', 'Mankind Pharma', 'Telmisartan', 75.00, 35.00, 'Used to treat high blood pressure.', 8.5, 1),
('Telma 40', 'Glenmark', 'Telmisartan', 95.00, 50.00, 'Popular BP medication.', 9.1, 1),
('Tazloc 40', 'USV', 'Telmisartan', 85.00, 45.00, 'Effective hypertension control.', 8.8, 1),
('Telvas 40', 'Aristo', 'Telmisartan', 80.00, 40.00, 'Regulates blood pressure.', 8.6, 1),
('Cresar 40', 'Cipla Ltd', 'Telmisartan', 90.00, 48.00, 'High quality BP control.', 8.9, 1),
('Inditel 40', 'Zydus', 'Telmisartan', 82.00, 42.00, 'Reliable BP med.', 8.4, 1),
('Telpres 40', 'Abbott', 'Telmisartan', 92.00, 49.00, 'Reduces heart risks.', 8.7, 1),
('Sartel 40', 'Intas', 'Telmisartan', 88.00, 46.00, 'Daily hypertension med.', 8.5, 1),
('Tel Day 40', 'Torrent', 'Telmisartan', 84.00, 43.00, 'Helps control BP.', 8.3, 1),
('Arbitel 40', 'Micro Labs', 'Telmisartan', 78.00, 38.00, 'Cost-effective BP control.', 8.2, 1),

-- Azithromycin Group
('Azee 500', 'Cipla Ltd', 'Azithromycin', 120.00, 70.00, 'Used to treat various types of bacterial infections.', 9.1, 1),
('Azithral 500', 'Alembic', 'Azithromycin', 115.00, 65.00, 'Strong antibiotic.', 8.9, 1),
('Zithrox 500', 'Macleods', 'Azithromycin', 110.00, 60.00, 'Treats respiratory infections.', 8.7, 1),
('Azicip 500', 'Cipla Ltd', 'Azithromycin', 105.00, 55.00, 'Cost-effective antibiotic.', 8.5, 1),
('Azax 500', 'Sun Pharma', 'Azithromycin', 118.00, 68.00, 'Reliable infection control.', 9.0, 1),
('Zeethrom 500', 'Zydus', 'Azithromycin', 112.00, 62.00, 'Antibiotic for severe infections.', 8.6, 1),
('Aziwok 500', 'Wockhardt', 'Azithromycin', 108.00, 58.00, 'Standard azithromycin.', 8.4, 1),
('Azibact 500', 'Ipca', 'Azithromycin', 114.00, 64.00, 'Effective bacterial control.', 8.8, 1),
('Atmos 500', 'Torrent', 'Azithromycin', 116.00, 66.00, 'Premium antibiotic.', 8.9, 1),
('Azivent 500', 'Aristo', 'Azithromycin', 100.00, 50.00, 'Economical azithromycin.', 8.2, 1),

-- Cetirizine Group
('Okacet', 'Cipla Ltd', 'Cetirizine', 20.00, 8.00, 'Treats allergic symptoms like itching, sneezing.', 8.0, 1),
('Cetzine', 'Dr Reddys', 'Cetirizine', 25.00, 12.00, 'Popular allergy medication.', 8.9, 1),
('Alerid', 'Cipla Ltd', 'Cetirizine', 22.00, 10.00, 'Fast allergy relief.', 8.5, 1),
('Zyrtec', 'GSK', 'Cetirizine', 30.00, 15.00, 'Premium antihistamine.', 9.1, 1),
('Incid-L', 'Bayer', 'Cetirizine', 28.00, 14.00, 'Reliable allergy control.', 8.8, 1),
('Cetiriz', 'Alkem', 'Cetirizine', 18.00, 7.00, 'Cost-effective allergy med.', 8.2, 1),
('Zyncet', 'Unichem', 'Cetirizine', 21.00, 9.00, 'Treats runny nose.', 8.4, 1),
('Cetash', 'Ashco', 'Cetirizine', 15.00, 5.00, 'Generic antihistamine.', 7.8, 1),
('Cetgel', 'Lupin', 'Cetirizine', 24.00, 11.00, 'Softgel allergy relief.', 8.6, 1),
('Allercet', 'Micro Labs', 'Cetirizine', 19.00, 8.50, 'Effective against sneezes.', 8.1, 1),

-- Ibuprofen Group
('Brufen 400', 'Abbott', 'Ibuprofen', 15.00, 8.00, 'Reduces pain and inflammation.', 9.0, 3),
('Ibugesic 400', 'Cipla Ltd', 'Ibuprofen', 14.00, 7.00, 'Fast acting pain killer.', 8.8, 3),
('Combiflam', 'Sanofi', 'Ibuprofen + Paracetamol', 40.00, 20.00, 'Strong pain relief.', 9.2, 3),
('Flexon', 'Aristo', 'Ibuprofen + Paracetamol', 35.00, 18.00, 'Reduces swelling and pain.', 8.9, 3),
('Ibuclin', 'Dr Reddys', 'Ibuprofen + Paracetamol', 38.00, 19.00, 'Effective for muscle pain.', 8.7, 3),
('Advil', 'Pfizer', 'Ibuprofen', 50.00, 30.00, 'Premium pain relief.', 9.4, 3),
('Motrin', 'J&J', 'Ibuprofen', 45.00, 25.00, 'Trusted inflammation reducer.', 9.1, 3),
('Anaflam', 'Lupin', 'Ibuprofen', 16.00, 8.50, 'Daily pain med.', 8.4, 3),
('Ibupara', 'Micro Labs', 'Ibuprofen + Paracetamol', 30.00, 15.00, 'Dual action pain killer.', 8.5, 3),
('Fenak', 'Sun Pharma', 'Ibuprofen', 18.00, 9.00, 'Cost effective pain med.', 8.3, 3),

-- Metformin Group
('Glycomet 500', 'USV', 'Metformin', 20.00, 12.00, 'Controls blood sugar levels.', 9.0, 2),
('Metsmall 500', 'Dr Reddys', 'Metformin', 18.00, 10.00, 'Type 2 diabetes medication.', 8.8, 2),
('Okamet 500', 'Cipla Ltd', 'Metformin', 19.00, 11.00, 'Helps manage diabetes.', 8.9, 2),
('Walaphage 500', 'Wallace', 'Metformin', 17.00, 9.00, 'Sugar control pill.', 8.5, 2),
('Exermet 500', 'Cipla Ltd', 'Metformin', 22.00, 13.00, 'Extended release metformin.', 9.1, 1),
('Cetapin 500', 'Sanofi', 'Metformin', 21.00, 12.50, 'Effective diabetes control.', 8.7, 2),
('Obimet 500', 'Abbott', 'Metformin', 20.00, 11.50, 'Trusted sugar med.', 8.6, 2),
('Zomet 500', 'Intas', 'Metformin', 18.50, 10.50, 'Daily diabetes pill.', 8.4, 2),
('Riomet 500', 'Sun Pharma', 'Metformin', 23.00, 14.00, 'Premium sugar control.', 9.0, 2),
('Metaday 500', 'Wockhardt', 'Metformin', 16.00, 8.00, 'Economical metformin.', 8.2, 2),

-- Amlodipine Group
('Amlokind 5', 'Mankind Pharma', 'Amlodipine', 25.00, 12.00, 'Lowers blood pressure.', 8.8, 1),
('Amlong 5', 'Micro Labs', 'Amlodipine', 28.00, 15.00, 'Effective BP control.', 9.0, 1),
('Stamlo 5', 'Dr Reddys', 'Amlodipine', 30.00, 16.00, 'Trusted hypertension med.', 9.1, 1),
('Amdepin 5', 'Zydus', 'Amlodipine', 26.00, 13.00, 'Daily BP pill.', 8.7, 1),
('Amlopres 5', 'Cipla Ltd', 'Amlodipine', 29.00, 15.50, 'Heart health medication.', 8.9, 1),
('Amloza 5', 'Sun Pharma', 'Amlodipine', 27.00, 14.00, 'Controls high BP.', 8.6, 1),
('Corvadil 5', 'Unichem', 'Amlodipine', 24.00, 11.00, 'Economical BP med.', 8.4, 1),
('Lupodip 5', 'Lupin', 'Amlodipine', 25.50, 12.50, 'Reliable amlodipine.', 8.5, 1),
('Numlo 5', 'Emcure', 'Amlodipine', 31.00, 17.00, 'Premium BP medicine.', 9.2, 1),
('Amlosafe 5', 'Aristo', 'Amlodipine', 22.00, 10.00, 'Cost effective heart pill.', 8.3, 1),

-- Levocetirizine Group
('Levocet 5', 'Micro Labs', 'Levocetirizine', 35.00, 18.00, 'Non-drowsy allergy relief.', 9.0, 1),
('1-AL 5', 'FDC', 'Levocetirizine', 40.00, 20.00, 'Fast acting antihistamine.', 9.2, 1),
('Teczine 5', 'Sun Pharma', 'Levocetirizine', 42.00, 22.00, 'Premium allergy pill.', 9.3, 1),
('Levorid 5', 'Cipla Ltd', 'Levocetirizine', 38.00, 19.00, 'Trusted allergy med.', 8.9, 1),
('Vozet 5', 'Dr Reddys', 'Levocetirizine', 39.00, 20.50, 'Effective against sneezes.', 9.1, 1),
('L-Cin 5', 'Lupin', 'Levocetirizine', 36.00, 18.50, 'Daily allergy relief.', 8.8, 1),
('Levocad 5', 'Zydus', 'Levocetirizine', 34.00, 17.00, 'Reliable antihistamine.', 8.7, 1),
('Levosiz 5', 'Systopic', 'Levocetirizine', 33.00, 16.50, 'Economical allergy pill.', 8.5, 1),
('Laveta 5', 'Alembic', 'Levocetirizine', 41.00, 21.00, 'Strong allergy control.', 9.0, 1),
('Hifenac 5', 'Intas', 'Levocetirizine', 37.00, 19.50, 'Reduces runny nose.', 8.6, 1)
ON DUPLICATE KEY UPDATE name=name;
