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
    <div id="chat-container">
        <iframe id="chat" onload="applyStyles(this)" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"] ?>">
        </iframe>
    </div>
    

    <audio id="music">
        <source src="sounds/ost-lobby.mp3" type="audio/mp3">
    </audio>
    <div id="arene"></div>
    <div id="burger-menu">
        <img src="images/logo/logo-min.png" alt="logo" id="logo">
    </div>
    <div id="deck-back">
        <iframe id="deck" src="https://magix.apps-de-cours.com/server/#/deck/<?= $data["key"] ?>">
        </iframe>
    </div>


</body>
</html>