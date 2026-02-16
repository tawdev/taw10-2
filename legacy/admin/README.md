# Interface d'Administration TAW10

## Accès à l'administration

URL: `http://localhost/taw10/admin/`

## Identifiants par défaut

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Changez le mot de passe par défaut après la première connexion !

## Installation

1. Exécutez le script SQL pour créer la table admin :
   ```sql
   SOURCE database/add_admin_table.sql;
   ```
   Ou importez le fichier `database/add_admin_table.sql` dans phpMyAdmin.

2. Accédez à `http://localhost/taw10/admin/login.php`

## Fonctionnalités

### Dashboard
- Vue d'ensemble avec statistiques
- Contacts récents
- Témoignages récents

### Gestion des Contacts
- Liste de tous les contacts
- Voir les détails complets
- Supprimer des contacts

### Gestion des Témoignages
- Ajouter des témoignages
- Modifier des témoignages
- Supprimer des témoignages

### Gestion de l'Équipe
- Ajouter des membres
- Modifier des membres
- Supprimer des membres

## Structure des fichiers

```
admin/
├── includes/
│   ├── auth.php          # Fonctions d'authentification
│   ├── layout.php        # Layout principal
│   └── footer.php        # Footer du layout
├── assets/
│   ├── css/
│   │   └── admin.css     # Styles de l'administration
│   └── js/
│       └── admin.js      # JavaScript de l'administration
├── index.php             # Dashboard
├── login.php             # Page de connexion
├── logout.php            # Déconnexion
├── contacts.php          # Gestion des contacts
├── testimonials.php      # Gestion des témoignages
└── team.php              # Gestion de l'équipe
```

## Sécurité

- Les mots de passe sont hashés avec `password_hash()`
- Les sessions sont utilisées pour l'authentification
- Protection contre les injections SQL avec les requêtes préparées
- Validation des données d'entrée

