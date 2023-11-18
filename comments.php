<?php
    require_once("action/CommentsAction.php");
    $action = new CommentsAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/comments.css">
    <script src="js/comments.js"></script>
    <title>Magix Dofus</title>
</head>
<body>
    <div id="main">
        
    </div>
</body>
</html>