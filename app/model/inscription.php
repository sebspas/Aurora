<?php

	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../Config.class.php');
	require_once('../Bd.class.php');

	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	extract($_GET);

	$BD = new BD('user');
	$BD->addUser($pseudo, $email, $password);

	echo json_encode("Sign");

?>