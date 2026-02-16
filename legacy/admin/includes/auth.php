<?php
session_start();
require_once dirname(dirname(__DIR__)) . '/config/database.php';

// Vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return isset($_SESSION['admin_id']) && isset($_SESSION['admin_username']);
}

// Rediriger vers login si non connecté
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

// Fonction de login
function login($username, $password) {
    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id, username, email, password, full_name FROM admins WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $admin = $result->fetch_assoc();
        if (password_verify($password, $admin['password'])) {
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            $_SESSION['admin_email'] = $admin['email'];
            $_SESSION['admin_name'] = $admin['full_name'];
            
            // Mettre à jour la dernière connexion
            $update_stmt = $conn->prepare("UPDATE admins SET last_login = NOW() WHERE id = ?");
            $update_stmt->bind_param("i", $admin['id']);
            $update_stmt->execute();
            $update_stmt->close();
            
            $stmt->close();
            $conn->close();
            return true;
        }
    }
    
    $stmt->close();
    $conn->close();
    return false;
}

// Fonction de logout
function logout() {
    session_unset();
    session_destroy();
    header('Location: login.php');
    exit;
}
?>

