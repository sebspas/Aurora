<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../../app/Config.class.php');
	require_once('../../../app/Bd.class.php');

	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	$BD = new BD('equipement');
	$listeEquipement = $BD->selectMult('iduser',$_SESSION['iduser']);
	$BD->setUsedTable('item');
	$listeMyItems = array();	
	foreach ($listeEquipement as $equipement) {
		if ($equipement) {
			$Item = $BD->select('idiitem',$equipement->iditem);
			$listeMyItems[] = $Item;
		}
	}
	echo json_encode($listeMyItems);
?>