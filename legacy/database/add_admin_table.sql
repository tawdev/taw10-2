-- Script pour ajouter la table admins à la base de données existante
USE taw10_db;

-- Créer la table admins si elle n'existe pas
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insérer l'administrateur par défaut
-- Username: admin
-- Password: admin123
-- Le mot de passe est hashé avec password_hash() - hash pour "admin123"
INSERT INTO admins (username, email, password, full_name) 
VALUES ('admin', 'admin@taw10.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrateur Principal')
ON DUPLICATE KEY UPDATE username=username;

