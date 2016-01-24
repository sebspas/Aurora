$(document).ready(function() {

	var lastRefresh = $.now();

	function upDateCo() {
		$.ajax({
			type: 'GET',
			url: window.ress.traitement + 'refresh-connexion.php',
			success: OnSuccess
		});
	}

	function OnSuccess(result) {
		lastRefresh = $.now();
	}

	$('html').click(function() {
		if (lastRefresh + 30 * 1000 < $.now()) {
			upDateCo();
		}
	});

	upDateCo();
});