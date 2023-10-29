<?php
    require_once("action/ajaxStateAction.php");

    $action = new AjaxStateAction();
    $data = $action->execute();

    echo json_encode($data["result"]);