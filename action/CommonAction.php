<?php
	session_start();
    
    abstract class CommonAction {
        public static $VISIBILITY_PUBLIC = 0;
        public static $VISIBILITY_MEMBER = 1;
        public static $VISIBILITY_MODERATOR = 2;
        public static $VISIBILITY_ADMINISTRATOR = 3;

        private $pageVisibility;

        public function __construct($pageVisibility) {
            $this->pageVisibility = $pageVisibility;
        }

        public function execute() {
            if (empty($_SESSION["visibility"])) {
                $_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
            }

			if ($_SESSION["visibility"] < $this->pageVisibility) {
				header("location:index.php");
                echo "blabla";
				exit;
			}

            // Appeler l'enfant
            $data = $this->executeAction();
            $data["username"] = $_SESSION["username"] ?? "invité";
            $data["isConnected"] = $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
            return $data;
        }

        public function callAPI($service, array $data) {
            $apiURL = "https://magix.apps-de-cours.com/api/" . $service;
        
            $options = array(
                'http' => array(
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',
                    'content' => http_build_query($data)
                )
            );
            $context  = stream_context_create($options);
            $result = file_get_contents($apiURL, false, $context);
        
            if (strpos($result, "<br") !== false) {
                    var_dump($result);
                    exit;
                }
                
            return json_decode($result);
        }
        

        protected abstract function executeAction();
    }