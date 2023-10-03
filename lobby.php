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
    <title>Magix Dofus</title>
</head>
<body>
    <img src="./images/background/dojo.png" id="dojo" alt="" srcset="">
    <img src="./images/background/fontaine.png" id="fontaine" alt="" srcset="">

</body>
</html>