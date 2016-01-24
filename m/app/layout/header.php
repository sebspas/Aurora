<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURORA : <?php if (isset($_GET['page']) && !empty($_GET['page']) && is_file(Config::$path['controller'].$_GET['page'].'.php')) echo htmlentities($_GET['page']); else echo 'Home'; ?> </title>
    <link rel="stylesheet" href="http://js.holobox.fr/m/asset/css/jquery.mobile-1.4.5.min.css" />
    <link href="<?php echo Config::$path['images'] ?>favicon.ico" type="image/x-icon" rel="icon" />
    <link href="<?php echo Config::$path['images'] ?>favicon.ico" type="image/x-icon" rel="shortcut icon" />
</head>
<body>
<!--<div data-role="page">-->
	
    <!-- <div id="main" role="main" class="ui-content"> -->