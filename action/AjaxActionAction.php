<?php
	require_once("action/CommonAction.php");

	class AjaxActionAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];

			if (!empty($_POST)) {
				$data["type"] = $_POST["type"];
				if ($data["type"] == "PLAY") {
					$data["uid"] = $_POST["uid"];
					$result = CommonAction::callAPI('games/action', $data);
					return compact("result");
				} elseif ($data["type"] == "END_TURN") {
					$result = CommonAction::callAPI('games/action', $data);
					return compact("result");
				} elseif ($data["type"] == "ATTACK") {
					$data["uid"] = $_POST["uid"];
					$data["targetuid"] = $_POST["targetuid"];
					$result = CommonAction::callAPI('games/action', $data);
					return compact("result");
				}
			}	

            return [];

            
		}
	}