<?php
// changeName.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Conexión a la base de datos
$host = 'localhost';
$dbname = 'practica';
$username = 'root'; // tu usuario
$password = ''; // tu contraseña

$data = json_decode(file_get_contents('php://input'), true);
$correo = $data['correo'];
$nombre = $data['nuevoNombre'];

if (!$correo || !$nombre) {
    echo json_encode(['status' => 'error', 'message' => 'Por favor, ingresa todos los datos.']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Actualizar el nombre del usuario en la base de datos
    $query = "UPDATE Usuario SET nombre = :nuevoNombre WHERE correo = :correo";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':nuevoNombre', $nombre);
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();

    echo json_encode(['status' => 'success', 'message' => 'Nombre cambiado con éxito.']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $e->getMessage()]);
}
?>
