<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../app/Config.class.php');
	require_once('../../app/Bd.class.php');

	extract($_GET);

	$BD = new BD('spaceship');
	$spaceship = $BD->select('idspaceship',$idship);
	$BD->setUsedTable('vaisseau');
	$BD->addVaisseau($spaceship->nom,
		$spaceship->desc,
		$spaceship->pv,
		$spaceship->attaque,
		$spaceship->defense,
		$spaceship->xp,
		$spaceship->nextlevel,
		$spaceship->type,
		$spaceship->image, 
		$_SESSION['iduser']);
	$BD->setUsedTable('user');
	$BD->update('rang',1,'iduser',$_SESSION['iduser']);
	$BD->setUsedTable('vaisseau');
	$idvaisseau = $BD->select('iduser',$_SESSION['iduser']);
	$BD->setUsedTable('user');
	$BD->update('idvaisseau',$idvaisseau->idvaisseau,'iduser',$_SESSION['iduser']);
	$_SESSION['rang'] = 1;
?>
