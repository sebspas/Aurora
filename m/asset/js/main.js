$(document).ready(function() {

	ress = {
		images: 'http://js.holobox.fr/asset/images/',
		loader: '../../asset/traitement/loader/',
		vaisseaux: 'http://js.holobox.fr/asset/images/vaisseaux/',
		ennemies: 'http://js.holobox.fr//asset/images/vaisseaux/bad/',
		model: '../../app/model/',
		traitement: '../../asset/traitement/',
		items: 'http://js.holobox.fr/asset/images/items/',
		profils: 'http://js.holobox.fr/asset/images/avatar/'
	};

	// boolean pour le chargement et le changement de page 
	// par défaut on est sur la page home
	page = "home";

	/*******************************************************
	 *			Gestion du menu
	 * ******************************************************/
	$('.js-home').click(function() {
		if (page != "home") {
			$('#Navbar').remove();	
			$('.main').fadeOut(0, function() {
				$('#bg-' + page).attr('id', 'bg-home');
				$(this).empty();
				ChargementHomePage();
				$('.menu-box').fadeOut();
				$('.js-to-menu-box').removeClass('icon-cancel');
				$('.js-to-menu-box').addClass('icon-menu');
				$('.main').fadeIn(400);

			});
			page = "home";
		} else {
			$('.menu-box').fadeOut();
			$('.js-to-menu-box').removeClass('icon-cancel');
			$('.js-to-menu-box').addClass('icon-menu');
		}
	});
	$('.js-market').click(function() {
		if (page != "market") {
			$('#Navbar').remove();
			//$('.main').css('margin-top', '35px');
			$('#bg-' + page).attr('id', 'bg-market');
			$('.main').fadeOut(0, function() {
				$(this).empty();
				ChargementMarketPage();
				$('.menu-box').fadeOut();
				$('.js-to-menu-box').removeClass('icon-cancel');
				$('.js-to-menu-box').addClass('icon-menu');
				$('.main').fadeIn(400);

			});
			page = "market";
		} else {
			$('.menu-box').fadeOut();
			$('.js-to-menu-box').removeClass('icon-cancel');
			$('.js-to-menu-box').addClass('icon-menu');
		}
	});
	$('.js-profil').click(function() {
		if (page != "profil") {
			$('#Navbar').remove();			
			$('.main').fadeOut(0, function() {
				$('#bg-' + page).attr('id', 'bg-profil');
				$(this).empty();
				ChargementProfilPage();
				$('.menu-box').fadeOut();
				$('.js-to-menu-box').removeClass('icon-cancel');
				$('.js-to-menu-box').addClass('icon-menu');
				$('.main').fadeIn(400);

			});
			page = "profil";
		} else {
			$('.menu-box').fadeOut();
			$('.js-to-menu-box').removeClass('icon-cancel');
			$('.js-to-menu-box').addClass('icon-menu');
		}
	});
	$('.js-hangar').click(function() {
		if (page != "hangar") {
			$('#Navbar').remove();	
			$('#bg-' + page).attr('id', 'bg-hangar');
			$('.main').fadeOut(0, function() {
				$(this).empty();
				ChargementHangarPage();
				$('.menu-box').fadeOut();
				$('.js-to-menu-box').removeClass('icon-cancel');
				$('.js-to-menu-box').addClass('icon-menu');
				$('.main').fadeIn(400);

			});
			page = "hangar";
		} else {
			$('.menu-box').fadeOut();
			$('.js-to-menu-box').removeClass('icon-cancel');
			$('.js-to-menu-box').addClass('icon-menu');
		}
	});
	
	cortana_dialog = function(dialog) {
		var cortana = $('<div>')
			.attr('class', 'ui-grid-e ui-bar ui-bar-a')
			.append(
				$('<div>')
				.attr('class', 'ui-block-a')
				.append(
					$('<div>')
					.attr('class', 'ui-bar')
					.append(
						$('<img>')
						.attr({
							'class': 'cortana left',
							'src': window.ress.images + 'cortana.gif',
							'alt': 'cortana'
						})
					)
				),

				$('<div>')
				.attr('class', 'ui-block-b')
				.append(
					$('<div>')
					.attr('class', 'ui-bar')
					.append(
						$('<h2>')
						.attr('class', 'title2')
						.html('Cortana'),
						$('<p>')
						.attr('class', 'title3')
						.html(dialog)
					)
				)
				
			).click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).slideUp();
			});
		return cortana;
	};


	$('#login-box')
		.animate({
			'opacity': '1',
			'margin-top': '15%'
		}, 800);

	$('.js-to-signup').click(function() {
		if ($('.login-form').is(':visible')) {
			$('.login-form').fadeOut(
				function() {
					$('.signup-form').fadeIn();
				}
			);
		} else {
			$('.forgot-form').fadeOut(
				function() {
					$('.signup-form').fadeIn();
				}
			);
		}
	});


	$('.js-to-login').click(function() {
		if ($('.signup-form').is(':visible')) {
			$('.signup-form').fadeOut(
				function() {
					$('.login-form').fadeIn();
				}
			);
		} else {
			$('.forgot-form').fadeOut(
				function() {
					$('.login-form').fadeIn();
				}
			);
		}
	});

	$('.js-to-forgot').click(function() {
		if ($('.signup-form').is(':visible')) {
			$('.signup-form').fadeOut(
				function() {
					$('.forgot-form').fadeIn();
				}
			);
		} else {
			$('.login-form').fadeOut(
				function() {
					$('.forgot-form').fadeIn();
				}
			);
		}
	});

}); // ready()