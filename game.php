<?php
    require_once("action/GameAction.php");
    $action = new GameAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/game.css">

    <title>Game</title>
</head>
<body>
    <div id="info-opponent">
    <div id="health" class="health-opps"></div>
    <div id="mp" class="mp-opps"></div>  
    </div>

    <div id="deck">
        <div class="card-container" id="cc1"></div>
        <div id="btn-container">
            <div id="power">HERO POWER</div>
            <div id="end-turn">END TURN</div>
        </div>
        <div class="card-container" id="cc2"></div>
        <div id="health" class="health-perso"></div>
        <div id="mp" class="mp-perso"></div>  
    </div>    
</body>
</html>