<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../app/Config.class.php');
	require_once('../../app/Bd.class.php');

	$BD = new BD('connecté');
	$BD->update('lastco',date("Y-m-d H:i:s",time()),'iduser',$_SESSION['iduser']);

?>