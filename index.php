<?php
//session_name("Aurora");
session_start();

require_once('app/Config.class.php');

if(Config::$debug) {
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
}
require_once('app/Bd.class.php');

// attention aux headers à faire avant cette merde ....
require_once Config::$path['header'];


if (!empty($_GET['page']) && is_file(Config::$path['controller'].$_GET['page'].'.php'))
	require_once Config::$path['controller'].$_GET['page'].'.php';
else
	require_once Config::$path['controller'].'home.php';

require_once Config::$path['template'];
require_once Config::$path['footer'];