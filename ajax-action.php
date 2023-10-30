<?php
    require_once("action/ajaxActionAction.php");

    $action = new AjaxActionAction();
    $data = $action->execute();

    echo json_encode($data["result"]);