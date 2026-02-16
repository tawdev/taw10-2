<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'taw10_db');

// Configuración de la base de datos
// define('DB_HOST', 'localhost');
// define('DB_USER', 'u627894251_Onjaw');
// define('DB_PASS', 'yWI};>6umPtaw10');
// define('DB_NAME', 'u627894251_yx6q7');

// Conexión a la base de datos
function getDBConnection() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $conn->set_charset("utf8mb4");
        return $conn;
    } catch (Exception $e) {
        die("Database connection error: " . $e->getMessage());
    }
}
?>

