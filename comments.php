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