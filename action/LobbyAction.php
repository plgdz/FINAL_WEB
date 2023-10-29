<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			$data = [];
			$data['key'] = $_SESSION["key"];
			$data["win"] = $_SESSION["winCount"]; 
			$data["loss"] = $_SESSION["lossCount"]; 
			$data["trophies"] = $_SESSION["trophies"];

			if(!empty($_POST["signout"])) {
				$result = parent::callAPI("signout", $data);
				if($result == 'SIGNED_OUT') {
					$_SESSION['visibility'] = CommonAction::$VISIBILITY_PUBLIC;
					session_destroy();
					header('location:index.php');
				} 
			} elseif (!empty($_POST['game_mode'])) {
				$dataAPI = [];
				$dataAPI['type'] = $_POST['game_mode'];
				$dataAPI['key'] = $data['key'];
				$result = CommonAction::callAPI('games/auto-match', $dataAPI);

				if($result == 'JOINED_PVP' || $result == 'CREATED_PVP' || $result == 'JOINED_TRAINING') {
					header('location:game.php');
				} else {
					echo $result;
				}
			}
			return $data;
        }
    }