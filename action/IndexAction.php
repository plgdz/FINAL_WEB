<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
            if(!empty($_POST)){
                $connection = 0;
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];

                $result = parent::callAPI("signin", $data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                	$connection = 0;
                }
                else {
                	// Pour voir les informations retournées : var_dump($result);exit;
                    var_dump($result);
                	$key = $result->key;
                    $connection = 1;
                    
                }

                echo var_dump($result);

                return compact("connection");
            }
            
        }
    }	
