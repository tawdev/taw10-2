<?php
$pageTitle = 'Gestion des Contacts';
require_once 'includes/layout.php';
require_once dirname(__DIR__) . '/config/database.php';

$conn = getDBConnection();

// Gestion de la suppression
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
    header('Location: contacts.php?deleted=1');
    exit;
}

// Récupérer tous les contacts
$contacts = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC");
?>

<div class="page-header">
    <h2>Gestion des Contacts</h2>
    <p>Total: <?php echo $contacts->num_rows; ?> contact(s)</p>
</div>

<?php if (isset($_GET['deleted'])): ?>
    <div class="alert alert-success">
        <i class="fas fa-check-circle"></i> Contact supprimé avec succès
    </div>
<?php endif; ?>

<div class="table-container">
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom Complet</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Service</th>
                <th>Pack</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php while($contact = $contacts->fetch_assoc()): ?>
            <tr>
                <td><?php echo $contact['id']; ?></td>
                <td><?php echo htmlspecialchars($contact['nom_complet']); ?></td>
                <td><?php echo htmlspecialchars($contact['email']); ?></td>
                <td><?php echo htmlspecialchars($contact['telephone']); ?></td>
                <td><?php echo $contact['service'] ? htmlspecialchars($contact['service']) : '-'; ?></td>
                <td><?php echo $contact['pack'] ? htmlspecialchars($contact['pack']) : '-'; ?></td>
                <td class="message-cell">
                    <span class="message-preview"><?php echo htmlspecialchars(substr($contact['message'], 0, 50)); ?>...</span>
                    <div class="message-full" style="display:none;"><?php echo nl2br(htmlspecialchars($contact['message'])); ?></div>
                </td>
                <td><?php echo date('d/m/Y H:i', strtotime($contact['created_at'])); ?></td>
                <td>
                    <button class="btn-action btn-view-message" data-id="<?php echo $contact['id']; ?>">
                        <i class="fas fa-eye"></i>
                    </button>
                    <a href="?delete=<?php echo $contact['id']; ?>" class="btn-action btn-delete" 
                       onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce contact ?');">
                        <i class="fas fa-trash"></i>
                    </a>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

<!-- Modal pour voir le message complet -->
<div id="messageModal" class="modal">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>Message Complet</h3>
        <div id="modalMessageContent"></div>
    </div>
</div>

<?php
$conn->close();
require_once 'includes/footer.php';
?>

