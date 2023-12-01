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
    <div id="back">
        <!-- https://codepen.io/shunyadezain/pen/rNWawyP -->
        <a href="lobby.php" class="link">
            <div class="link-icon">
                <svg class="icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                    clip-rule="evenodd">
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                </svg>
                <svg class="icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                    clip-rule="evenodd">
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                </svg>
            </div>
            <span class="mask">
                <div class="link-container">
                    <span class="link-title1 title">RETOUR</span>
                    <span class="link-title2 title">RETOUR</span>
                </div>
            </span>
        </a>
    </div>
    <div id="main-header">
        <h1>Notes</h1>
        <div id="new"></div>
    </div>
    <div id="main">
        <div id="comment-container">

            <?php foreach ($data["notes"] as $note) { ?>

                <div class="comment" id="c<?= $note["id"] ?>">
                    <div class="comment-head">
                        <div class="comment-subject">
                            <?= $note["title"] ?>
                        </div>
                        <div class="comment-date">
                            <?= $note["date"] ?>
                        </div>
                    </div>
                    <div class="comment-content">
                        <p>
                            <?= $note["note"] ?>
                        </p>
                    </div>
                    <div class="comment-action">
                        <div class="comment-edit"><span class="id">
                                <?= $note["id"] ?>
                            </span></div>
                        <div class="comment-delete">
                            <span class="id">
                                <?= $note["id"] ?>
                            </span>
                        </div>
                    </div>
                </div>

            <?php } ?>
        </div>
    </div>
</body>

</html>