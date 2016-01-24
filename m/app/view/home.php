<div data-role="page"id="panel-fixed-page1" >
	<div id="header" data-role="header" data-position="fixed">
       <?php if (isset($_SESSION['iduser'])) {?>
            <h1>Aurora : <?php if (isset($_GET['page']) && !empty($_GET['page']) && is_file(Config::$path['controller'].$_GET['page'].'.php')) echo htmlentities($_GET['page']); else echo 'Home'; ?></h1>
            <a href="#PanelLeft"  data-icon="bars" data-iconpos="notext" >Menu</a>
             <a id="logout" class="ui-btn ui-corner-all ui-icon-power ui-btn-icon-notext">Logout</a>
        <?php } ?>
	</div>
  <div id="PanelLeft" data-role="panel" data-position-fixed="true" data-display="push">
      <ul class="ui-listview" data-role="listview">
         <li data-icon="delete">
             <a href="#" data-rel="close">Close menu</a>
         </li>
         <li class="home" data-icon="home">
             <a class="menu-link js-home" href="#" title="Home">Home</a>
         </li>
         <li class="profil" data-icon="user">
           <a class="menu-link js-profil" href="#" title="profil">Profil</a>
         </li>
         <li class="market" data-icon="shop">
           <a class="menu-link js-market" href="#" title="market">Market</a>
         </li>
         <li class="hangar" data-icon="grid">
           <a class="menu-link js-hangar" href="#" title="hangar">Hangar</a>
         </li>
         <li>
           <span class="icon icon-coin"></span>
           <span class="icon-content js-money"><?= $_SESSION['money'] ?> $</span>
         </li>
         <li>
           <span class="icon icon-energy"></span>
           <div class="icon-content js-energie"><?= $_SESSION['energie'] ?> %</div>
         </li>
      </ul>
  </div><!-- /#PanelLeft -->
	<div role="main" class="main ui-content ui-body-b ui-body" data-theme="c">
		<!-- Gestion automatisée en js -->
	</div><!-- /.main -->
	<div data-role="footer">Aurora - 2015</div>
</div><!-- /#panel-fixed-page1 -->



<div data-role="page" id="Frame">
  <div data-role="header">
    <h1>Aurora</h1>
    <a role="button" data-role="button" class="ui-link ui-btn-left ui-btn ui-icon-carat-l ui-btn-icon-notext ui-shadow ui-corner-all" href="#panel-fixed-page1" data-rel="back" data-icon="carat-l" data-iconpos="notext">Back</a>
  </div><!-- /header -->
  <div id="popupDialog" data-position-to="window" data-transition="pop" data-role="popup" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:400px;">
    
  </div> <!-- /#popupDialog -->
  <div role="main" class="contents ui-content ui-body-b ui-body" data-theme="c">
    <!-- Gestion automatisée en js -->
  </div><!-- /content -->
</div><!-- /#Frame -->