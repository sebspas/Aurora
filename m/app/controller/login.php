<?php 
if (isset($_SESSION['iduser'])) {
	header('Location: index.php?page=home');
}

require_once(Config::$path['views'].'login.php');
?>