<?php

class Config {
    public static $debug = true;

    public static $dbInfo = array(
        'driver' => 'mysql:host=127.0.0.1;dbname=Aurora',
        'username' => 'root',
        'password' => 'aqwEDCtgb7;'
    );

    public static $path = array(
        'header' => 'app/layout/header.php',
        'footer' => 'app/layout/footer.php',
        'views' => 'app/view/',
        'controller' => 'app/controller/',
        'model' => 'app/model/',
        'css' => 'asset/css/',
        'images' => 'asset/images/',
        'videos' => 'asset/videos/',
        'js'    => 'asset/js/',
        'messagerie' => 'asset/messagerie/',
        'traitement' => 'asset/traitement/',
        'vaisseau' => 'asset/images/vaisseaux/',
        'items' => 'asset/images/items/'
    );
}