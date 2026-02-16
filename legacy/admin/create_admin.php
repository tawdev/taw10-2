<?php
/**
 * Script pour créer la table admins et l'utilisateur admin par défaut
 * Exécutez ce script une seule fois via le navigateur : http://localhost/taw10/admin/create_admin.php
 * Supprimez ce fichier après utilisation pour des raisons de sécurité
 */

require_once dirname(__DIR__) . '/config/database.php';

// Créer la table admins
$conn = getDBConnection();

$createTableSQL = "
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

if ($conn->query($createTableSQL)) {
    echo "<p style='color: green;'>✓ Table 'admins' créée avec succès</p>";
} else {
    echo "<p style='color: red;'>✗ Erreur lors de la création de la table: " . $conn->error . "</p>";
}

// Créer l'utilisateur admin par défaut
$username = 'admin';
$email = 'admin@taw10.ma';
$password = 'admin123';
$full_name = 'Administrateur Principal';

// Générer le hash du mot de passe
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Vérifier si l'admin existe déjà
$check = $conn->prepare("SELECT id FROM admins WHERE username = ? OR email = ?");
$check->bind_param("ss", $username, $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    // Mettre à jour le mot de passe si l'admin existe déjà
    $update = $conn->prepare("UPDATE admins SET password = ?, full_name = ? WHERE username = ?");
    $update->bind_param("sss", $password_hash, $full_name, $username);
    if ($update->execute()) {
        echo "<p style='color: green;'>✓ Mot de passe de l'administrateur mis à jour</p>";
    } else {
        echo "<p style='color: red;'>✗ Erreur lors de la mise à jour: " . $conn->error . "</p>";
    }
    $update->close();
} else {
    // Créer le nouvel admin
    $insert = $conn->prepare("INSERT INTO admins (username, email, password, full_name) VALUES (?, ?, ?, ?)");
    $insert->bind_param("ssss", $username, $email, $password_hash, $full_name);
    if ($insert->execute()) {
        echo "<p style='color: green;'>✓ Administrateur créé avec succès</p>";
        echo "<p><strong>Identifiants:</strong></p>";
        echo "<ul>";
        echo "<li>Username: <strong>admin</strong></li>";
        echo "<li>Password: <strong>admin123</strong></li>";
        echo "</ul>";
    } else {
        echo "<p style='color: red;'>✗ Erreur lors de la création: " . $conn->error . "</p>";
    }
    $insert->close();
}

$check->close();
$conn->close();

echo "<hr>";
echo "<p style='color: orange;'><strong>⚠️ IMPORTANT:</strong> Supprimez ce fichier (create_admin.php) après utilisation pour des raisons de sécurité !</p>";
echo "<p><a href='login.php'>Aller à la page de connexion</a></p>";
?>

