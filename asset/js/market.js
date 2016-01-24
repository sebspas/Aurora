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
	$('#main').append(menuMarket());
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
			$('.main').append(cortana_dialog('Ici c\'est le marché vous pouvez ' 
				+ 'y acheter des vaisseaux, cliquez sur le menu items pour' 
				+ ' choisir des équipements.'));
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
			'class': 'layout-left t-black',
			'id': 'm-market'
		})
		.append(
			$('<div>')
			.attr('class', 'menu-market')
			.append(
				$('<a>')
				.attr({
					class: 'btn4 center blue3 js-ship',
					href: '#'
				})
				.html('Vaisseau')
				.click(function(event) {
					market_swap_content("js-ship");
				}),
				$('<div>')
				.attr({
					'class': 'line00',
					id: 'ship-option'
				})
				.append(
					$('<p>')
					.attr('class', 'c-white')
					.html('Mes options pour le choix des vaisseaux ici')),
				$('<a>')
				.attr({
					class: 'btn4 center blue3 js-items',
					href: '#'
				})
				.click(function(event) {
					market_swap_content("js-items");
				})
				.html('Equipement'),
				$('<div>')
				.attr({
					'class': 'line00',
					id: 'item-option'
				})
				.append(
					$('<p>')
					.attr('class', 'c-white')
					.html('Mes options pour le choix des items ici'))));
}

function market_swap_content(button) {
	if (button === "js-ship" && currentPage != "Ship") {
		currentPage = "Ship";

		$('.main').fadeOut(500, function() {
			$(this).empty();
			$('.main').append(cortana_dialog('Ici c\'est le marché vous pouvez' 
				+ 'y acheter des vaisseaux, cliquez sur le menu items pour' 
				+ 'choisir des équipements.'));
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
			$('.main').append(cortana_dialog('Ici c\'est le marché vous' 
				+ ' pouvez y acheter des équipements, cliquez sur' 
				+ 'le menu vaisseau pour choisir des vaisseaux.'));
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
			'class': 'btn2 red3 right'
		})
		.html('Acheter')
		.click(function(event) {
			alert('Vous n\'avez pas assez d\'argent :\'(');
		});
	if (money - vaisseau.prix >= 0) {
		bouton_achat = $('<a>')
			.attr({
				'href': '#',
				'class': vaisseau.idspaceship + ' btn2 blue3 right'
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
						$('.js-to-menu-box').removeClass('icon-cancel');
						$('.js-to-menu-box').addClass('icon-menu');
						$('.fullframe').fadeOut(500, function() {
							$(this).empty();
						});
						$('.main').fadeOut(500, function() {
							$(this).empty();
							$('.main').append(cortana_dialog('Ici c\'est le' 
								+ ' marché vous pouvez y acheter des vaisseaux,' 
								+ ' cliquez sur le menu items pour choisir' + 'des équipements.'));
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
		.attr('class', 'fullframe')
		.append(
			$('<div>')
			.attr('class', 'frame1 white cols6 js-center')
			.append(
				$('<div >')
				.attr('class', 'frame-content')
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
			'class': 'btn2 red3 right'
		})
		.html('Acheter')
		.click(function(event) {
			alert('Vous n\'avez pas assez d\'argent :\'(');
		});
	if (money - item.prix >= 0) {
		bouton_achat = $('<a>')
			.attr({
				'href': '#',
				'class': item.idiitem + ' btn2 blue3 right'
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
						$('.js-to-menu-box').removeClass('icon-cancel');
						$('.js-to-menu-box').addClass('icon-menu');
						$('.fullframe').fadeOut(500, function() {
							$(this).empty();
						});
						$('.main').fadeOut(500, function() {
							$(this).empty();
							$('.main').append(cortana_dialog('Ici c\'est le' 
								+ ' marché vous pouvez y acheter des équipements,' 
								+ ' cliquez sur le menu vaisseau pour' 
								+ ' choisir des vaisseaux.'));
							chargement_item(listeItems);
							$('.main').fadeIn(500);
						});
					}
				})
			});
	}


	return $('<div>')
		.attr('class', 'fullframe')
		.append(
			$('<div>')
			.attr('class', 'frame1 white cols6 js-center')
			.append(
				$('<div >')
				.attr('class', 'frame-content')
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
							'class': 'cols7'
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
						.html(item.prix),
						bouton_achat))));
}

function chargement_item(ListeItems) {
	$.ajax({
		url: window.ress.loader + 'load-nom-items.php',
		success: function(data) {
			var cols = $('<div>').attr('class', 'row');
			for (var i = ListeItems.length - 1; i >= 0; i--) {
				if (-1 == $.inArray(ListeItems[i].nom, data)) {
					cols.append(sell_item(ListeItems[i]));
				} else {
					cols.append(selled_item(ListeItems[i]));
				}
			};
			$('.main').append(cols);
		}
	})
}

function selled_item(item) {
	return $('<div>')
		.attr('class', 'frame01 t-black c-white')
		.append(
			$('<div>')
			.attr('class', 'frame-content')
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
						'class': 'btn2 green1 right'
					})
					.html('Acheté'))));
}

function sell_item(item) {
	return $('<div>')
		.attr('class', 'frame01 t-black c-white')
		.append(
			$('<div>')
			.attr('class', 'frame-content')
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
						'class': item.idiitem + ' btn2 blue3 right js-buy-item'
					})
					.click(function() {
						// remplir la frame corectement 
						$('.main').append(pop_in_item(item));
						$('.js-to-menu-box').removeClass('icon-menu');
						$('.js-to-menu-box').addClass('icon-cancel');
						$('.js-center').center();
					})
					.html('Acheter'))));
}

function chargement_ship(ListeVaisseau) {
	$.ajax({
		url: window.ress.loader + 'load-nom-vaisseaux.php',
		success: function(data) {
			var cols = $('<div>').attr('class', 'row');
			for (var i = ListeVaisseau.length - 1; i >= 0; i--) {
				if (-1 == $.inArray(ListeVaisseau[i].nom, data)) {
					cols.append(sell_ship(ListeVaisseau[i]));
				} else {
					cols.append(selled_ship(ListeVaisseau[i]));
				}
			};
			$('.main').append(cols);
		}
	})
}

function sell_ship(vaisseau) {
	var desc = vaisseau.desc;
	var type = 'Leger';
	if (vaisseau.type == 2) {
		type = 'Moyen';
	}
	return $('<div>')
		.attr('class', 'frame01 t-black c-white')
		.append(
			$('<div >')
			.attr('class', 'frame-content')
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
						'class': vaisseau.idspaceship + ' btn2 blue3 right'
					})
					.click(function() {
						// remplir la frame corectement 
						$('.main').append(pop_in_ship(vaisseau));
						$('.js-to-menu-box').removeClass('icon-menu');
						$('.js-to-menu-box').addClass('icon-cancel');
						$('.js-center').center();
					})
					.html('Acheter'))));
}

function selled_ship(vaisseau) {
	var desc = vaisseau.desc;
	var type = 'Leger';
	if (vaisseau.type == 2) {
		type = 'Moyen';
	}
	return $('<div>')
		.attr('class', 'frame01 t-black c-white')
		.append(
			$('<div >')
			.attr('class', 'frame-content')
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
						'class': 'btn2 green1 right'
					})
					.html('Acheté'))));
}