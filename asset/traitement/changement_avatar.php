<?
	session_start();
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);
	require_once('../../app/Config.class.php');
	require_once('../../app/Bd.class.php');

	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	$return = array();
	extract($_GET);


	if (!isset($image) || !preg_match('/^http[s]?:\/\/[-a-zA-Z0-9_.]*\/[-a-zA-Z0-9\/_.]*\.(jp[e]?g|png|gif)$/',$image)) {
			$return['error'] = "Url invalide";

	} else {
		$img = get_headers($image, 1);

		if($img['Content-Length'] > 356000) {
			$return['error'] = "Image trop lourde...300ko max";
		} else {
			$BD = new BD('user');
			$BD->update('avatar',$image,'iduser',$_SESSION['iduser']);
			$return['url'] = $image;
		}

	}

	echo json_encode($return);
?>