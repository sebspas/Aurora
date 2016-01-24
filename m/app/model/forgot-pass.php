<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../Config.class.php');
	require_once('../../../app/Bd.class.php');

	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	$d = [];
	extract($_GET);

	if (isset($_SESSION['timestamp']) && $_SESSION['timestamp']+2*60 < time()) {
		$d['msg'] = "Envoi déjà effectuer meri de patienter 2min...";
	}
	else {
		$_SESSION['timestamp'] = time();
	}

	$token = uniqid(rand(), true);
	$token = sha1($token);

	updateTok($_POST['email'],$token);

	$link = "http://51.255.41.18/index.php?page=pass&mail=" . $_POST['email'] . "&tok=" . $token;

	mail($email, "Mot de passe changement !",$link);

	$d['type'] = "Forgot";
	echo json_encode($d);
?>