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
    <div id="main-header">
        <h1>Notes</h1>
        <button>Ajouter</button>
    </div>
    <div id="main">
        <div id="comment-container">
            <div class="comment">
                <div class="comment-head">
                    <div class="comment-subject">Sujet</div>
                    <div class="comment-date">Date</div>
                </div>
                <div class="comment-content"></div>
                <div class="comment-edit"></div>
            </div>
            <div class="comment">2</div>
            <div class="comment">3</div>
            <div class="comment">4</div>
            <div class="comment">5</div>
            <div class="comment">6</div>
            <div class="comment">7</div>
            <div class="comment">8</div>
            <div class="comment">1</div>
            <div class="comment">2</div>
            <div class="comment">3</div>
            <div class="comment">4</div>
            <div class="comment">5</div>
            <div class="comment">6</div>
            <div class="comment">7</div>
            <div class="comment">8</div>
        </div>
    </div>
</body>
</html>