# TAW10 - Site Web de Création d'Entreprise et Domiciliation

Site web professionnel pour TAW10, spécialisé dans la création d'entreprise et la domiciliation au Maroc.

## Technologies Utilisées

- **PHP** - Backend et logique serveur
- **MySQL** - Base de données
- **CSS3** - Styles modernes et responsive
- **JavaScript** - Interactivité et animations
- **Font Awesome** - Icônes

## Structure du Projet

```
taw10/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── config/
│   └── database.php
├── database/
│   └── schema.sql
├── includes/
│   ├── header.php
│   └── footer.php
├── index.php
├── process_contact.php
└── README.md
```

## Installation

### 1. Configuration de la Base de Données

1. Créez une base de données MySQL nommée `taw10_db`
2. Importez le fichier `database/schema.sql` dans votre base de données
3. Modifiez les paramètres de connexion dans `config/database.php` si nécessaire:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'taw10_db');
```

### 2. Configuration du Serveur

1. Placez le projet dans le dossier `htdocs` de XAMPP (ou votre serveur web)
2. Assurez-vous que Apache et MySQL sont démarrés dans XAMPP
3. Accédez au site via: `http://localhost/taw10/`

### 3. Permissions

Assurez-vous que PHP a les permissions nécessaires pour écrire dans la base de données.

## Fonctionnalités

- ✅ Page d'accueil complète avec toutes les sections
- ✅ Formulaire de contact fonctionnel
- ✅ Gestion des témoignages depuis la base de données
- ✅ Affichage de l'équipe depuis la base de données
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation fluide avec scroll smooth
- ✅ Menu mobile hamburger
- ✅ Animations au scroll
- ✅ Support multilingue (ar, fr, en) - structure prête

## Sections du Site

1. **Hero** - Section principale avec CTA
2. **Stats** - Statistiques des clients
3. **Pourquoi Nous** - Avantages de TAW10
4. **Services** - 6 services principaux
5. **À Propos** - Informations sur l'entreprise
6. **Tarifs** - 4 plans tarifaires
7. **Comment Ça Marche** - Processus en 3 étapes
8. **Témoignages** - Avis clients
9. **Équipe** - Membres de l'équipe
10. **Contact** - Formulaire de contact

## Base de Données

### Tables

- **contacts** - Messages du formulaire de contact
- **testimonials** - Témoignages clients
- **team** - Membres de l'équipe

## Personnalisation

### Modifier les couleurs

Éditez les variables CSS dans `assets/css/style.css`:

```css
:root {
    --primary-color: #1a5f7a;
    --secondary-color: #2c8f8f;
    --accent-color: #f39c12;
    /* ... */
}
```

### Ajouter du contenu

- **Services**: Modifiez la section services dans `index.php`
- **Tarifs**: Modifiez les plans tarifaires dans `index.php`
- **Témoignages**: Ajoutez des entrées dans la table `testimonials`
- **Équipe**: Ajoutez des membres dans la table `team`

## Support

Pour toute question ou assistance, contactez: Contact@taw10.ma

## Licence

© 2024 TAW10. Tous droits réservés.

