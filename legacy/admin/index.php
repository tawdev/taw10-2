<?php
$pageTitle = 'Dashboard';
require_once 'includes/layout.php';
require_once dirname(__DIR__) . '/config/database.php';

$conn = getDBConnection();

// Statistiques
$stats = [];

// Nombre total de contacts
$result = $conn->query("SELECT COUNT(*) as total FROM contacts");
$stats['contacts'] = $result->fetch_assoc()['total'];

// Nombre total de témoignages
$result = $conn->query("SELECT COUNT(*) as total FROM testimonials");
$stats['testimonials'] = $result->fetch_assoc()['total'];

// Nombre total de membres d'équipe
$result = $conn->query("SELECT COUNT(*) as total FROM team");
$stats['team'] = $result->fetch_assoc()['total'];

// Contacts récents (5 derniers)
$recent_contacts = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5");

// Témoignages récents (3 derniers)
$recent_testimonials = $conn->query("SELECT * FROM testimonials ORDER BY created_at DESC LIMIT 3");
?>

<div class="dashboard">
    <!-- Stats Cards -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon" style="background: #4a90e2;">
                <i class="fas fa-envelope"></i>
            </div>
            <div class="stat-content">
                <h3><?php echo $stats['contacts']; ?></h3>
                <p>Contacts</p>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon" style="background: #84f2f1;">
                <i class="fas fa-comments"></i>
            </div>
            <div class="stat-content">
                <h3><?php echo $stats['testimonials']; ?></h3>
                <p>Témoignages</p>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon" style="background: #f39c12;">
                <i class="fas fa-users"></i>
            </div>
            <div class="stat-content">
                <h3><?php echo $stats['team']; ?></h3>
                <p>Membres d'équipe</p>
            </div>
        </div>
    </div>

    <!-- Recent Contacts -->
    <div class="dashboard-section">
        <div class="section-header">
            <h2>Contacts Récents</h2>
            <a href="contacts.php" class="btn-view-all">Voir tout</a>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Service/Pack</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($contact = $recent_contacts->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($contact['nom_complet']); ?></td>
                            <td><?php echo htmlspecialchars($contact['email']); ?></td>
                            <td><?php echo htmlspecialchars($contact['telephone']); ?></td>
                            <td>
                                <?php
                                $service_pack = '';
                                if ($contact['service'])
                                    $service_pack = htmlspecialchars($contact['service']);
                                if ($contact['pack'])
                                    $service_pack = htmlspecialchars($contact['pack']);
                                echo $service_pack ?: '-';
                                ?>
                            </td>
                            <td><?php echo date('d/m/Y H:i', strtotime($contact['created_at'])); ?></td>
                            <td>
                                <a href="contacts.php?view=<?php echo $contact['id']; ?>" class="btn-action btn-view">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Recent Testimonials -->
    <div class="dashboard-section">
        <div class="section-header">
            <h2>Témoignages Récents</h2>
            <a href="testimonials.php" class="btn-view-all">Voir tout</a>
        </div>
        <div class="testimonials-preview">
            <?php while ($testimonial = $recent_testimonials->fetch_assoc()): ?>
                <div class="testimonial-preview-card">
                    <div class="testimonial-author">
                        <strong><?php echo htmlspecialchars($testimonial['nom']); ?></strong>
                        <span><?php echo htmlspecialchars($testimonial['poste']); ?></span>
                    </div>
                    <p class="testimonial-text">
                        <?php echo htmlspecialchars(substr($testimonial['message'], 0, 100)) . '...'; ?></p>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
</div>

<?php
$conn->close();
require_once 'includes/footer.php';
?>