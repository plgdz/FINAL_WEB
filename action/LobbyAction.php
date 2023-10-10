<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
            if(!empty($_POST)){
				echo $_POST["game_mode"];



			}
			return [];
        }
    }