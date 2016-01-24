<?php
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

    $db = new PDO('mysql:dbname=JS;host=127.0.0.1', 'root', 'aqwEDCtgb7');
    $db->exec('SET CHARACTER SET utf8');

    $req = $db->prepare("SELECT * FROM `connecté` ");
    $req->execute();

    $listUserCo = $req->fetchAll(PDO::FETCH_OBJ);

    $req->closeCursor();

	foreach ($listUserCo as $user) {

		if (($user->lastco+5*60) < time()) {
	        $req = $db->prepare("DELETE FROM `connecté` WHERE `iduser` = ?");

	        $req->execute(array($user->iduser));

	        $req->closeCursor();
		}
	}

?>