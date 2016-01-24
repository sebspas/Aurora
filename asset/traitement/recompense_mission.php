<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../app/Config.class.php');
	require_once('../../app/Bd.class.php');

	extract($_GET);

	$levelUp = false;
	// on donne l'or recue en récompense
	$BD = new BD('user');
	$user = $BD->select('iduser',$_SESSION['iduser']);
	$BD->update('points',$user->points+$points,'iduser',$_SESSION['iduser']);
	//on définit le vaisseau utilisé comme vaisseau courant
	$BD->update('idvaisseau',$idvaisseau,'iduser',$_SESSION['iduser']);
	$_SESSION['money'] += $money;	
	$BD->update('money',$_SESSION['money'],'iduser',$_SESSION['iduser']);
	// on ajoute la mission à la liste des missions effectuées
	$BD->setUsedTable('effectue');
	// on test si la mission n'a pas déja été effectuée ?
	$nbFois = $BD->count2('iduser',$_SESSION['iduser'],'idmission',$idmission);
	if ($nbFois == 0) {
		$BD->addEffectue($_SESSION['iduser'],$idmission);
	}
	// on met à jour l'xp du vaisseau
	$BD->setUsedTable('vaisseau');
	$vaisseau = $BD->select('idvaisseau',$idvaisseau);	
	$BD->update('xp',$vaisseau->xp+$xp,'idvaisseau',$idvaisseau);
	$vaisseau = $BD->select('idvaisseau',$idvaisseau);	
	// on verifie si le vaisseau à level up, si oui on augment ses stats de +5 atk, +2def, +20pv
	$newXp = $vaisseau->xp - $vaisseau->nextlevel;
	// si il a level up on le précise au js et on met à jour ses stats
	if ($newXp >= 0) {
		$levelUp = true;
		$BD->update('nextlevel',(($vaisseau->nextlevel+50)*1.55),'idvaisseau',$idvaisseau);
		$BD->update('level',$vaisseau->level+1,'idvaisseau',$idvaisseau);
		$BD->update('xp',$newXp,'idvaisseau',$idvaisseau);
		$BD->update('pv',$vaisseau->pv+20,'idvaisseau',$idvaisseau);
		$BD->update('defense',$vaisseau->defense+2,'idvaisseau',$idvaisseau);
		$BD->update('attaque',$vaisseau->attaque+5,'idvaisseau',$idvaisseau);
	}
	echo json_encode($levelUp);
?>
