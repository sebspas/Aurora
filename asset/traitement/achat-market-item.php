<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../app/Config.class.php');
	require_once('../../app/Bd.class.php');

	extract($_GET);
	// recupération de l'item
	$BD = new BD('item');
	$item = $BD->select('idiitem',$iditem);

	// ajout de l'item
	$BD->setUsedTable('equipement');
	$BD->addItem($_SESSION['iduser'],$item->idiitem);

	//retrait de l'or
	$BD->setUsedTable('user');
	$_SESSION['money'] -= $item->prix;
	$BD->update('money',$_SESSION['money'],'iduser',$_SESSION['iduser']);

	echo json_encode($_SESSION['money']);
?>