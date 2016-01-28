<?php

$ua = $_SERVER['HTTP_USER_AGENT'];
if(preg_match("(iPhone|iPod|iPad|BlackBerry|Android|HTC|LG|MOT|Nokia|Palm|SAMSUNG|SonyEricsson|Mobile)",$ua))
{
	header("Status: 301 Moved Permanently", false, 301);
	header("Location : /m/index.php?page=home");
}

if (!isset($_SESSION['iduser'])) {
    header('Location: index.php?page=login');
    exit();
}

require_once(Config::$path['views'].'home.php');

?>