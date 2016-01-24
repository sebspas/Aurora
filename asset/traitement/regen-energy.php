<?php
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

    $db = new PDO('mysql:dbname=Aurora;host=127.0.0.1', 'root', 'aqwEDCtgb7;');
    $db->exec('SET CHARACTER SET utf8');

    $req = $db->prepare("UPDATE `user` SET `energie` = `energie` + 20 WHERE (`energie`+20) <= 100");
    $req->execute();

    $req->closeCursor();

?>