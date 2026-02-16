<?php
session_start();
require_once dirname(__DIR__) . '/config/database.php';

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Non autorisé']);
    exit;
}

// Vérifier si c'est une requête POST avec un fichier
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Aucun fichier fourni']);
    exit;
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB

// Vérifier les erreurs d'upload
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'upload']);
    exit;
}

// Vérifier le type de fichier
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Type de fichier non autorisé. Formats acceptés: JPG, PNG, GIF, WEBP']);
    exit;
}

// Vérifier la taille
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Fichier trop volumineux. Taille maximale: 5MB']);
    exit;
}

// Créer le dossier uploads s'il n'existe pas
$uploadDir = dirname(__DIR__) . '/assets/images/team/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Générer un nom de fichier unique
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = 'team_' . time() . '_' . uniqid() . '.' . $extension;
$filePath = $uploadDir . $fileName;

// Déplacer le fichier
if (move_uploaded_file($file['tmp_name'], $filePath)) {
    // Retourner l'URL relative
    $url = 'assets/images/team/' . $fileName;
    echo json_encode([
        'success' => true,
        'message' => 'Image uploadée avec succès',
        'url' => $url
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'enregistrement du fichier']);
}
?>

