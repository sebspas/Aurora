<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../../app/Config.class.php');
	require_once('../../../app/Bd.class.php');

	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	$BD = new BD('vaisseau');
	$listeVaisseau = $BD->selectMult('iduser',$_SESSION['iduser']);
	$listeMyNom = array();
	foreach ($listeVaisseau as $vaisseau) {
		$listeMyNom[] = $vaisseau->nom;
	}
	echo json_encode($listeMyNom);
?>