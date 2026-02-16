<?php
$pageTitle = 'Gestion des Témoignages';
require_once 'includes/layout.php';
require_once dirname(__DIR__) . '/config/database.php';

$conn = getDBConnection();

$message = '';
$messageType = '';

// Gestion de l'ajout
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add') {
    $nom = trim($_POST['nom']);
    $poste = trim($_POST['poste']);
    $message_text = trim($_POST['message']);
    $image = trim($_POST['image']);
    
    if (!empty($nom) && !empty($poste) && !empty($message_text)) {
        $stmt = $conn->prepare("INSERT INTO testimonials (nom, poste, message, image) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nom, $poste, $message_text, $image);
        if ($stmt->execute()) {
            $message = 'Témoignage ajouté avec succès';
            $messageType = 'success';
        } else {
            $message = 'Erreur lors de l\'ajout';
            $messageType = 'error';
        }
        $stmt->close();
    }
}

// Gestion de la modification
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'edit') {
    $id = intval($_POST['id']);
    $nom = trim($_POST['nom']);
    $poste = trim($_POST['poste']);
    $message_text = trim($_POST['message']);
    $image = trim($_POST['image']);
    
    if (!empty($nom) && !empty($poste) && !empty($message_text)) {
        $stmt = $conn->prepare("UPDATE testimonials SET nom = ?, poste = ?, message = ?, image = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $nom, $poste, $message_text, $image, $id);
        if ($stmt->execute()) {
            $message = 'Témoignage modifié avec succès';
            $messageType = 'success';
        } else {
            $message = 'Erreur lors de la modification';
            $messageType = 'error';
        }
        $stmt->close();
    }
}

// Gestion de la suppression
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $stmt = $conn->prepare("DELETE FROM testimonials WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
    header('Location: testimonials.php?deleted=1');
    exit;
}

// Récupérer le témoignage à éditer
$edit_testimonial = null;
if (isset($_GET['edit']) && is_numeric($_GET['edit'])) {
    $id = intval($_GET['edit']);
    $result = $conn->query("SELECT * FROM testimonials WHERE id = $id");
    $edit_testimonial = $result->fetch_assoc();
}

// Récupérer tous les témoignages
$testimonials = $conn->query("SELECT * FROM testimonials ORDER BY created_at DESC");
?>

<div class="page-header">
    <h2>Gestion des Témoignages</h2>
    <button class="btn-primary" onclick="document.getElementById('addForm').style.display='block'">
        <i class="fas fa-plus"></i> Ajouter un témoignage
    </button>
</div>

<?php if ($message): ?>
    <div class="alert alert-<?php echo $messageType; ?>">
        <i class="fas fa-<?php echo $messageType === 'success' ? 'check-circle' : 'exclamation-circle'; ?>"></i>
        <?php echo htmlspecialchars($message); ?>
    </div>
<?php endif; ?>

<?php if (isset($_GET['deleted'])): ?>
    <div class="alert alert-success">
        <i class="fas fa-check-circle"></i> Témoignage supprimé avec succès
    </div>
<?php endif; ?>

<!-- Formulaire d'ajout/modification -->
<div id="addForm" class="form-modal" style="display: <?php echo $edit_testimonial ? 'block' : 'none'; ?>;">
    <div class="form-modal-content">
        <span class="close-modal" onclick="document.getElementById('addForm').style.display='none'">&times;</span>
        <h3><?php echo $edit_testimonial ? 'Modifier' : 'Ajouter'; ?> un témoignage</h3>
        <form method="POST">
            <input type="hidden" name="action" value="<?php echo $edit_testimonial ? 'edit' : 'add'; ?>">
            <?php if ($edit_testimonial): ?>
                <input type="hidden" name="id" value="<?php echo $edit_testimonial['id']; ?>">
            <?php endif; ?>
            
            <div class="form-group">
                <label>Nom *</label>
                <input type="text" name="nom" value="<?php echo $edit_testimonial ? htmlspecialchars($edit_testimonial['nom']) : ''; ?>" required>
            </div>
            
            <div class="form-group">
                <label>Poste *</label>
                <input type="text" name="poste" value="<?php echo $edit_testimonial ? htmlspecialchars($edit_testimonial['poste']) : ''; ?>" required>
            </div>
            
            <div class="form-group">
                <label>Message *</label>
                <textarea name="message" rows="5" required><?php echo $edit_testimonial ? htmlspecialchars($edit_testimonial['message']) : ''; ?></textarea>
            </div>
            
            <div class="form-group">
                <label>Image (URL)</label>
                <input type="text" name="image" value="<?php echo $edit_testimonial ? htmlspecialchars($edit_testimonial['image']) : ''; ?>" placeholder="https://...">
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn-primary">
                    <i class="fas fa-save"></i> <?php echo $edit_testimonial ? 'Modifier' : 'Ajouter'; ?>
                </button>
                <button type="button" class="btn-secondary" onclick="document.getElementById('addForm').style.display='none'">Annuler</button>
            </div>
        </form>
    </div>
</div>

<!-- Liste des témoignages -->
<div class="table-container">
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Poste</th>
                <th>Message</th>
                <th>Image</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php while($testimonial = $testimonials->fetch_assoc()): ?>
            <tr>
                <td><?php echo $testimonial['id']; ?></td>
                <td><?php echo htmlspecialchars($testimonial['nom']); ?></td>
                <td><?php echo htmlspecialchars($testimonial['poste']); ?></td>
                <td class="message-cell">
                    <?php echo htmlspecialchars(substr($testimonial['message'], 0, 80)); ?>...
                </td>
                <td>
                    <?php if ($testimonial['image']): ?>
                        <img src="<?php echo htmlspecialchars($testimonial['image']); ?>" alt="" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                    <?php else: ?>
                        <i class="fas fa-user-circle" style="font-size: 30px; color: #ccc;"></i>
                    <?php endif; ?>
                </td>
                <td><?php echo date('d/m/Y', strtotime($testimonial['created_at'])); ?></td>
                <td>
                    <a href="?edit=<?php echo $testimonial['id']; ?>" class="btn-action btn-edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="?delete=<?php echo $testimonial['id']; ?>" class="btn-action btn-delete" 
                       onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?');">
                        <i class="fas fa-trash"></i>
                    </a>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

<?php
$conn->close();
require_once 'includes/footer.php';
?>

