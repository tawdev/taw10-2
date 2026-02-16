<?php
session_start();
require_once 'config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom_complet = isset($_POST['nom_complet']) ? trim($_POST['nom_complet']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $telephone = isset($_POST['telephone']) ? trim($_POST['telephone']) : '';
    $service_pack = isset($_POST['service_pack']) ? trim($_POST['service_pack']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    require_once 'includes/lang.php';
    
    // Validation
    if (empty($nom_complet) || empty($email) || empty($telephone) || empty($service_pack) || empty($message)) {
        $_SESSION['error'] = true;
        $_SESSION['error_type'] = 'error_validation';
        header('Location: index.php#contact');
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = true;
        $_SESSION['error_type'] = 'error_email';
        header('Location: index.php#contact');
        exit;
    }
    
    // Séparer service_pack en service et pack
    $service = '';
    $pack = '';
    if (strpos($service_pack, 'service:') === 0) {
        $service = substr($service_pack, 8); // Enlever "service:"
    } elseif (strpos($service_pack, 'pack:') === 0) {
        $pack = substr($service_pack, 5); // Enlever "pack:"
    }
    
    // Insertion dans la base de données
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO contacts (nom_complet, email, telephone, service, pack, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $nom_complet, $email, $telephone, $service, $pack, $message);
    
    if ($stmt->execute()) {
        $_SESSION['success'] = true;
    } else {
        $_SESSION['error'] = true;
        $_SESSION['error_type'] = 'error_message';
    }
    
    $stmt->close();
    $conn->close();
    
    header('Location: index.php#contact');
    exit;
} else {
    header('Location: index.php');
    exit;
}
?>

