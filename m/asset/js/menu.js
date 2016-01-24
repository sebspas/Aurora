$(document).ready(function() {

	function switchToIconCancel() {
			$('.js-to-menu-box').removeClass('icon-menu');
			$('.js-to-menu-box').addClass('icon-cancel');
		} // switchToIconCancel ()

	function switchToIconMenu() {
			$('.js-to-menu-box').removeClass('icon-cancel');
			$('.js-to-menu-box').addClass('icon-menu');
		} // switchToIconCancel ()


	if ($('.fullframe').is(':visible')) {
		switchToIconCancel();
	}



	$('.js-to-menu-box').click(function(e) {
		e.preventDefault();
		e.stopPropagation();

		if ($('.fullframe').is(':visible')) {
			$('.fullframe').fadeOut().remove();
			switchToIconMenu();
		} else {
			if ($('.menu-box').is(':hidden')) {
				$('.menu-box').fadeIn();
				switchToIconCancel();
			} else {
				$('.menu-box').fadeOut();
				switchToIconMenu();
			}
		}

	});

}); // ready()