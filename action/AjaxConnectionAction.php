<?php
	require_once("action/CommonAction.php");

	class AjaxConnectionAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if(!empty($_POST)){ 
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];

                $result = parent::callAPI("signin", $data);
                if ($result != "INVALID_USERNAME_PASSWORD") {
                    $_SESSION["key"] = $result->key;
                    $_SESSION["winCount"] = $result->winCount;
                    $_SESSION["trophies"] = $result->trophies;    
                    $_SESSION["username"] = $_POST["username"];
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                }
            }	
            return compact("result");
		}
	}