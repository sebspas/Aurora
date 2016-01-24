$(document).ready(OnReady);
var currentPage = "Ship";
var listeShip;
var listeItems;
var money;

function OnReady() {
	if (page == "market") {
		ChargementMarketPage();
	}


}
function ChargementMarketPage() {
	$('#header').append(menuMarket());
	$.ajax({
		url: window.ress.loader + 'load-market-money.php',
		success: function(data) {
			money = data;
		}
	})
	$.ajax({
		url: window.ress.loader + 'load-market-ship.php',
		success: function(data) {
			listeShip = data;
			$('.main').append(cortana_dialog('Ici c\'est le marché vous pouvez y acheter des vaisseaux, cliquez sur le menu items pour choisir des équipements.'));
			chargement_ship(data);
		}
	})
	$.ajax({
		url: window.ress.loader + 'load-market-items.php',
		success: function(data) {
			listeItems = data;
		}
	})
}

function menuMarket() {

	return $('<div>')
		.attr({
			'data-role': 'navbar',
			'class': 'ui-navbar',
			'id': 'Navbar'
		})
		.append(
			$('<ul>')
			.attr('class', 'ui-grid-a')
			.append(
				$('<li>')
				.attr('class', 'ui-block-a')
				.append(
					$('<a>')
					.attr({
						'href': '#',
						'class': 'ui-link ui-btn ui-btn-active',
						'id': 'Vaisseau'
					})
					.html('Vaisseau')
	 				.click(function(event) {
	 					$('#Equipement').attr('class', 'ui-link ui-btn');
	 					$(this).attr('class', 'ui-link ui-btn ui-btn-active');
	 					market_swap_content("js-ship");
	 				})
				),

				$('<li>')
				.attr('class', 'ui-block-b')
				.append(
					$('<a>')
					.attr({
						'href': '#',
						'class': 'ui-link ui-btn',
						'id': 'Equipement'
					})
					.html('Equipement')
	 				.click(function(event) {
	 					$('#Vaisseau').attr('class', 'ui-link ui-btn');
	 					$(this).attr('class', 'ui-link ui-btn ui-btn-active');
	 					market_swap_content("js-items");
	 				})
				)
			)
		);
}

function market_swap_content(button) {
	if (button === "js-ship" && currentPage != "Ship") {
		currentPage = "Ship";

		$('.main').fadeOut(500, function() {
			$(this).empty();
			$('.main').append(cortana_dialog('Ici c\'est le marché vous pouvez y acheter des vaisseaux, cliquez sur le menu items pour choisir des équipements.'));
			chargement_ship(listeShip);
			$('.main').fadeIn(500);
		});


		// Animation du menu 
		$('#item-option').animate({
			height: "0"
		}, 500, function() {
			$('#ship-option').animate({
				height: "+=100"
			}, 500);
		});
	} else if (button === "js-items" && currentPage != "Items") {
		currentPage = "Items";
		$('.main').fadeOut(500, function() {
			$(this).empty();
			$('.main').append(cortana_dialog('Ici c\'est le marché vous pouvez y acheter des équipements, cliquez sur le menu vaisseau pour choisir des vaisseaux.'));
			chargement_item(listeItems);
			$('.main').fadeIn(500);
		});

		// Animation du menu 
		$('#ship-option').animate({
			height: "0"
		}, 500, function() {
			$('#item-option').animate({
				height: "+=100"
			}, 500);
		});
	} else {
		return;
	}

};

function pop_in_ship(vaisseau) {
	var bouton_achat = $('<a>')
		.attr({
			'href': '#',
			'class': ' ui-btn'
		})
		.html('Acheter')
		.click(function(event) {
			alert('Vous n\'avez pas assez d\'argent :\'(');
		});
	if (money - vaisseau.prix >= 0) {
		bouton_achat = $('<a>')
			.attr({
				'href': '#',
				'class': vaisseau.idspaceship + ' ui-btn'
			})
			.html('Acheter')
			.click(function(event) {
				$.ajax({
					url: window.ress.traitement + 'achat-market-ship.php',
					data: {
						idship: vaisseau.idspaceship
					},
					success: function(data) {
						money = data;
						$('.js-money').html(money);
						alert('Achat effectué avec succés :D');
						$.mobile.changePage('#panel-fixed-page1');
						$('.main').fadeOut(500, function() {
							$(this).empty();
							$('.main').append(cortana_dialog('Ici c\'est le marché vous pouvez y acheter des vaisseaux, cliquez sur le menu items pour choisir des équipements.'));
							chargement_ship(listeShip);
							$('.main').fadeIn(500);
						});
					}
				})
			});
	}
	var type = 'Leger';
	if (vaisseau.type == 2) {
		type = 'Moyen';
	}
	return $('<div>')
		.attr('class', 'ui-grid-solo')
		.append(
			$('<div>')
			.attr('class', 'ui-block-a js-center')
			.append(
				$('<div >')
				.attr('class', 'ui-bar ui-bar-a')
				.append(
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h2 class="title1" >')
						.attr('class', 'title1')
						.html(vaisseau.nom + ' - ' + type)),
					$('<div>')
					.attr('class', 'row')
					.append(
						$('<img>')
						.attr({
							src: window.ress.vaisseaux + vaisseau.image,
							alt: '',
							'class': 'cols7'
						})),
					$('<div>')
					.attr('class', 'line3')
					.append(
						$('<p>')
						.html(vaisseau.desc)),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<div>')
						.attr('class', 'icon icon-pv'),
						$('<div>')
						.attr('class', 'icon-content')
						.html(vaisseau.pv + ' PV'),
						$('<div>')
						.attr('class', 'icon icon-defense'),
						$('<div>')
						.attr('class', 'icon-content')
						.html(vaisseau.defense + ' DEF'),
						$('<div>')
						.attr('class', 'icon icon-attaque'),
						$('<div>')
						.attr('class', 'icon-content')
						.html(vaisseau.attaque + ' ATK')),
					$('<div>')
					.attr('class', 'line2')
					.append(
						$('<h2>')
						.attr('class', 'prix left')
						.html(vaisseau.prix),
						bouton_achat))));
}



function pop_in_item(item) {
	var bouton_achat = $('<a>')
		.attr({
			'href': '#',
			'class': ' ui-btn'
		})
		.html('Acheter')
		.click(function(event) {
			alert('Vous n\'avez pas assez d\'argent :\'(');
		});
	if (money - item.prix >= 0) {
		bouton_achat = $('<a>')
			.attr({
				'href': '#',
				'class': item.idiitem + ' ui-btn'
			})
			.html('Acheter')
			.click(function(event) {
				$.ajax({
					url: window.ress.traitement + 'achat-market-item.php',
					data: {
						iditem: item.idiitem
					},
					success: function(data) {
						money = data;
						$('.js-money').html(money);
						alert('Achat effectué avec succés :D');
						$.mobile.changePage('#panel-fixed-page1');
						$('.main').fadeOut(500, function() {
							$(this).empty();
							$('.main').append(cortana_dialog('Ici c\'est le marché vous pouvez y acheter des équipements, cliquez sur le menu vaisseau pour choisir des vaisseaux.'));
							chargement_item(listeItems);
							$('.main').fadeIn(500);
						});
					}
				})
			});
	}


	return $('<div>')
		.attr('class', 'ui-grid-solo')
		.append(
			$('<div>')
			.attr('class', 'ui-block-a js-center')
			.append(
				$('<div >')
				.attr('class', 'ui-bar ui-bar-a')
				.append(
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h2 class="title1" >')
						.attr('class', 'title1')
						.html(item.nom)),
					$('<div>')
					.attr('class', 'row')
					.append(
						$('<img>')
						.attr({
							src: window.ress.items + item.image,
							alt: '',
							'class': 'img2'
						})),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<p>')
						.html(item.desc)),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h2>')
						.attr('class', 'prix left')
						.html(item.prix),
						bouton_achat))));
}

function chargement_item(ListeItems) {
	$.ajax({
		url: window.ress.loader + 'load-nom-items.php',
		success: function(data) {
			var cols = $('<div>').attr('class', 'ui-grid-a ui-responsive mg-tb-25');
			var numCol  = 0;
			var tabLetter = {
				"0":"a",
				"1":"b",
				"2":"c"
			};
			for (var i = ListeItems.length - 1; i >= 0; i--) {
				if(numCol > 1) numCol = 0;
				if (-1 == $.inArray(ListeItems[i].nom, data)) {
					cols.append(sell_item(ListeItems[i], tabLetter[numCol]));
				} else {
					cols.append(selled_item(ListeItems[i], tabLetter[numCol]));
				}
				numCol++;
			};
			$('.main').append(cols);
			$('.achete').css('background-color', 'green');
		}
	})
}

function selled_item(item, col) {
	return $('<div>')
		.attr('class', 'mg-tb-25 ui-block-' + col)
		.append(
			$('<div>')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2>')
					.attr('class', 'title1 txt-center')
					.html(item.nom)),
				$('<div>')
				.attr('class', 'row')
				.append(
					$('<img>')
					.attr({
						src: window.ress.items + item.image,
						alt: item.nom
					})),
				$('<div>')
				.attr('class', 'line3')
				.append(
					$('<p>')
					.html(item.desc)),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2>')
					.attr('class', 'prix left')
					.html(item.prix + " $"),
					$('<a>')
					.attr({
						href: '#',
						'class': 'ui-btn achete'
					})
					.html('Acheté'))));
}

function sell_item(item, col) {
	return $('<div>')
		.attr('class', 'mg-tb-25 ui-block-' + col)
		.append(
			$('<div>')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2>')
					.attr('class', 'title1 txt-center')
					.html(item.nom)),
				$('<div>')
				.attr('class', 'row')
				.append(
					$('<img>')
					.attr({
						src: window.ress.items + item.image,
						alt: item.nom
					})),
				$('<div>')
				.attr('class', 'line3')
				.append(
					$('<p>')
					.html(item.desc)),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2>')
					.attr('class', 'prix left')
					.html(item.prix + " $"),
					$('<a>')
					.attr({
						href: '#Frame',
						'class': item.idiitem + ' ui-btn js-buy-item'
					})
					.click(function() {
						// remplir la frame corectement
						$('#Frame .contents')
							.empty()
							.append(pop_in_item(item));
						/*$('.js-to-menu-box').removeClass('icon-menu');
						$('.js-to-menu-box').addClass('icon-cancel');
						$('.js-center').center();*/
					})
					.html('Acheter'))));
}

function chargement_ship(ListeVaisseau) {
	$.ajax({
		url: window.ress.loader + 'load-nom-vaisseaux.php',
		success: function(data) {
			var cols = $('<div>').attr('class', 'ui-grid-a ui-responsive mg-tb-25');
			var tabLetter = {
				"0":"a",
				"1":"b",
				"2":"c"
			};
			var numCol  = 0;
			for (var i = ListeVaisseau.length - 1; i >= 0; i--) {
				if(numCol > 1) numCol = 0;
				if (-1 == $.inArray(ListeVaisseau[i].nom, data)) {
					cols.append(sell_ship(ListeVaisseau[i], tabLetter[numCol]));
				} else {
					cols.append(selled_ship(ListeVaisseau[i], tabLetter[numCol]));
				}
				numCol++;
			};
			$('.main').append(cols);
			$('.achete').css('background-color', 'green');
		}
	})
}

function sell_ship(vaisseau, col) {
	var desc = vaisseau.desc;
	var type = 'Leger';
	if (vaisseau.type == 2) {
		type = 'Moyen';
	}
	return $('<div>')
		.attr('class', 'mg-tb-25 ui-block-' + col)
		.append(
			$('<div >')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2 class="title1" >')
					.attr('class', 'title1')
					.html(vaisseau.nom + ' - ' + type)),
				$('<div>')
				.attr('class', 'row')
				.append(
					$('<img>')
					.attr({
						src: window.ress.vaisseaux + vaisseau.image,
						alt: ''
					})),
				$('<div>')
				.attr('class', 'line3')
				.append(
					$('<p>')
					.html(desc.substring(0, 70))),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<div>')
					.attr('class', 'icon icon-pv'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.pv + ' PV'),
					$('<div>')
					.attr('class', 'icon icon-defense'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.defense + ' DEF'),
					$('<div>')
					.attr('class', 'icon icon-attaque'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.attaque + ' ATK')),
				$('<div>')
				.attr('class', 'line2')
				.append(
					$('<h2>')
					.attr('class', 'prix left')
					.html(vaisseau.prix + " $"),
					$('<a>')
					.attr({
						'href': '#Frame',
						'class': vaisseau.idspaceship + ' ui-btn'
					})
					.click(function() {
						// remplir la frame corectement
						$('#Frame .contents')
							.empty()
							.append(pop_in_ship(vaisseau));

					})
					.html('Acheter'))));
}

function selled_ship(vaisseau, col) {
	var desc = vaisseau.desc;
	var type = 'Leger';
	if (vaisseau.type == 2) {
		type = 'Moyen';
	}
	return $('<div>')
		.attr('class', 'mg-tb-25 ui-block-' + col)
		.append(
			$('<div >')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2 class="title1" >')
					.attr('class', 'title1')
					.html(vaisseau.nom + ' - ' + type)),
				$('<div>')
				.attr('class', 'row')
				.append(
					$('<img>')
					.attr({
						src: window.ress.vaisseaux + vaisseau.image,
						alt: ''
					})),
				$('<div>')
				.attr('class', 'line3')
				.append(
					$('<p>')
					.html(desc.substring(0, 70))),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<div>')
					.attr('class', 'icon icon-pv'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.pv + ' PV'),
					$('<div>')
					.attr('class', 'icon icon-defense'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.defense + ' DEF'),
					$('<div>')
					.attr('class', 'icon icon-attaque'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.attaque + ' ATK')),
				$('<div>')
				.attr('class', 'line2')
				.append(
					$('<h2>')
					.attr('class', 'prix left')
					.html(vaisseau.prix + " $"),
					$('<a>')
					.attr({
						'href': '#',
						'class': 'ui-btn achete'
					})
					.html('Acheté'))));
}