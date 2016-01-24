<?php
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../Config.class.php');
	require_once('../../../app/Bd.class.php');

	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	extract($_GET);

	$BD = new BD('user');

	if ($BD->isInDb('pseudo',$pseudo)) {
		$user = $BD->select('pseudo',$pseudo);

		if ($user->passwd == sha1($password)) {
			$BD->setUsedTable('connecté');
			if (!$BD->isInDb('iduser',$user->iduser)) {
				$BD->addCo($user->iduser);

				$_SESSION['pseudo'] = $pseudo;
				$_SESSION['iduser'] = $user->iduser;
				$energy = $user->energie / $user->maxenergie *100;
				$_SESSION['energie'] = $energy;
				$_SESSION['money'] = $user->money;
				$_SESSION['avatar'] = $user->avatar;
				$_SESSION['rang'] = $user->rang;

				$error = "Ok";
			}
			else {
				$error = "Vous etes déja connecté !";
			}
			
		}
		else {
			$error = "Mot de passe incorecte !";
		}
	}
	else {
		$error = "Pseudo inconnue !";
	}
	$d['type'] = "Login";
	$d['error'] = $error;
	echo json_encode($d);

?>