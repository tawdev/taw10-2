<?php
$pageTitle = 'Gestion de l\'Équipe';
require_once 'includes/layout.php';
require_once dirname(__DIR__) . '/config/database.php';

$conn = getDBConnection();

$message = '';
$messageType = '';

// Gestion de l'ajout
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add') {
    $nom = trim($_POST['nom']);
    $poste = trim($_POST['poste']);
    $description = trim($_POST['description']);
    $image = trim($_POST['image']);
    
    if (!empty($nom) && !empty($poste)) {
        $stmt = $conn->prepare("INSERT INTO team (nom, poste, description, image) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nom, $poste, $description, $image);
        if ($stmt->execute()) {
            $message = 'Membre ajouté avec succès';
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
    $description = trim($_POST['description']);
    $image = trim($_POST['image']);
    
    if (!empty($nom) && !empty($poste)) {
        $stmt = $conn->prepare("UPDATE team SET nom = ?, poste = ?, description = ?, image = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $nom, $poste, $description, $image, $id);
        if ($stmt->execute()) {
            $message = 'Membre modifié avec succès';
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
    $stmt = $conn->prepare("DELETE FROM team WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
    header('Location: team.php?deleted=1');
    exit;
}

// Récupérer le membre à éditer
$edit_member = null;
if (isset($_GET['edit']) && is_numeric($_GET['edit'])) {
    $id = intval($_GET['edit']);
    $result = $conn->query("SELECT * FROM team WHERE id = $id");
    $edit_member = $result->fetch_assoc();
}

// Récupérer tous les membres
$team = $conn->query("SELECT * FROM team ORDER BY id ASC");
?>

<div class="page-header">
    <h2>Gestion de l'Équipe</h2>
    <button class="btn-primary" onclick="document.getElementById('addForm').style.display='block'">
        <i class="fas fa-plus"></i> Ajouter un membre
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
        <i class="fas fa-check-circle"></i> Membre supprimé avec succès
    </div>
<?php endif; ?>

<!-- Formulaire d'ajout/modification -->
<div id="addForm" class="form-modal" style="display: <?php echo $edit_member ? 'block' : 'none'; ?>;">
    <div class="form-modal-content">
        <span class="close-modal" onclick="document.getElementById('addForm').style.display='none'">&times;</span>
        <h3><?php echo $edit_member ? 'Modifier' : 'Ajouter'; ?> un membre</h3>
        <form method="POST">
            <input type="hidden" name="action" value="<?php echo $edit_member ? 'edit' : 'add'; ?>">
            <?php if ($edit_member): ?>
                <input type="hidden" name="id" value="<?php echo $edit_member['id']; ?>">
            <?php endif; ?>
            
            <div class="form-group">
                <label>Nom *</label>
                <input type="text" name="nom" value="<?php echo $edit_member ? htmlspecialchars($edit_member['nom']) : ''; ?>" required>
            </div>
            
            <div class="form-group">
                <label>Poste *</label>
                <input type="text" name="poste" value="<?php echo $edit_member ? htmlspecialchars($edit_member['poste']) : ''; ?>" required>
            </div>
            
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" rows="4"><?php echo $edit_member ? htmlspecialchars($edit_member['description']) : ''; ?></textarea>
            </div>
            
            <div class="form-group">
                <label>Image (URL)</label>
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <input type="text" name="image" id="imageUrl" value="<?php echo $edit_member ? htmlspecialchars($edit_member['image']) : ''; ?>" placeholder="https://... ou uploader une image" style="flex: 1;">
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <input type="file" id="imageUpload" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" style="display: none;">
                        <button type="button" id="uploadBtn" class="btn-upload">
                            <i class="fas fa-upload"></i> Upload
                        </button>
                    </div>
                </div>
                <div id="uploadPreview" style="margin-top: 10px; display: none;">
                    <img id="previewImg" src="" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 5px; border: 1px solid #ddd;">
                </div>
                <div id="uploadStatus" style="margin-top: 5px; font-size: 12px;"></div>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn-primary">
                    <i class="fas fa-save"></i> <?php echo $edit_member ? 'Modifier' : 'Ajouter'; ?>
                </button>
                <button type="button" class="btn-secondary" onclick="document.getElementById('addForm').style.display='none'">Annuler</button>
            </div>
        </form>
    </div>
</div>

<!-- Liste des membres -->
<div class="table-container">
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Poste</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php while($member = $team->fetch_assoc()): ?>
            <tr>
                <td><?php echo $member['id']; ?></td>
                <td><?php echo htmlspecialchars($member['nom']); ?></td>
                <td><?php echo htmlspecialchars($member['poste']); ?></td>
                <td class="message-cell">
                    <?php echo $member['description'] ? htmlspecialchars(substr($member['description'], 0, 80)) . '...' : '-'; ?>
                </td>
                <td>
                    <?php if ($member['image']): ?>
                        <?php 
                        // Gérer les chemins relatifs et absolus
                        $imagePath = $member['image'];
                        // Si c'est un chemin relatif qui commence par "assets/", ajouter "../"
                        if (strpos($imagePath, 'assets/') === 0 && strpos($imagePath, 'http') !== 0) {
                            $imagePath = '../' . $imagePath;
                        }
                        ?>
                        <img src="<?php echo htmlspecialchars($imagePath); ?>" alt="" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <i class="fas fa-user-circle" style="font-size: 30px; color: #ccc; display: none;"></i>
                    <?php else: ?>
                        <i class="fas fa-user-circle" style="font-size: 30px; color: #ccc;"></i>
                    <?php endif; ?>
                </td>
                <td>
                    <a href="?edit=<?php echo $member['id']; ?>" class="btn-action btn-edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="?delete=<?php echo $member['id']; ?>" class="btn-action btn-delete" 
                       onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');">
                        <i class="fas fa-trash"></i>
                    </a>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
    const imageUrl = document.getElementById('imageUrl');
    const uploadStatus = document.getElementById('uploadStatus');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImg = document.getElementById('previewImg');
    
    // Afficher le preview si une image existe déjà
    if (imageUrl.value && imageUrl.value.trim() !== '') {
        let imageSrc = imageUrl.value;
        // Si c'est un chemin relatif qui commence par "assets/", ajouter "../" pour l'admin
        if (imageSrc.indexOf('assets/') === 0 && imageSrc.indexOf('http') !== 0) {
            imageSrc = '../' + imageSrc;
        }
        previewImg.src = imageSrc;
        uploadPreview.style.display = 'block';
    }
    
    // Ouvrir le sélecteur de fichier au clic sur le bouton
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            imageUpload.click();
        });
    }
    
    // Gérer le changement de fichier
    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // Vérifier la taille (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                uploadStatus.innerHTML = '<span style="color: red;"><i class="fas fa-exclamation-circle"></i> Fichier trop volumineux (max 5MB)</span>';
                return;
            }
            
            // Vérifier le type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                uploadStatus.innerHTML = '<span style="color: red;"><i class="fas fa-exclamation-circle"></i> Type de fichier non autorisé</span>';
                return;
            }
            
            // Afficher le preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                uploadPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
            
            // Uploader le fichier
            uploadStatus.innerHTML = '<span style="color: #4a90e2;"><i class="fas fa-spinner fa-spin"></i> Upload en cours...</span>';
            
            const formData = new FormData();
            formData.append('image', file);
            
            fetch('upload_image.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    imageUrl.value = data.url;
                    uploadStatus.innerHTML = '<span style="color: green;"><i class="fas fa-check-circle"></i> ' + data.message + '</span>';
                    setTimeout(() => {
                        uploadStatus.innerHTML = '';
                    }, 3000);
                } else {
                    uploadStatus.innerHTML = '<span style="color: red;"><i class="fas fa-exclamation-circle"></i> ' + data.message + '</span>';
                }
            })
            .catch(error => {
                uploadStatus.innerHTML = '<span style="color: red;"><i class="fas fa-exclamation-circle"></i> Erreur lors de l\'upload</span>';
                console.error('Error:', error);
            });
        });
    }
    
    // Mettre à jour le preview quand l'URL change manuellement
    if (imageUrl) {
        imageUrl.addEventListener('blur', function() {
            if (this.value && this.value.trim() !== '') {
                let imageSrc = this.value;
                // Si c'est un chemin relatif qui commence par "assets/", ajouter "../" pour l'admin
                if (imageSrc.indexOf('assets/') === 0 && imageSrc.indexOf('http') !== 0) {
                    imageSrc = '../' + imageSrc;
                }
                previewImg.src = imageSrc;
                uploadPreview.style.display = 'block';
            } else {
                uploadPreview.style.display = 'none';
            }
        });
    }
    
    // Gérer les erreurs de chargement d'image
    if (previewImg) {
        previewImg.addEventListener('error', function() {
            this.style.display = 'none';
            uploadStatus.innerHTML = '<span style="color: orange;"><i class="fas fa-exclamation-triangle"></i> Impossible de charger l\'image. Vérifiez l\'URL.</span>';
        });
    }
});
</script>

<?php
$conn->close();
require_once 'includes/footer.php';
?>

