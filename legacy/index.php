<?php
require_once 'config/database.php';
require_once 'includes/header.php';

// Afficher les messages de succès/erreur
if (isset($_SESSION['success']) && $_SESSION['success'] === true) {
    echo '<div class="alert alert-success">' . htmlspecialchars(t('success_message')) . '</div>';
    unset($_SESSION['success']);
}
if (isset($_SESSION['error']) && $_SESSION['error'] === true) {
    $error_msg = isset($_SESSION['error_type']) ? t($_SESSION['error_type']) : t('error_message');
    echo '<div class="alert alert-error">' . htmlspecialchars($error_msg) . '</div>';
    unset($_SESSION['error']);
    unset($_SESSION['error_type']);
}

// Récupérer les témoignages
$conn = getDBConnection();
$testimonials_query = "SELECT * FROM testimonials ORDER BY id ASC";
$testimonials_result = $conn->query($testimonials_query);

// Récupérer l'équipe
$team_query = "SELECT * FROM team ORDER BY id ASC";
$team_result = $conn->query($team_query);
?>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-slider">
        <div class="hero-slide active">
            <img src="assets/images/b_Image_de_fond_profes.jpeg" alt="Hero Background 1">
        </div>
        <div class="hero-slide">
            <img src="assets/images/b_Image_de_fond_profes.png" alt="Hero Background 2">
        </div>
    </div>
    <div class="hero-overlay"></div>
    <div class="container">
        <div class="hero-content">
            <div class="hero-text animate-fade-in-up">
                <h1 class="animate-slide-in-left"><?php echo t('hero_title'); ?></h1>
                <p class="animate-slide-in-right"><?php echo t('hero_text'); ?></p>
                <div class="hero-buttons animate-fade-in-delay">
                    <a href="#contact" class="btn btn-primary"><?php echo t('btn_consultation'); ?></a>
                    <a href="tel:+212524308038" class="btn btn-secondary">
                        <i class="fas fa-phone"></i> +212 52430-8038
                    </a>
                    <a href="tel:+212607790956" class="btn btn-secondary">
                        <i class="fas fa-phone"></i> +212 607790956
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- Hero Slider Controls -->
    <div class="hero-slider-controls">
        <button class="hero-slider-btn prev" id="heroPrevBtn">
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="hero-slider-dots" id="heroSliderDots"></div>
        <button class="hero-slider-btn next" id="heroNextBtn">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
</section>




<!-- Pourquoi Nous Section -->
<section id="pourquoi" class="pourquoi-section">
    <div class="container">
        <div class="pourquoi-wrapper">
            <!-- Images Section (Left) -->
            <div class="pourquoi-images animate-on-scroll">
                <div class="pourquoi-image-top">
                    <img src="assets/images/b_Image_de_fond_modern.png" alt="TAW 10 Modern">
                </div>
                <div class="pourquoi-image-bottom">
                    <img src="assets/images/a_i_wnat_to_megrate_th.png" alt="TAW 10 Professional">
                    <!-- Stats Box Overlay -->
                    <div class="stats-box-overlay animate-on-scroll">
                        <div class="stats-icon">
                            <i class="fas fa-globe"></i>
                        </div>
                        <div class="stats-content">
                            <h3 class="stats-counter" data-target="2250">0</h3>
                            <p><?php echo t('stats_clients'); ?></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Section (Right) -->
            <div class="pourquoi-content animate-on-scroll">
                <h2 class="pourquoi-title"><?php echo t('section_pourquoi'); ?></h2>
                <ul class="pourquoi-list">
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><?php echo t('pourquoi_1'); ?></span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><?php echo t('pourquoi_2'); ?></span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><?php echo t('pourquoi_3'); ?></span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><?php echo t('pourquoi_4'); ?></span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span><?php echo t('pourquoi_5'); ?></span>
                    </li>
                </ul>
                <a href="#services" class="btn btn-primary pourquoi-btn"><?php echo t('nav_services'); ?></a>
            </div>
        </div>

        <!-- Quote & About Section (Below) -->
        <div class="quote-about-wrapper">
            <!-- Left Column: Quote & Consultation -->
            <div class="quote-column">
                <div class="quote-mark">"</div>
                <blockquote class="quote-text">
                    <?php echo t('quote_text'); ?>
                </blockquote>

                <a href="tel:+212524308038" class="consultation-box">
                    <div class="consultation-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="consultation-content">
                        <p class="consultation-label"><?php echo t('consultation_label'); ?></p>
                        <p class="consultation-phone">+212 52430-8038</p>
                    </div>
                </a>

                <div class="signature-section">
                    <div class="signature"><?php echo t('ceo_signature'); ?></div>
                    <div class="ceo-name"><?php echo t('ceo_title'); ?></div>
                </div>
            </div>

            <!-- Right Column: About Us -->
            <div class="about-column">
                <h2 class="about-title"><?php echo t('section_apropos'); ?></h2>
                <div class="about-text">
                    <p><?php echo t('apropos_text_1'); ?></p>
                    <p><?php echo t('apropos_text_2'); ?></p>
                </div>
            </div>
        </div>
    </div>


    </div>
</section>

<!-- Services Section -->
<section id="services" class="services-section">
    <div class="container">
        <div class="services-header animate-on-scroll">
            <span class="practice-areas"><?php echo t('practice_areas'); ?></span>
            <h2 class="section-title"><?php echo t('section_services'); ?></h2>
            <p class="section-subtitle"><?php echo t('services_subtitle'); ?></p>
        </div>

        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-home"></i>
                </div>
                <h3><?php echo t('service_1_title'); ?></h3>
                <p><?php echo t('service_1_text'); ?></p>
                <a href="#contact?service=service_1" class="service-cta service-cta-hover"
                    data-service="service_1"><?php echo t('btn_commencer_cta'); ?> <i
                        class="fas fa-arrow-right"></i></a>
            </div>

            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h3><?php echo t('service_2_title'); ?></h3>
                <p><?php echo t('service_2_text'); ?></p>
                <a href="#contact?service=service_2" class="service-cta service-cta-hover"
                    data-service="service_2"><?php echo t('btn_commencer_cta'); ?> <i
                        class="fas fa-arrow-right"></i></a>
            </div>

            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-building"></i>
                </div>
                <h3><?php echo t('service_3_title'); ?></h3>
                <p><?php echo t('service_3_text'); ?></p>
                <a href="#contact?service=service_3" class="service-cta service-cta-hover"
                    data-service="service_3"><?php echo t('btn_commencer_cta'); ?> <i
                        class="fas fa-arrow-right"></i></a>
            </div>

            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-stethoscope"></i>
                </div>
                <h3><?php echo t('service_4_title'); ?></h3>
                <p><?php echo t('service_4_text'); ?></p>
                <a href="#contact?service=service_4" class="service-cta service-cta-hover"
                    data-service="service_4"><?php echo t('btn_commencer_cta'); ?> <i
                        class="fas fa-arrow-right"></i></a>
            </div>

            <div class="service-card featured-service">
                <div class="service-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3><?php echo t('service_5_title'); ?></h3>
                <p><?php echo t('service_5_text'); ?></p>
                <a href="#contact?service=service_5" class="service-cta"
                    data-service="service_5"><?php echo t('btn_commencer_cta'); ?> <i
                        class="fas fa-arrow-right"></i></a>
            </div>

            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-car"></i>
                </div>
                <h3><?php echo t('service_6_title'); ?></h3>
                <p><?php echo t('service_6_text'); ?></p>
                <a href="#contact?service=service_6" class="service-cta service-cta-hover"
                    data-service="service_6"><?php echo t('btn_commencer_cta'); ?> <i
                        class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>
</section>


<!-- Tarifs Section -->
<section id="tarifs" class="tarifs-section">
    <div class="container">
        <h2 class="section-title animate-on-scroll"><?php echo t('section_tarifs'); ?></h2>
        <div class="tarifs-grid">
            <div class="tarif-card">
                <h3><?php echo t('tarif_1'); ?></h3>
                <div class="price">3499<span>DhsHT</span></div>
                <ul class="tarif-features">
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_certificat'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_statuts'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_patente'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_commerce'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_fiscal'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_cnss'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_annonce'); ?></li>
                    <li class="not-included"><i class="fas fa-times"></i>
                        <?php echo t('tarif_feature_domiciliation'); ?></li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_model_j'); ?></li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_dgi'); ?></li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_damancom'); ?>
                    </li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_cachet'); ?></li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_bancaire'); ?>
                    </li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_site'); ?></li>
                </ul>
                <a href="#contact?pack=pack_1" class="btn btn-primary"
                    data-pack="pack_1"><?php echo t('btn_commencer_tarif'); ?></a>
            </div>

            <div class="tarif-card featured">
                <div class="badge"><?php echo t('badge_popular'); ?></div>
                <h3><?php echo t('tarif_2'); ?></h3>
                <div class="price">4699<span>DhsHT</span></div>
                <ul class="tarif-features">
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_certificat'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_statuts'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_patente'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_commerce'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_fiscal'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_cnss'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_annonce'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_domiciliation'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_model_j'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_dgi'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_damancom'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_cachet'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_bancaire'); ?></li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_site'); ?></li>
                </ul>
                <a href="#contact?pack=pack_2" class="btn btn-primary"
                    data-pack="pack_2"><?php echo t('btn_commencer_tarif'); ?></a>
            </div>

            <div class="tarif-card">
                <h3><?php echo t('tarif_3'); ?></h3>
                <div class="price">5999<span>DhsHT</span></div>
                <ul class="tarif-features">
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_certificat'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_statuts'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_patente'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_commerce'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_fiscal'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_cnss'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_annonce'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_domiciliation_2ans'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_model_j'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_dgi'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_damancom'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_cachet'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_bancaire'); ?></li>
                    <li class="not-included"><i class="fas fa-times"></i> <?php echo t('tarif_feature_site'); ?></li>
                </ul>
                <a href="#contact?pack=pack_3" class="btn btn-primary"
                    data-pack="pack_3"><?php echo t('btn_commencer_tarif'); ?></a>
            </div>

            <div class="tarif-card">
                <h3><?php echo t('tarif_4'); ?></h3>
                <div class="price">8999<span>DhsHT</span></div>
                <ul class="tarif-features">
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_certificat'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_statuts'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_patente'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_commerce'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_fiscal'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_cnss'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_annonce'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_domiciliation_2ans'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_model_j'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_dgi'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_damancom'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_cachet'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_bancaire'); ?></li>
                    <li><i class="fas fa-check"></i> <?php echo t('tarif_feature_site'); ?></li>
                </ul>
                <a href="#contact?pack=pack_4" class="btn btn-primary"
                    data-pack="pack_4"><?php echo t('btn_commencer_tarif'); ?></a>
            </div>
        </div>
    </div>
</section>

<!-- Comment Ca Marche Section -->
<section id="comment" class="comment-section">
    <div class="container">
        <div class="comment-wrapper">
            <!-- Left Column: Steps -->
            <div class="comment-steps animate-on-scroll">
                <h2 class="comment-title"><?php echo t('section_comment'); ?></h2>
                <p class="comment-description"><?php echo t('comment_subtitle'); ?></p>

                <div class="steps-list">
                    <div class="step-item">
                        <div class="step-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="step-content">
                            <h3><?php echo t('step_1_title'); ?></h3>
                            <p><?php echo t('step_1_text'); ?></p>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-icon">
                            <i class="fas fa-file-signature"></i>
                        </div>
                        <div class="step-content">
                            <h3><?php echo t('step_2_title'); ?></h3>
                            <p><?php echo t('step_2_text'); ?></p>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="step-content">
                            <h3><?php echo t('step_3_title'); ?></h3>
                            <p><?php echo t('step_3_text'); ?></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Image with Overlay -->
            <div class="comment-image-section animate-on-scroll">
                <div class="comment-image-wrapper">
                    <img src="assets/images/a_Illustration_moderne.jpeg" alt="<?php echo t('section_comment'); ?>">
                    <div class="comment-overlay">
                        <p class="overlay-text"><?php echo t('consultation_title'); ?></p>
                        <a href="#contact" class="overlay-cta"><?php echo t('btn_consultation'); ?> <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Témoignages Section -->
<section id="temoignages" class="testimonials-section">
    <div class="testimonials-hero">
        <div class="container">
            <span class="testimonials-label animate-on-scroll"><?php echo t('testimonials_label'); ?></span>
            <h2 class="testimonials-title animate-on-scroll"><?php echo t('section_temoignages'); ?></h2>
            <p class="testimonials-subtitle animate-on-scroll"><?php echo t('temoignages_subtitle'); ?></p>
        </div>
    </div>

    <div class="container">
        <div class="testimonials-slider-wrapper">
            <div class="testimonials-slider" id="testimonialsSlider">
                <?php
                // Reset the result pointer to loop through testimonials again
                $testimonials_result->data_seek(0);
                while ($testimonial = $testimonials_result->fetch_assoc()):
                    ?>
                    <div class="testimonial-slide">
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <p><?php echo htmlspecialchars($testimonial['message']); ?></p>
                            </div>
                            <div class="testimonial-author">
                                <div class="author-avatar">
                                    <?php if (!empty($testimonial['image'])): ?>
                                        <img src="<?php echo htmlspecialchars($testimonial['image']); ?>"
                                            alt="<?php echo htmlspecialchars($testimonial['nom']); ?>">
                                    <?php else: ?>
                                        <i class="fas fa-user-circle"></i>
                                    <?php endif; ?>
                                </div>
                                <div class="author-info">
                                    <strong><?php echo htmlspecialchars($testimonial['nom']); ?></strong>
                                    <span><?php echo htmlspecialchars($testimonial['poste']); ?></span>
                                </div>
                                <div class="quote-icon">
                                    <i class="fas fa-quote-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>

            <!-- Slider Controls -->
            <div class="slider-controls">
                <button class="slider-btn prev-btn" id="prevBtn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="slider-dots" id="sliderDots"></div>
                <button class="slider-btn next-btn" id="nextBtn">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</section>

<!-- Equipe Section -->
<section id="equipe" class="team-section">
    <div class="container">
        <h2 class="section-title animate-on-scroll"><?php echo t('section_equipe'); ?></h2>
        <p class="section-subtitle animate-on-scroll"><?php echo t('equipe_subtitle'); ?></p>
        <div class="team-grid">
            <?php while ($member = $team_result->fetch_assoc()): ?>
                <div class="team-card">
                    <div class="team-image">
                        <?php if (!empty($member['image'])): ?>
                            <img src="<?php echo htmlspecialchars($member['image']); ?>"
                                alt="<?php echo htmlspecialchars($member['nom']); ?>"
                                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; position: absolute; inset: 0; z-index: 3;">
                        <?php else: ?>
                            <i class="fas fa-user-circle"></i>
                        <?php endif; ?>
                    </div>
                    <h3><?php echo htmlspecialchars($member['nom']); ?></h3>
                    <p class="team-role"><?php echo htmlspecialchars($member['poste']); ?></p>
                    <?php if ($member['description']): ?>
                        <p class="team-description"><?php echo htmlspecialchars($member['description']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
</section>

<!-- CTA Consultation Section -->
<section class="cta-consultation-section">
    <div class="cta-consultation-overlay">
        <div class="container">
            <div class="cta-consultation-content animate-on-scroll">
                <h2 class="cta-consultation-title"><?php echo t('cta_consultation_title'); ?></h2>
                <a href="#contact" class="btn-cta-consultation"><?php echo t('btn_commencer_cta'); ?></a>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact-section">
    <div class="container">
        <h2 class="section-title animate-on-scroll"><?php echo t('section_contact'); ?></h2>
        <p class="section-subtitle animate-on-scroll"><?php echo t('contact_subtitle'); ?></p>

        <div class="contact-content">
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <h4><?php echo t('contact_email'); ?></h4>
                    <p>Contact@taw10.ma</p>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <h4><?php echo t('contact_phone'); ?></h4>
                    <p>+212 52430-8038</p>
                    <p>+212 607790956</p>
                </div>
            </div>

            <form class="contact-form" action="process_contact.php" method="POST">
                <div class="form-group">
                    <input type="text" name="nom_complet" placeholder="<?php echo t('form_nom'); ?>" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="<?php echo t('form_email'); ?>" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="telephone" placeholder="<?php echo t('form_telephone'); ?>" required>
                </div>
                <div class="form-group">
                    <label for="service_pack" class="form-label"><?php echo t('form_service_pack'); ?></label>
                    <select name="service_pack" id="service_pack" class="form-select" required>
                        <option value=""><?php echo t('form_service_pack_placeholder'); ?></option>
                        <optgroup label="<?php echo t('form_service_group'); ?>">
                            <option value="service:<?php echo t('service_1'); ?>"><?php echo t('service_1'); ?></option>
                            <option value="service:<?php echo t('service_2'); ?>"><?php echo t('service_2'); ?></option>
                            <option value="service:<?php echo t('service_3'); ?>"><?php echo t('service_3'); ?></option>
                            <option value="service:<?php echo t('service_4'); ?>"><?php echo t('service_4'); ?></option>
                            <option value="service:<?php echo t('service_5'); ?>"><?php echo t('service_5'); ?></option>
                            <option value="service:<?php echo t('service_6'); ?>"><?php echo t('service_6'); ?></option>
                        </optgroup>
                        <optgroup label="<?php echo t('form_pack_group'); ?>">
                            <option value="pack:<?php echo t('pack_1'); ?>"><?php echo t('pack_1'); ?></option>
                            <option value="pack:<?php echo t('pack_2'); ?>"><?php echo t('pack_2'); ?></option>
                            <option value="pack:<?php echo t('pack_3'); ?>"><?php echo t('pack_3'); ?></option>
                            <option value="pack:<?php echo t('pack_4'); ?>"><?php echo t('pack_4'); ?></option>
                        </optgroup>
                    </select>
                </div>
                <div class="form-group">
                    <textarea name="message" rows="5" placeholder="<?php echo t('form_message'); ?>"
                        required></textarea>
                </div>
                <button type="submit" class="btn btn-primary"><?php echo t('btn_envoyer'); ?></button>
            </form>
        </div>
    </div>
</section>

<?php
$conn->close();
require_once 'includes/footer.php';
?>