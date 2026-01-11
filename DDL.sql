DROP DATABASE IF EXISTS tokotniel;

CREATE DATABASE tokotniel;
USE tokotniel;
-- Tabel Users
CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance INT DEFAULT 0, -- Default saldo 0
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Services
CREATE TABLE services (
    service_code VARCHAR(50) PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    service_icon VARCHAR(255) NOT NULL,
    service_tariff INT NOT NULL
);

-- Tabel Transactions
CREATE TABLE transactions (
    invoice_number VARCHAR(50) PRIMARY KEY, -- Unik, contoh: INV17082023-001
    email VARCHAR(100) NOT NULL, -- User yang transaksi
    transaction_type ENUM('TOPUP', 'PAYMENT') NOT NULL,
    description VARCHAR(255) NOT NULL, -- Contoh: "Top Up balance" atau "Tagihan Listrik"
    total_amount INT NOT NULL,
    
    -- Kolom khusus Payment (Boleh NULL jika transaksinya Topup)
    service_code VARCHAR(50) NULL, 
    
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Menjaga integritas data (Relasi)
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (service_code) REFERENCES services(service_code)
);

-- Seeding Database
INSERT INTO services (service_code, service_name, service_icon, service_tariff) VALUES 
('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000);