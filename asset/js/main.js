$(document).ready(function() {
	ress = {
		images: './asset/images/',
		loader: './asset/traitement/loader/',
		vaisseaux: './asset/images/vaisseaux/',
		ennemies: './asset/images/vaisseaux/bad/',
		model: './app/model/',
		traitement: './asset/traitement/',
		items: './asset/images/items/',
		profils: './asset/images/avatar/',
		mission: './asset/images/missions/'
	};

	// boolean pour le chargement et le changement de page 
	// par défaut on est sur la page home
	page = "home";
	missionLaunch = false;
	/*******************************************************
	 *			Gestion du menu
	 * ******************************************************/
	$('.js-home').click(function() {

		if (page != "home") {
			$('.main').fadeOut(0, function() {

				$('#bg-' + page).attr('id', 'bg-home');
				$(this).empty();
				$('#m-market').remove();
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
			$('#bg-' + page).attr('id', 'bg-market');
			$('.main').fadeOut(0, function() {
				$(this).empty();
				$('#m-market').remove();
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
			$('.main').fadeOut(0, function() {
				$('#bg-' + page).attr('id', 'bg-profil');
				$(this).empty();
				$('#m-market').remove();
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
			$('#bg-' + page).attr('id', 'bg-hangar');
			$('.main').fadeOut(0, function() {
				$(this).empty();
				$('#m-market').remove();
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
			.attr('class', 'row')
			.append(
				$('<div>')
				.attr('class', 'frame0 t-black c-white')
				.append(
					$('<img>')
					.attr({
						'class': 'cortana left',
						'src': window.ress.images + 'cortana.gif',
						'alt': 'cortana'
					}),
					$('<h2>')
					.attr('class', 'title2')
					.html('Cortana'),
					$('<p>')
					.attr('class', 'title3')
					.html(dialog)));
		return cortana;
	};

	$('.js-center').center();

	$(this).scrollT();

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

		$( "#pseudo1" ).parent().addClass('is-focused has-label');
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

		$( "#pseudo" ).parent().addClass('is-focused has-label');
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

		$( "#email3" ).parent().addClass('is-focused has-label');
	});

	/* FORM */

	$( "#pseudo" ).parent().addClass('is-focused has-label');

	$('.field-input').focus(function() {
		$(this).parent().addClass('is-focused has-label');
	});

	$('.field-input').blur(function() {
		$parent = $(this).parent();

		if ($(this).val() == '') {
			$parent.removeClass('has-label');
			$parent.removeClass('is-focused');
		} else
			$(this).addClass('is-full');

		$parent.removeClass('is-focused');
	});

}); // ready()