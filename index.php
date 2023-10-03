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
        <div id="top-container">
            <img src="./images/logo/logo.png" alt="logo" id="logo">
            <h2>LOGIN</h2>
            <div id="break"></div>
        </div>
        
        <div id="box-login">
            <form action="" method="post">
                <div id="input-container">
                    <input type="text" name="username" id="username" placeholder="Votre nom d'utilisateur">
                    <input type="password" name="password" id="password" placeholder="Mot de passe">
                </div>
                <button type="submit">PLAY</button>
            </form>
        </div>
    </div>
    
</body>
</html>