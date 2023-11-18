<?php
    require_once("action/ajaxConnectionAction.php");

    $action = new AjaxConnectionAction();
    $data = $action->execute();

    echo json_encode($data["result"]);