-- Base de datos para TAW10
CREATE DATABASE IF NOT EXISTS taw10_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taw10_db;

-- Tabla de contactos
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_complet VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(50) NOT NULL,
    service VARCHAR(255),
    pack VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de testimonios
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    poste VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de equipo
CREATE TABLE IF NOT EXISTS team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    poste VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos iniciales de testimonios
INSERT INTO testimonials (nom, poste, message) VALUES
('Paddy Hardy', 'Entrepreneur', 'TAW 10 a transformé notre expérience de domiciliation. Rapide, transparent et professionnel – une adresse prestigieuse qui booste vraiment notre image !'),
('Hari Wheatley', 'Manager', 'Excellente expérience avec TAW 10. Le processus est simple, l\'équipe est réactive, et le service de secrétariat virtuel est top. Recommandé sans hésitation.'),
('Priscilla Russo', 'CEO Brand', 'TAW 10 offre un service de domiciliation impeccable. Leur support administratif personnalisé est un véritable atout pour notre gestion quotidienne. Très satisfait !'),
('Fannie Sanders', 'Entrepreneur', 'Depuis que nous avons choisi TAW 10, notre entreprise a gagné en visibilité et en crédibilité. Leur accompagnement est exceptionnel, et leur service en ligne est très pratique.');

-- Insertar datos iniciales del equipo
INSERT INTO team (nom, poste, description) VALUES
('Hicham MHAMEDI', 'CEO', 'PDG de TAW 10, expert en création d\'entreprise et domiciliation au Maroc.'),
('Salma AAOUAD', 'Sales Department', 'Spécialiste en vente et relation client, dédiée à votre satisfaction.'),
('AFAFE KHLIFAL', 'Office Manager', 'Gestionnaire de bureau expérimentée, garantissant le bon fonctionnement de nos services.');

-- Tabla de administradores
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar administrador por defecto (username: admin, password: admin123)
-- Le mot de passe est hashé avec password_hash() - hash pour "admin123"
INSERT INTO admins (username, email, password, full_name) VALUES
('admin', 'admin@taw10.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrateur Principal');

