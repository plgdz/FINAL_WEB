<?php
    require_once("action/IndexAction.php");
    $action = new IndexAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/index.css">
    <script src="js/index.js"></script>
    <title>Magix Dofus</title>
</head>
<body>
    <div id="container">
        <div id="box-login">
            <form action="" method="post">
                <input id="connection-token" type="hidden" value="<?= $data["connection"] ?>">
                <div class="box-input" >
                    <label for="username">Nom d'utilisateur :</label>
                    <input type="text" name="username" id="username" placeholder="Votre nom d'utilisateur">
                </div>
                <div class="box-input">
                    <label for="password">Mot de passe :</label>
                    <input type="password" name="password" id="password">
                </div>
                <button type="submit">Connection</button>
            </form>
        </div>
    </div>
    
</body>
</html>