<?php
    require_once("action/LobbyAction.php");
    $action = new LobbyAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/lobby.css">
    <script src="js/lobby.js"></script>

    <title>Lobby</title>
</head>
<body>
    <audio id="music">
        <source src="sounds/ost-lobby.mp3" type="audio/mp3">
    </audio>
    <img src="./images/background/dojo.png" id="dojo" alt="" srcset="">
    <img src="./images/background/fontaine.png" id="fontaine" alt="" srcset="">
    <div id="burger-menu">
        <img src="./images/logo/logo.png" alt="logo" id="logo">
    </div>
    
</body>
</html>