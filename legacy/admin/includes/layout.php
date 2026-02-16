<?php
require_once 'auth.php';
requireLogin();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration - TAW10</title>
    <link rel="stylesheet" href="assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="admin-wrapper">
        <!-- Sidebar -->
        <aside class="admin-sidebar">
            <div class="sidebar-header">
                <h2>TAW10 Admin</h2>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li><a href="index.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">
                        <i class="fas fa-dashboard"></i> Dashboard
                    </a></li>
                    <li><a href="contacts.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'contacts.php' ? 'active' : ''; ?>">
                        <i class="fas fa-envelope"></i> Contacts
                    </a></li>
                    <li><a href="testimonials.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'testimonials.php' ? 'active' : ''; ?>">
                        <i class="fas fa-comments"></i> Témoignages
                    </a></li>
                    <li><a href="team.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'team.php' ? 'active' : ''; ?>">
                        <i class="fas fa-users"></i> Équipe
                    </a></li>
                    <li><a href="../index.php" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Voir le site
                    </a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="admin-main">
            <!-- Top Bar -->
            <header class="admin-header">
                <div class="header-left">
                    <button class="sidebar-toggle" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h1><?php echo isset($pageTitle) ? $pageTitle : 'Dashboard'; ?></h1>
                </div>
                <div class="header-right">
                    <div class="admin-user">
                        <span><?php echo htmlspecialchars($_SESSION['admin_name']); ?></span>
                        <a href="logout.php" class="btn-logout">
                            <i class="fas fa-sign-out-alt"></i> Déconnexion
                        </a>
                    </div>
                </div>
            </header>

            <!-- Content Area -->
            <div class="admin-content">

