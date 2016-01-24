  <!-- </div> --><!-- #main -->
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>jquery.min.js"></script>
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>jquery.mobile-1.4.5.min.js"></script>
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>menu.js"></script>
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>mobile.js"></script>      
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>main.js"></script> 
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>market.js"></script> 
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>profil.js"></script> 
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>combat.js"></script> 
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>home.js"></script> 
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>hangar.js"></script> 
    <script type="text/javascript" src="<?php echo Config::$path['js'] ?>mission.js"></script>                                     
    <?php
        // si on n'est pas sur la page login ou home
        if (isset($_GET['page']) && $_GET['page'] != 'login' && $_GET['page'] != 'home') {
            echo '<script type="text/javascript" src="' . Config::$path['js'] . 'connexion-secure.js"></script>';
            echo '<script type="text/javascript" src="' . Config::$path['js'] . 'refresh-co.js"></script>';
        }
        else if (isset($_GET['page']) && $_GET['page'] == 'login'){
           echo '<script type="text/javascript" src="' . Config::$path['js'] . 'login.js"></script>'; 
        }
        else { 
           echo '<script type="text/javascript" src="' . Config::$path['js'] . 'connexion-secure.js"></script>'; 
           echo '<script type="text/javascript" src="' . Config::$path['js'] . 'refresh-co.js"></script>';                                       
        }
    ?>    
</body>
</html>