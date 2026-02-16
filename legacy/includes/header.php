<?php
require_once 'includes/lang.php';
?>
<!DOCTYPE html>
<html lang="<?php echo $current_lang; ?>" dir="<?php echo $text_direction; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TAW10 - <?php echo t('nav_services'); ?></title>
    <link rel="stylesheet" href="assets/css/style.css?v=<?php echo time(); ?>_overlayfix">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <?php if ($current_lang == 'ar'): ?>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
        </style>
    <?php endif; ?>
</head>

<body class="lang-<?php echo $current_lang; ?>">
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-content">
                <div class="schedule">
                    <i class="fas fa-clock"></i>
                    <span><?php echo t('schedule'); ?></span>
                </div>
                <div class="social-links">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="main-header">
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <a href="index.php">
                        <img src="assets/images/logo/IMG_1507.png" alt="TAW10 Logo" class="logo-img">
                    </a>
                </div>
                <ul class="nav-menu" id="navMenu">
                    <div class="menu-close" id="menuClose">
                        <i class="fas fa-times"></i>
                    </div>
                    <li><a href="index.php" class="nav-link"><?php echo t('nav_home'); ?></a></li>
                    <li><a href="#services" class="nav-link"><?php echo t('nav_services'); ?></a></li>
                    <li><a href="#pourquoi" class="nav-link"><?php echo t('nav_pourquoi'); ?></a></li>
                    <li><a href="#tarifs" class="nav-link"><?php echo t('nav_tarifs'); ?></a></li>
                    <li><a href="#equipe" class="nav-link"><?php echo t('nav_equipe'); ?></a></li>
                    <li><a href="#comment" class="nav-link"><?php echo t('nav_comment'); ?></a></li>
                    <li><a href="#temoignages" class="nav-link"><?php echo t('nav_temoignages'); ?></a></li>
                    <li><a href="#contact" class="nav-link"><?php echo t('nav_contact'); ?></a></li>
                </ul>

                <div class="lang-switcher">
                    <div class="lang-dropdown-container">
                        <button class="lang-toggle-btn">
                            <i class="fas fa-globe"></i>
                        </button>
                        <div class="lang-dropdown-menu">
                            <a href="?lang=ar" class="<?php echo $current_lang == 'ar' ? 'active' : ''; ?>">AR</a>
                            <a href="?lang=fr" class="<?php echo $current_lang == 'fr' ? 'active' : ''; ?>">FR</a>
                            <a href="?lang=en" class="<?php echo $current_lang == 'en' ? 'active' : ''; ?>">EN</a>
                        </div>
                    </div>
                </div>

                <div class="hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </div>
    </header>