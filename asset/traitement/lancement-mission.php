<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../app/Config.class.php');
	require_once('../../app/Bd.class.php');

	extract($_GET);
	// on met a jour l'argent du joueur
	$BD = new BD('user');
	$_SESSION['energie'] -= $energie;
	$BD->update('energie',$_SESSION['energie'],'iduser',$_SESSION['iduser']);
	
	// on met la mission comme courante

	echo json_encode($_SESSION['energie']);
?>
