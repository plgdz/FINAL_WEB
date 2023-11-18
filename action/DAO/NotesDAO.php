<?php
    require_once("action/DAO/Connection.php");
    
    class NotesDAO {
        public static function getNotes(){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * FROM notes");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function addNote($title, $note){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO notes (title, note) VALUES (?, ?)");
            $statement->bindParam(1, $title);
            $statement->bindParam(2, $note);
            $statement->execute();
        }

        public static function deleteNote($id){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("DELETE FROM notes WHERE id = ?");
            $statement->bindParam(1, $id);
            $statement->execute();
        }

        public static function updateNote($newNote, $id){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("UPDATE notes SET note = ? WHERE id = ?");
            $statement->bindParam(1, $newNote);
            $statement->bindParam(2, $id);
            $statement->execute();
        }

    }