<?php

if (!isset($_SESSION['iduser'])) {
	header('Location:index.php?page=login');
	exit();
}

require_once(Config::$path['views'].'home.php');

?>