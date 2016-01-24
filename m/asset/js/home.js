$(document).ready(OnReady);
var energy = 0;
var page = "home";

function OnReady() {
	if (page == "home") {
		ChargementHomePage();
	}
}

function ChargementHomePage() {
	$.ajax({
		url: window.ress.loader + 'load-home-energy.php',
		success: function(data) {
			energy = data;
			$('.js-energie').html(energy + ' %');
		}
	})
	$.ajax({
		url: window.ress.loader + 'load-market-money.php',
		success: function(data) {
			var money = data;
			$('.js-money').html(money + ' $');
		}
	})
	$.ajax({
		url: window.ress.traitement + 'check-fisrt.php',
		success: function(data) {
			if (data == 0) {
				// chargement de la page de selection du vaisseau :)
				chargementSelecteur();
			} else {
				// chargement de la page home habituel
				$('.main').append(cortana_dialog('Bien vous progressez ! C\'est votre page d\'accueil vous pourrez partir en mission d\'ici'));
				chargementHomepage();
			}
		}
	});
}

function chargementSelecteur() {
	// chargement du selecteur du premier vaisseau
	$.ajax({
		url: window.ress.loader + 'load-starter.php',
		success: function(data) {
			home_starter(data);
		}
	});
}

function home_starter(listeVaisseau) {
	$('.main').append(cortana_dialog('Bienvenue sur Aurora ! Avant de pouvoir commencer l\'aventure merci de choisir votre premier vaisseau :)'));
	for (var i = 0; i < listeVaisseau.length; i++) {
		$('.main').append(
			starter_Vaisseau(listeVaisseau[i])
		);
	}
}

function starter_Vaisseau(vaisseau) {
	var ship = $('<div>')
		.attr('class', 'mg-tb-25 ui-block-solo')
		.append(
			$('<div>')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2>')
					.attr('class', 'title1')
					.html(vaisseau.nom),
					$('<img>')
					.attr({
						src: window.ress.vaisseaux + vaisseau.image,
						alt: ''
					}),
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
					.html(vaisseau.attaque + ' ATK'),
					$('<div>')
					.attr('class', 'line0')
					.append(
						$('<a>')
						.attr({
							'href': '#',
							'class': 'ui-btn chooser',
							'id': vaisseau.idspaceship
						})
						.html('Choisir'))
					.click(function() {
						var idSpaceShip = vaisseau.idspaceship;
						$.ajax({
							type: 'GET',
							url: window.ress.traitement + 'addShip.php',
							data: {
								idship: idSpaceShip
							},
							success: function(data) {
								// On vide la div principale :)
								$('.main').fadeOut(500, function() {
									$(this).empty();
									//on ajoute la boite de dialog cortana
									$('.main').append(cortana_dialog('Bien vous progressez ! C\'est votre page d\'accueil vous pourrez partir en mission d\'ici'));
									// on recupere la page home par défaut
									chargementHomepage();
									$('.main').fadeIn(500);
								});
							}
						});
					})
				)));

	return ship;
}

function chargementHomepage() {
	// Chargement du vaisseau Courant
	$.ajax({
		url: window.ress.loader + 'load-current-ship.php',
		success: function(data) {
			home_ship(data);
			// Chargement des missions :)
			$.ajax({
				url: window.ress.loader + 'load-listmissions.php',
				success: function(data) {
					ListeMissions(data);
				}
			});
		}
	});
}

function home_ship(vaisseau) {
		$('.main').append(
			$('<div>')
			.attr('class', 'ui-grid-solo mg-tb-25')
			.append(
				$('<div >')
				.attr('class', 'ui-block-a')
				.append(
					$('<div>')
					.attr('class', 'ui-bar ui-bar-a')
					.append(
						$('<h2 >')
						.attr('class', 'title1')
						.html(vaisseau.nom + ' - Niv' + vaisseau.level),
						$('<img>')
						.attr({
							src: window.ress.vaisseaux + vaisseau.image,
							alt: ''
						}),
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
						.html(vaisseau.attaque + ' ATK'),
						$('<div>')
						.attr('class', 'icon icon-xp'),
						$('<div>')
						.attr('class', 'icon-content')
						.html(vaisseau.xp + '/' + vaisseau.nextlevel + ' Xp')
					))));

	} // home_ship()

function ListeMissions(ListeMissions) {
	var tabLetter = {
		"0":"a",
		"1":"b",
		"2":"c"
	};
	var liste = $('<li>').attr({
		'class': 'ui-grid-b ui-responsive ui-listview'
	});
	var numCol = 0;
	for (var i = 0; i < ListeMissions.length; i++) {
		if(numCol > 2) numCol = 0;
		liste.append(
			Mission(ListeMissions[i], tabLetter[numCol]));
		numCol++;
	}

	$('.main').append(liste);
}

function Mission(mission, col) {
		var divMission =
			$('<div>')
			.attr('class', 'mg-tb-25 ui-block-'+ col)
			.append(
				$('<div>')
				.attr('class', 'ui-bar ui-bar-a')
				.append(
					$('<div>')
					.attr('class', 'icon3 left icon-rank' + mission.niveau),
					$('<h2>')
					.attr('class', 'title1')
					.html(mission.nom),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<p>')
						.html('')),
					$('<div>')
					.attr('class', 'icon icon-energy'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(mission.energie + ' %'),
					$('<div>')
					.attr('class', 'icon icon-coin'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(mission.or + ' $'),
					$('<div>')
					.attr('class', 'icon icon-xp'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(mission.xp + ' XP'),
					$('<div>')
					.attr('class', 'line0')
					.append(
						$('<a>')
						.attr({
							'class': 'ui-btn js-to-mission',
							'href': '#Frame'
						})
						.html('Lancer')
						.click(function() {
							// Gestion lancement mission
							$('#Frame .contents')
								.empty()
								.append(LancementMission(mission));
						}))));
		return divMission;


	}
	/*****************************************************
			Gestion du chargement du combat
	*****************************************************/
// Variable pour préparer la phase de combat
var selected_mission;
var selected_ship;
var selected_equipement1 = null;
var selected_equipement2 = null;

function LancementMission(mission) {
	var bouton_lancement = $('<a>')
		.attr({
			'class': 'ui-btn',
			'href': '#'
		})
		.html('Lancer')
		.click(function(event) {
			alert('Vous n\'avez pas assez d\'énergie :\'(');
		});
	if (energy - mission.energie >= 0) {
		bouton_lancement = $('<a>')
			.attr({
				'href': '#',
				'class': mission.idmission + ' ui-btn'
			})
			.html('Lancer')
			.click(function() {
				selected_mission = mission;
				// chargement selecteur vaisseau et equipement
				chargementSelecteurVaisseau();
			});
	}

	return $('<div>')
		.attr('class', 'ui-grid-solo ui-responsive')
		.append(
			$('<div>')
			.attr('class', 'ui-block-a')
			.append(
				$('<div>')
				.attr('class', 'ui-bar ui-bar-a js-frame-m')
				.append(
					$('<div>')
					.attr('class', 'icon icon-rank' + mission.niveau),
					$('<h2>')
					.attr('class', 'title1')
					.html(mission.nom),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<p>')
						.html(mission.desc)),
					$('<div>')
					.attr('class', 'icon icon-energy'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(mission.energie + ' %'),
					$('<div>')
					.attr('class', 'icon icon-coin'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(mission.or),
					$('<div>')
					.attr('class', 'icon icon-xp'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(mission.xp + ' XP'),
					$('<div>')
					.attr('class', 'line0')
					.append(bouton_lancement))));
}
var listeShip;
var currentId = 0;

function chargementSelecteurVaisseau() {
	$.ajax({
		url: window.ress.loader + 'load-hangar-ship.php',
		success: function(data) {
			listeShip = data;
			// Chargement du hangar
		}
	});
	$('.js-frame-m').fadeOut(400, function() {
		$(this).empty();
		$(this).append(
			$('<h2>')
			.attr('class', 'title1')
			.html('Selectionnez votre vaisseau :'));
		$(this).append(
			$('<div>')
			.attr({
				'id': 'MyShip',
				'class': 'line'
			})
			.append(vaisseau(listeShip[currentId])));
		$(this).append(
			$('<a>')
			.attr({
				'class': 'ui-btn ui-btn-inline js-prev',
				href: '#'
			})
			.html('Precedent')
			.click(function() {
				var prev = currentId - 1;
				if (prev < 0) {
					prev = listeShip.length - 1;
				}
				$('#MyShip').fadeOut(500, function() {
					$(this).empty();
					$(this).append(vaisseau(listeShip[prev]));
					$(this).fadeIn(500);
					currentId = prev;
				});
			}));
		$(this).append(
			$('<a>')
			.attr({
				'class': 'ui-btn ui-btn-inline js-next',
				href: '#'
			})
			.html('Suivant')
			.click(function() {
				var next = currentId + 1;
				if (next == listeShip.length) {
					next = 0;
				}
				$('#MyShip').fadeOut(500, function() {
					$(this).empty();
					$(this).append(vaisseau(listeShip[next]));
					$(this).fadeIn(500);
					currentId = next;
				});
			}));
		$(this).append(
			$('<div>')
			.attr('class', 'line')
			.append(
				$('<a>')
				.attr('class', 'ui-btn')
				.html('Valider')
				.click(function() {
					selected_ship = listeShip[currentId];
					//chargement du choix de l'équipement du vaisseau
					chargementSelecteurEquipement();
				})));
		$(this).fadeIn(300);
	});
}

function vaisseau(vaisseau) {
	var type = 'Leger';
	if (vaisseau.type == 2) {
		type = 'Moyen';
	}
	return $('<div>')
		.attr('class', 'frame1 t-black c-white')
		.append(
			$('<div >')
			.attr('class', 'frame-content')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2 class="title1" >')
					.attr('class', 'title1')
					.html(vaisseau.nom + ' - ' + type + ' - Niv ' + vaisseau.level)),
				$('<div>')
				.attr('class', 'row')
				.append(
					$('<img>')
					.attr({
						src: window.ress.vaisseaux + vaisseau.image,
						alt: ''
					})),
				$('<div>')
				.attr('class', 'line')
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
					.html(vaisseau.attaque + ' ATK'),
					$('<div>')
					.attr('class', 'icon icon-xp'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.xp + '/' + vaisseau.nextlevel + ' Xp'))));
}


function chargementSelecteurEquipement() {

	$.ajax({
		url: window.ress.loader + 'load-equipement.php',
		success: function(data) {
			listeEquipement = data;
			// Chargement du hangar
			$('.js-frame-m').fadeOut(400, function() {
				$(this).empty();
				$(this).append(
					$('<h2>')
					.attr('class', 'title1')
					.html('Selectionnez votre equipement :'));
				$(this).append(
					$('<div>')
					.attr('class', 'mg-tb-25 ui-grid-solo ui-responsive')
					.append(
						$('<h2>')
						.attr('class', 'title2')
						.html('Equipement disponible :'),
						$('<div>')
						.attr('class', 'contenu-left')));
				for (var i = listeEquipement.length - 1; i >= 0; i--) {
					$('.contenu-left').append(
						item(listeEquipement[i])
					);
				};
				$(this).append(
					$('<div>')
					.attr('class', 'mg-tb-25 ui-grid-solo ui-responsive')
					.append(
						$('<h2>')
						.attr('class', 'title2')
						.html('Equipement Selectionné (Max.2) : '),
						$('<div>')
						.attr('class', 'contenu-right')));

				$(this).append(
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<a>')
						.attr({
							'href': '#Frame',
							'class': 'ui-btn'
						})
						.html('Lancer la mission !')
						.click(function() {
							//Lancement de la mission...
							// retrait des points d'energies
							$.ajax({
								url: window.ress.traitement + 'lancement-mission.php',
								data: {
									energie: selected_mission.energie,
									idmission: selected_mission.idmission
								},
								success: function(data) {
									// on cahnge la valeur de l'energie actuel
									$('.js-energie').html(data);

									//on affiche un écran de chargement
									$('html').append(
										$('<div>')
										.attr('class', ' loader ui-loader ui-corner-all ui-body-a ui-loader-default')
										.append(
											$('<span>')
											.attr('class', 'ui-icon-loading')
										)
									);

									$('#Frame .contents')
										.empty()
										.append(chargementCombat());
								}
							});
						})));
				$(this).fadeIn(300);
			});
		}
	});

}
var lastAdd = 0;

function item(item) {
	return $('<div>')
		.attr('class', 'ui-block-b')
		.append(
			$('<div>')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h4>')
					.attr('class', 'title1 txt-center')
					.html(item.nom)),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<img>')
					.attr({
						class: 'img2',
						src: window.ress.items + item.image,
						alt: item.nom
					})),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<p>')
					.html(item.spec + ' : +' + item.bonus))))
		.click(function(event) {
			if ($(this).parent().attr('class') == 'contenu-left') {
				if (selected_equipement1 != null && selected_equipement2 != null) {
					alert('Maximum deux équipements !');
				} else {
					if (selected_equipement1) {
						selected_equipement2 = item;
						lastAdd = 2;
					} else {
						selected_equipement1 = item;
						lastAdd = 1;
					}
					$(this).fadeOut(500, function() {
						$('.contenu-right').append(this);
						$(this).fadeIn(500);
					});
				}
			} else {
				if (selected_equipement1.nom == item.nom) {
					selected_equipement1 = null;
				} else {
					selected_equipement2 = null;
				}
				$(this).fadeOut(500, function() {
					$('.contenu-left').append(this);
					$(this).fadeIn(500);
				});
			}
		});;
}