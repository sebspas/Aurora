$(document).ready(function() {

	$('.js-to-mission').click(function() {
		var fullframe = '<div class="fullframe"><div class="frame1 white cols6 js-center"><div class="frame-content">Gitan</div></div></div>';
		$('#main').append(fullframe);
		$('.js-to-menu-box').removeClass('icon-menu');
		$('.js-to-menu-box').addClass('icon-cancel');
		$('.js-center').center();
	});

}); // ready()