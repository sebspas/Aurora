<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AURORA : <?php if (isset($_GET['page']) && !empty($_GET['page']) && is_file(Config::$path['controller'].$_GET['page'].'.php')) echo htmlentities($_GET['page']); else echo 'Home'; ?> </title>
    <link rel="stylesheet" href="<?php echo Config::$path['css'] ?>style.css" />
    <link href="<?php echo Config::$path['images'] ?>favicon.ico" type="image/x-icon" rel="icon" />
    <link href="<?php echo Config::$path['images'] ?>favicon.ico" type="image/x-icon" rel="shortcut icon" />
</head>
<body>
	<div id="header">
       <?php if (isset($_SESSION['iduser'])) {?>
	   <div class="menu">
            <nav class="menu-navigation">
               <div class="icon icon-menu js-to-menu-box" ></div>
               <div class="inline-block right">
                   <div class="icon icon-energy"></div>
                   <div class="icon-content js-energie"><?= $_SESSION['energie'] ?> %</div>
                   <div class="icon icon-coin"></div>
                   <div class="icon-content js-money"><?= $_SESSION['money'] ?> $</div>
                   <a class="icon icon-logout right" href="<?= Config::$path['model']?>logout.php" ></a>
                   <a class="menu-avatar js-profil">
                       <img class="js-avatar" src="<?= $_SESSION['avatar'] ?>" alt="avatar" />
                   </a>
               </div>
               
            </nav>
       </div><!-- .menu -->
       <div class="menu-box">
          <ul class="inline-block txt-center">
            <li class="home">
              <a class="menu-link js-home" href="#" title="Home">Home</a>
            </li>
            <li class="profil">
              <a class="menu-link js-profil" href="#" title="profil">Profil</a>
            </li>
            <li class="market">
              <a class="menu-link js-market" href="#" title="market">Market</a>
            </li>
            <li class="hangar">
              <a class="menu-link js-hangar" href="#" title="hangar">Hangar</a>
            </li>
          </ul>
       </div><!-- .menu-box -->
        <?php } ?>
        <div class="alpha">
           <img src="<?= Config::$path['images']?>alpha.png" alt="alpha">
        </div>
	</div><!-- #header -->
    <div id="main">