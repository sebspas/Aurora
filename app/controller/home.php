<?php
if (!isset($_SESSION['iduser'])) {
    header("Location: index.php?page=login");
    exit();
}

$ua = $_SERVER['HTTP_USER_AGENT'];
if(preg_match("(iPhone|iPod|iPad|BlackBerry|Android|HTC|LG|MOT|Nokia|Palm|SAMSUNG|SonyEricsson|Mobile)",$ua))
{
	header("Status: 301 Moved Permanently", false, 301);
	header("Location : /m/index.php?page=home");
}

require_once(Config::$path['views'].'home.php');

?>