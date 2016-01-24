$(document).ready(OnReady);
var energy = 0;

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
				$('.main').append(cortana_dialog('Bien vous progressez !'
					+ ' C\'est votre page d\'accueil vous pourrez partir'
					+ ' en mission d\'ici'));
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
	$('.main').append(cortana_dialog('Bienvenue sur Aurora !'
		+ ' Avant de pouvoir commencer l\'aventure merci de'
		+ ' choisir votre premier vaisseau :)'));
	for (var i = 0; i < listeVaisseau.length; i++) {
		$('.main').append(
			starter_Vaisseau(listeVaisseau[i]));
		$('.main').append(
			$('<div>')
			.attr('class', 'g1'));
	}
}

function starter_Vaisseau(vaisseau) {
	var ship = $('<div>')
		.attr('class', 'cols3')
		.append(
			$('<div >')
			.attr('class', 'frame0 t-black c-white')
			.append(
				$('<div >')
				.attr('class', 'frame-content')
				.append(
					$('<h2 c>')
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
							'class': 'btn2 blue3 right chooser',
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
									$('.main').append(cortana_dialog('Bien vous'
									+ ' progresser ! C\'est votre page '
									+ 'd\'accueil vous pourrez partir'
									+ ' en mission d\'ici'));
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
			.attr('class', 'cols5')
			.append(
				$('<div >')
				.attr('class', 'frame0 t-black c-white')
				.append(
					$('<div>')
					.attr('class', 'frame-content')
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
	var missions = $('<div>')
		.attr('class', 'of-y');

	var liste = $('<div>')
	.attr('class', 'frame0 t-black cols4')
	.append(
		$('<div>')
		.attr('class', 'frame-content')
		.append(
			$('<h2>')
				.attr('class', 'title1 c-white')
				.html("Liste des missions"),
				missions
		)
	);
	for (var i = 0; i < ListeMissions.length; i++) {
		missions.append(
			Mission(ListeMissions[i]));
	}
	$('.main').append(
		$('<div>').attr('class', 'g1'));
	$('.main').append(liste);
}

function Mission(mission) {
		var divMission =
			$('<div>')
			.attr('class', 'row')
			.append(
				$('<div>')
				.attr('class', 'icon3 left icon-rank' + mission.niveau),
				$('<h2>')
				.attr('class', 'title1 c-white')
				.html(mission.nom),
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
				$('<a>')
				.attr({
					'class': 'btn2 blue3 right js-to-mission',
					'href': '#'
				})
				.html('Lancer')
				.click(function() {
					if (window.missionLaunch) {
						return;
					} else {
						window.missionLaunch = true;
						// Gestion lancement mission
						$('.main').append(LancementMission(mission));
						$('.js-to-menu-box').removeClass('icon-menu');
						$('.js-to-menu-box').addClass('icon-cancel');
						$('.js-center').center();
					}
				}),
				$('<div>')
				.attr('class', 'line'),
				$('<hr>')
			);
		return divMission;
	}
	/*****************************************************
			Gestion du chargement du combat
	*****************************************************/
	// Variable pour préparer la phase de combat
var selected_mission;
var selected_ship;
selected_equipement1 = null;
selected_equipement2 = null;

function LancementMission(mission) {
	var bouton_lancement = $('<a>')
		.attr({
			'href': '#',
			'class': 'btn2 red3 right'
		})
		.html('Lancer')
		.click(function(event) {
			alert('Vous n\'avez pas assez d\'énergie :\'(');
		});
	$.ajax({
		url: window.ress.loader + 'load-home-energy.php',
		success: function(data) {
			energy = data;
			$('.js-energie').html(energy + ' %');
		}
	})
	if (energy - mission.energie >= 0) {
		bouton_lancement = $('<a>')
			.attr({
				'href': '#',
				'class': mission.idmission + ' btn2 blue3 right'
			})
			.html('Lancer')
			.click(function() {
				selected_mission = mission;
				// chargement selecteur vaisseau et equipement
				chargementSelecteurVaisseau();
			});
	}
	return $('<div>')
		.attr('class', 'fullframe')
		.append(
			$('<div>')
			.attr('class', 'frame1 white cols6 js-center')
			.append(
				$('<div>')
				.attr('class', 'frame-content js-frame-m of-yy')
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
						.html(mission.desc)),
					$('<div>')
					.attr('class', 'icon icon-energy'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(mission.energie + ' %'),
					$('<div>')
					.attr('class', 'icon icon-coin'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(mission.or),
					$('<div>')
					.attr('class', 'icon icon-xp'),
					$('<div>')
					.attr('class', 'icon-content2')
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
			.html('Sélectionnez votre vaisseau :'));
		$(this).append(
			$('<a>')
			.attr({
				'class': 'btn2 green3 left js-prev ',
				href: '#'
			})
			.html('Precedent')
			.click(function() {
				var prev = currentId - 1;
				if (prev < 0) {
					prev = listeShip.length - 1;
				}
				$('.contenu').fadeOut(500, function() {
					$(this).empty();
					$(this).append(vaisseau_mission(listeShip[prev]));
					$(this).fadeIn(500);
					currentId = prev;
				});
			}));
		$(this).append(
			$('<div>')
			.attr('class', 'contenu center cols8')
			.append(vaisseau_mission(listeShip[currentId])));
		$(this).append(
			$('<a>')
			.attr({
				'class': 'btn2 green3 right js-next',
				href: '#'
			})
			.html('Suivant')
			.click(function() {
				var next = currentId + 1;
				if (next == listeShip.length) {
					next = 0;
				}
				$('.contenu').fadeOut(500, function() {
					$(this).empty();
					$(this).append(vaisseau_mission(listeShip[next]));
					$(this).fadeIn(500);
					currentId = next;
				});
			}));
		$(this).append(
			$('<div>')
			.attr('class', 'line2')
			.append(
				$('<a>')
				.attr('class', 'btn2 green3 center')
				.html('Valider')
				.click(function() {
					selected_ship = listeShip[currentId];
					//chargement du choix de l'équipement du vaisseau
					chargementSelecteurEquipement();
				})));
		$(this).fadeIn(300);
	});
}

function vaisseau_mission(vaisseau) {
	var type = 'Leger';
	if (vaisseau.type == 2) {
		type = 'Moyen';
	}
	return $('<div>')
		.attr('class', 'frame0 t-black c-white')
		.append(
			$('<div >')
			.attr('class', 'frame-content')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2 class="title1" >')
					.attr('class', 'title1')
					.html(vaisseau.nom + ' - ' + type + 
						' - Niv ' + vaisseau.level)),
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
					.html(vaisseau.desc)),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<div>')
					.attr('class', 'icon icon-pv'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(vaisseau.pv + ' PV'),
					$('<div>')
					.attr('class', 'icon icon-defense'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(vaisseau.defense + ' DEF'),
					$('<div>')
					.attr('class', 'icon icon-attaque'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(vaisseau.attaque + ' ATK'),
					$('<div>')
					.attr('class', 'icon icon-xp'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(vaisseau.xp + '/' + vaisseau.nextlevel + ' Xp'))));
}

function chargementSelecteurEquipement() {
	//alert(selected_mission.nom + selected_ship.nom);
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
					.html('Slectionnez votre equipement :'));
				$(this).append(
					$('<div>')
					.attr('class', 'left cols5')
					.append(
						$('<h2>')
						.attr('class', 'title2')
						.html('Equipement disponible :'),
						$('<div>')
						.attr('class', 'contenu-left')));
				for (var i = listeEquipement.length - 1; i >= 0; i--) {
					$('.contenu-left').append(item(listeEquipement[i]));
				};
				$(this).append(
					$('<div>')
					.attr('class', 'right cols5')
					.append(
						$('<h2>')
						.attr('class', 'title2')
						.html('Equipement Selectionné (Max.2) : '),
						$('<div>')
						.attr('class', 'contenu-right')));
				$(this).append(
					$('<div>')
					.attr('class', 'line2')
					.append(
						$('<a>')
						.attr('class', 'btn2 blue3 right')
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
									$('.js-energie').html(data + ' %');
									// on affiche un écran de chargement
									$('html').append(
										$('<div>')
										.attr('class', 'loader')
										.append(
											$('<h2>')
											.attr('class', 'title1 js-center')
											.html('Chargement '
												+ 'du combat merci'
												+ ' de patienter...')));
									chargementCombat();
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
		.attr('class', 'frame0 t-black c-white cols4')
		.append(
			$('<div>')
			.attr('class', 'frame-content')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h4>')
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
					.html(item.spec + ' : +' + item.bonus))))
		.click(function(event) {
			if ($(this).parent().attr('class') == 'contenu-left') {
				if (selected_equipement1 != null 
					&& selected_equipement2 != null) {
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