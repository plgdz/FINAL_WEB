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
    <link rel="stylesheet" href="./css/game-card.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.min.js"></script>
    <script type="module" src="js/game/game.js"></script>
    <title>Game</title>
</head>
<body>
    <div id="info-opponent">
        <div id="health" class="health-opps"><h3 class="nb-health info-hp-mp" id="hp-opp"></h3></div>
        <div id="mp" class="mp-opps"><h3 class="info-hp-mp" id="mp-opp" ></h3></div>
        <div id="container-card-opp" ></div> 
        <div id="avatar-opp"></div> 
    </div>

    <div id="board" >
        <div class="board-container" id="board-opp"></div>
        <div class="board-container" id="board-player"></div>
    </div>

    <!-- find and adapted from https://codepen.io/charlenopires/pen/JMoxdb -->
    <div id="countdown">
    <div id="countdown-number"></div>
        <svg>
            <circle id="timer" class="" r="40" cx="50" cy="50"></circle>
        </svg>
    </div>

    <div id="deck">
        <div class="card-container" id="cc1"></div>
        <div id="btn-container">
            <div id="power">HERO POWER</div>
            <div id="end-turn">END TURN</div>
        </div>
        <div class="card-container" id="cc2"></div>
        <div id="health" class="health-perso"><h3 class="nb-health info-hp-mp" id="hp-player" ></h3></div>
        <div id="mp" class="mp-perso"><h3 class="info-hp-mp" id="mp-player"></h3></div>  
    </div>    
</body>
</html>