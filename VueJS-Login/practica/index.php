<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
include_once 'conexion.php';

if (isset($_GET["mostrar"])) {
    $sql = "SELECT * FROM usuario WHERE  id != '" . $_GET["mostrar"] . "'";
    $ejecutar = $pdo->query($sql);
    $resultdo = $ejecutar->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($resultdo);
    exit();
}

//Iniciar sesion
if (isset($_GET["sesion"])) {

    $data = json_decode(file_get_contents('php://input'), true);
    $correo = $data['correo'];
    $clave = $data['clave'];

    if ($correo == "" || $clave == "") {
        echo json_encode(['mensaje' => '0']); // datos vacios
    } else {

        $sqlcantidad = "SELECT COUNT(*) FROM usuario WHERE correo= '" . $correo . "' AND clave = '" . $clave . "' ";
        $query = $pdo->query($sqlcantidad);
        $cantidad = $query->fetchColumn();
        if ($cantidad == 0) {
            echo json_encode(['mensaje' => '1']); // no existe
        } else {
            $sql = "SELECT * FROM usuario WHERE correo= '" . $correo . "' AND clave = '" . $clave . "' ";
            $ejecutar = $pdo->query($sql);
            $resultdo = $ejecutar->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($resultdo);
            exit();
        }
    }
}


//Iniciar sesion
if (isset($_GET["recuperar"])) {

    $data = json_decode(file_get_contents('php://input'), true);
    $correo = $data['correo'];
    $clave = $data['clave'];

    if ($correo == "" || $clave == "") {
        echo json_encode(['mensaje' => '0']); // datos vacios
    } else {

        $sqlcantidad = "SELECT COUNT(*) FROM usuario WHERE correo= '" . $correo . "' AND clave = '" . $clave . "' ";
        $query = $pdo->query($sqlcantidad);
        $cantidad = $query->fetchColumn();
        if ($cantidad == 0) {
            echo json_encode(['mensaje' => '1']); // no existe
        } else {
            $sql = "UPDATE usuario SET status = 1  WHERE correo= '" . $correo . "' AND clave = '" . $clave . "' ";
            $ejecutar = $pdo->query($sql);
            $resultdo = $ejecutar->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($resultdo);
            exit();
        }
    }
}


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])) {
    $sql = "SELECT * FROM usuario WHERE id = '" . $_GET["consultar"] . "' ";
    $ejecutar = $pdo->query($sql);
    $resultdo = $ejecutar->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($resultdo);
    exit();
}

//Inserta un nuevo registro
if (isset($_GET["insertar"])) {
    $data = json_decode(file_get_contents('php://input'), true);

    $nombre = $data['nombre'];
    $correo = $data['correo'];
    $clave = $data['clave'];
    $status = '1';
    if ($nombre == "" || $correo == "" || $clave == "") {
        echo json_encode(['mensaje' => '1']);
    } else {
        $sqlcantidad = "SELECT COUNT(*) FROM usuario WHERE correo = '" . $correo . "'";
        $query = $pdo->query($sqlcantidad);
        $cantidad = $query->fetchColumn();
        if ($cantidad != 0) {
        echo json_encode(['mensaje' => '1']);
            exit();
        } else {
            $ejecutar = $pdo->prepare('INSERT INTO usuario (nombre, correo, clave, status) VALUES (?, ?, ?, ?)');
            $ejecutar->execute(array($nombre, strtolower($correo), $clave, $status));
        echo json_encode(['mensaje' => '0']);
            exit();
        }
    }
}
// Actualiza datos pero recepciona datos  y una clave para realizar la actualización
if (isset($_GET["actualizar"])) {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $nombre = $data['nombre'];
    $correo = $data['correo'];
    $clave = $data['clave'];
    $status = $data['status'];

    if ($id == "" || $nombre == "" || $correo == "" || $clave == "" || $status == "") {
        echo json_encode(['mensaje' => '0']);
    } else {

        $sqlcantidad = "SELECT COUNT(*) FROM usuario WHERE correo = '" . $correo . "'";
        $query = $pdo->query($sqlcantidad);
        $cantidad = $query->fetchColumn();

        $sql = 'UPDATE usuario SET nombre = ?, correo = ?, clave = ?, status = ? WHERE id = ?';
        $ejecutar = $pdo->prepare($sql);
        $ejecutar->execute(array($nombre, strtolower($correo), $clave, $status, $id));
        echo json_encode(["mensaje" => "1"]);
            
       
    }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["eliminar"])) {
    $id = $_GET["eliminar"];
    $eliminar = 'UPDATE usuario SET status = 0 WHERE id = ?';
    //$eliminar = "DELETE FROM usuario WHERE id = ?";
    $ejecutar = $pdo->prepare($eliminar);
    $ejecutar->execute(array($id));
    echo json_encode(["mensaje" => "1"]);
}
