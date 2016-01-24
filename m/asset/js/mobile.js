$(document).ready(OnReady);

function OnReady() {
	$("#logout").click(onLogout);
} // OnReady()


function onLogout() {
	window.location = "http://js.holobox.fr/m/app/model/logout.php";
} // onLogout()