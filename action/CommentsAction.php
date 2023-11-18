<?php
	require_once("action/CommonAction.php");
    require_once("action/DAO/NotesDAO.php");

	class CommentsAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
            if(!empty($_POST)) {
                if($_POST["action"] == "add") {
                    NotesDAO::addNote($_POST["title"], $_POST["note"]);
                } elseif($_POST["action"] == "update") {
                    NotesDAO::updateNote($_POST["answer"], $_POST["id"]);
                }
            }
            $notes = NotesDAO::getNotes();
            return compact("notes");
            
        }
    }	