$(document).ready(function() {

	setInterval(
		function CheckCo() {
			$.ajax({
				type: 'GET',
				url: window.ress.model + 'connexion-secure.php',
				success: OnSuccess
			});
		}, 20000); // CheckCo(), delay)

	function OnSuccess(result) {
		if (result == false) {
			window.location = "http://51.255.41.18/Aurora/app/model/logout.php";
		}
	}

});