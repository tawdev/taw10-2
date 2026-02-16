<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section footer-about">
                <div class="footer-logo">
                    <img src="assets/images/logo/IMG_1507.png" alt="TAW10 Logo" class="footer-logo-img">

                </div>
                <p><?php echo t('footer_text'); ?></p>
                <div class="footer-social-links">
                    <a href="#" aria-label="Facebook" class="social-link">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Instagram" class="social-link">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div class="footer-section footer-links">
                <h4><?php echo t('footer_links'); ?></h4>
                <ul class="footer-menu">
                    <li><a href="index.php"><i class="fas fa-chevron-right"></i> <?php echo t('nav_home'); ?></a></li>
                    <li><a href="#services"><i class="fas fa-chevron-right"></i> <?php echo t('nav_services'); ?></a>
                    </li>
                    <li><a href="#tarifs"><i class="fas fa-chevron-right"></i> <?php echo t('nav_tarifs'); ?></a></li>
                    <li><a href="#contact"><i class="fas fa-chevron-right"></i> <?php echo t('footer_contact'); ?></a>
                    </li>
                </ul>
            </div>
            <div class="footer-section footer-contact">
                <h4><?php echo t('footer_contact'); ?></h4>
                <ul class="footer-contact-list">
                    <li>
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-info">
                            <a href="mailto:Contact@taw10.ma">Contact@taw10.ma</a>
                        </div>
                    </li>
                    <li>
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-info">
                            <a href="tel:+212524308038">+212 52430-8038</a>
                        </div>
                    </li>
                    <li>
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-info">
                            <a href="tel:+212607790956">+212 607790956</a>
                        </div>
                    </li>
                    <li>
                        <div class="contact-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="contact-info">
                            <span>N , TAW10, lot Iguder, 48 AV Alla El Fassi<br>Marrakech 40000, Morocco</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-bottom-content">
                <p>&copy; <?php echo date('Y'); ?> <strong>C-Digital</strong>. <?php echo t('footer_rights'); ?></p>
            </div>
        </div>
    </div>
</footer>

<script src="assets/js/main.js"></script>
</body>

</html>