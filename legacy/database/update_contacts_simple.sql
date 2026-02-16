-- Script de mise à jour simple pour ajouter les colonnes service et pack
-- Exécutez ces commandes une par une dans votre base de données

-- Ajouter la colonne service (si elle n'existe pas déjà)
ALTER TABLE contacts ADD COLUMN service VARCHAR(255) AFTER telephone;

-- Ajouter la colonne pack (si elle n'existe pas déjà)
ALTER TABLE contacts ADD COLUMN pack VARCHAR(255) AFTER service;

