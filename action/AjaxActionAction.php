<?php
	require_once("action/CommonAction.php");

	class AjaxActionAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];

            var_dump($_POST);

            // $result = CommonAction::callAPI('games/state', $data);
			// return compact("result");
		}
	}