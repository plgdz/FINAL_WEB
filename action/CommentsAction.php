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
                } elseif($_POST["action"] == "edit") {
                    NotesDAO::updateNote($_POST["title"], $_POST["note"], $_POST["id"]);
                } elseif($_POST["action"] == "delete") {
                    NotesDAO::deleteNote($_POST["id"]);
                }
            }
            $notes = NotesDAO::getNotes();
            return compact("notes");
            
        }
    }	