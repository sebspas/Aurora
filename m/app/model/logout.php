<?php
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	session_start();
	require_once('../Config.class.php');
	require_once('../../../app/Bd.class.php');

	$BD = new BD('connecté');
	$BD->delete('iduser',$_SESSION['iduser']);

	$_SESSION = array();
	if (isset($_COOKIE[session_name()]))
	{setcookie(session_name(),'',time()-4200,'/');}

	session_destroy();
	header('Location: http://51.255.41.18/m/');
?>