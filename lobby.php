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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineLite.min.js"></script>
    <title>Lobby</title>
</head>
<body>
    <div id="transition">
    </div>
    <div id="main-left">
        <div id="title">
            <span class="letter L">L</span>
            <span class="letter O">O</span>
            <span class="letter B1">B</span>
            <span class="letter B2">B</span>
            <span class="letter Y">Y</span>
        </div>

        <div id="chat-container">
            <iframe id="chat" onload="applyStyles(this)" 
                    src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"] ?>">
            </iframe>
        </div>
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