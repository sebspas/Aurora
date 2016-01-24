// on crée une fonction renvoyant un nombre entre 1 et 3 correspondant 
// à l'action de l'adversaire
function randomize_action() {
	return Math.floor(Math.random() * (3 - 1 + 1) + 1);
}
// 1 chance sur 4 d'esquiver
function randomize_esquive(type) {
	if (type == 1) {
		return Math.floor(Math.random() * (4 - 1 + 1) + 1);
	} else {
		return Math.floor(Math.random() * (5 - 1 + 1) + 1);
	}
}

// 1 /3 de reussir l'attaque spéciale
function randomize_attaquespe() {
	return Math.floor(Math.random() * (2 - 1 + 1) + 1);
}

// on crée la classe ennemi étant un vaisseau ayant en plus d'autres méthodes
var ennemi = function(ennemi) {
	this.vaisseau = ennemi;
};

function afficherEcran(type, msg) {
	switch(type) {
		case 'ennemie-d':
			type = 'c-green2';
			break;
		case 'ennemie-ds':
			type = 'c-purple1';
			break;
		case 'vaisseau-d':
			type = 'c-red2';
			break;
		case 'vaisseau-de':
			type = 'c-white';
			break;
		case 'bouclier-d':
			type = 'c-blue3';
			break;
		case 'ennemie-p':
			type = 'c-orange1';
			break;
		case 'alert':
			type = 'c-red3';
			break;
		case 'esquive':
			type = 'c-white';
			break;
	}
	$('.js-ecran').prepend(
		$('<p>')
		.attr('class', type)
		.html(msg));
} // afficherEcran

// on crée le vaisseau de combat étant un vaisseau ayant en plus 
// un bouclier et d'autres méthodes
var vaisseau_combat = function(ship, bouclier) {
	this.vaisseau = ship;
	this.bouclier = bouclier;
	this.nb_atk_spe = 2;
	/**************************************************************************
	Fonction gérant l'attaque normal de notre vaisseau sur le vaisseau adverse
	**************************************************************************/
	this.atk = function() {
			var ennemi_action = randomize_action();
			var esquive = randomize_esquive(vaisseau.type);
			// si l'ennemie attaque normalement lui aussi
			if (ennemi_action == 1) {
				// on enleve les dégats de notre attaque au vaisseau ennemi
				$('.js-ennemi-progress')
				.val($('.js-ennemi-progress')
					.attr('value') - this.vaisseau.attaque);

				afficherEcran('ennemi-d', 'Le vaisseau ennemi à subit  ' 
						+ MyShip.vaisseau.attaque 
						+ ' points de dégats.');

				if (esquive == 1) {
					afficherEcran('esquive', 'Vous avez reussi à esquiver le tir du vaisseau adverse !');
				} else {
					// si on posséde pas de bouclier on subit les dégats 
					// sur notre barre de vie
					if ($('.js-MyShip-bouclier').attr('value') == 0) {
						$('.js-MyShip-progress').val(
							$('.js-MyShip-progress')
							.attr('value') - MyEnnemi.vaisseau.attaque);

						afficherEcran('vaisseau-d','Notre vaisseau à subit ' 
								+ MyEnnemi.vaisseau.attaque 
								+ ' points de dégats.');
					}
					// sinon c'est le bouclier qui prend les dégats de l'attaque 
					else {
						$('.js-MyShip-bouclier').val(
							$('.js-MyShip-bouclier')
							.attr('value') - MyEnnemi.vaisseau.attaque);

						afficherEcran('bouclier-d', 'Le bouclier à absorbé 100% des dégats soit' 
								+ (MyEnnemi.vaisseau.attaque) 
								+ ' dégats du à l\'attaque ennemie.' );
					}
				}
			}
			// si l'ennemi se protége on enléve que les dégats 
			// divisé par la défense du vaisseau ennemi
			else if (ennemi_action == 2) {
				// on enleve les dégats de notre attaque 
				// au vaisseau ennemi - sa defense
				$('.js-ennemi-progress').val(
					$('.js-ennemi-progress')
					.attr('value') - (this.vaisseau.attaque 
						- ((this.vaisseau.attaque / 100) * MyEnnemi.vaisseau.defense)));

				afficherEcran('ennemi-p','Le vaisseau adversaire c\'est protéger il à subit ' 
						+ MyEnnemi.vaisseau.defense 
						+ '% de dégats en moins...');
			}
			// si l'ennemi effectue son attaque spéciale on enleve 
			// nos dégats moins le double de ses dégats 
			else {
				// on enleve les dégats de notre attaque 
				// au vaisseau ennemi
				$('.js-ennemi-progress').val(
					$('.js-ennemi-progress')
					.attr('value') - this.vaisseau.attaque);

				afficherEcran('ennemi-d','Le vaisseau ennemi à subit  ' 
						+ MyShip.vaisseau.attaque 
						+ ' points de dégats.');

				if (esquive == 1) {
					afficherEcran('esquive', 'Vous avez reussi à esquiver le tir du vaisseau adverse !');
				} else {
					// si on posséde pas de bouclier on subit les dégats sur notre barre de vie
					if ($('.js-MyShip-bouclier').attr('value') == 0) {
						$('.js-MyShip-progress')
						.val(
							$('.js-MyShip-progress')
							.attr('value') - (MyEnnemi.vaisseau.attaque * 1.5));

						afficherEcran('vaisseau-d', 'Notre vaisseau à subit ' 
								+ (MyEnnemi.vaisseau.attaque * 1.5) 
								+ ' points de dégats du à l\'attaque spéciale du vaisseau ennemi.');
					}
					// sinon c'est le bouclier qui prend les dégats de l'attaque 
					else {
						$('.js-MyShip-bouclier')
						.val(
							$('.js-MyShip-bouclier')
							.attr('value') - (MyEnnemi.vaisseau.attaque * 1.5));

						afficherEcran('bouclier-d', 'Le bouclier à absorbé 100% des dégats soit ' 
								+ (MyEnnemi.vaisseau.attaque * 1.5) 
								+ ' dégats du à l\'attaque spéciale ennemie.');
					}
				}
			}
			this.gestion_degats();
		} // atk()
		/***************************************************************************
		Fonction gérant la défense de notre vaisseau fasse à son attaque 
		***************************************************************************/
	this.def = function() {
			var ennemi_action = randomize_action();
			// si l'ennemie attaque normalement lui aussi, ou 
			// qu'il se protege on le fait attaquer normalement
			if (ennemi_action == 1 || ennemi_action == 2) {
				// si on posséde pas de bouclier on subit les dégats 
				// sur notre barre de vie
				if ($('.js-MyShip-bouclier').attr('value') == 0) {

					$('.js-MyShip-progress').val(
						$('.js-MyShip-progress')
						.attr('value') - (MyEnnemi.vaisseau.attaque 
							- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)));

					afficherEcran('vaisseau-de', 'Notre vaisseau à subit seulement ' 
							+ (MyEnnemi.vaisseau.attaque 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' points de dégats, diminuer de ' 
							+ this.vaisseau.defense 
							+ '% grace à notre defense.');
				}
				// sinon c'est le bouclier qui prend les dégats de l'attaque 
				else {
					$('.js-MyShip-bouclier').val(
						$('.js-MyShip-bouclier')
						.attr('value') - (MyEnnemi.vaisseau.attaque 
							- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)));

					afficherEcran('bouclier-d', 'Le bouclier à absorbé 100% des dégats soit ' 
							+ (MyEnnemi.vaisseau.attaque 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' dégats du à l\'attaque ennemie grace à la defense.');
				}
			}
			// si l'ennemi effectue son attaque spéciale on enleve nos dégat moins le double de ses dégats 
			else {
				// si on posséde pas de bouclier on subit les dégats sur notre barre de vie
				if ($('.js-MyShip-bouclier').attr('value') == 0) {
					$('.js-MyShip-progress')
					.val(
						$('.js-MyShip-progress')
						.attr('value') - ((MyEnnemi.vaisseau.attaque * 1.5) 
							- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)));

					afficherEcran('vaisseau-de', 'Notre vaisseau à subit seulement ' 
							+ ((MyEnnemi.vaisseau.attaque * 1.5) 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' points de dégats due à l\'attaque spéciale du vaisseau ennemi, et grace à notre defense.');

				}
				// sinon c'est le bouclier qui prend les dégats de l'attaque 
				else {
					$('.js-MyShip-bouclier')
					.val(
						$('.js-MyShip-bouclier')
						.attr('value') - ((MyEnnemi.vaisseau.attaque * 1.5) 
							- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)));

					afficherEcran('bouclier-d', 'Le bouclier à absorbé 100% des dégats soit ' 
							+ ((MyEnnemi.vaisseau.attaque * 1.5) 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' dégats du à l\'attaque spéciale ennemie et à notre défense.' )
				}
			}
			this.gestion_degats();
		} // def()
/***************************************************************************
Fonction gérant l'attaque spéciale de notre vaisseau fasse au vaisseau adverse 
***************************************************************************/
	this.atk_spe = function() {
			var ennemi_action = randomize_action();
			var atk_spe = randomize_attaquespe();
			var esquive = randomize_esquive(vaisseau.type);
			// si l'ennemie attaque normalement lui aussi
			if (atk_spe > 1) {
				afficherEcran('vaisseau-d', 'Echec de l\'attaque spéciale...');
			} 
			if (ennemi_action == 1) {
				if (atk_spe == 1) {
					// on enleve les dégats de notre attaque au vaisseau ennemi
					$('.js-ennemi-progress').val($('.js-ennemi-progress').attr('value') - (this.vaisseau.attaque * 1.90));

					afficherEcran('ennemie-ds', 'Le vaisseau ennemi à subit  ' 
							+ (MyShip.vaisseau.attaque * 1.90) 
							+ ' points de dégats grace à notre attaque spéciale.');
				}

				if (esquive == 1) {
					afficherEcran('esquive', 'Vous avez reussi à esquiver le tir du vaisseau adverse !');
				} else {
					// si on posséde pas de bouclier on subit les dégats sur notre barre de vie
					if ($('.js-MyShip-bouclier').attr('value') == 0) {
						$('.js-MyShip-progress')
						.val(
							$('.js-MyShip-progress')
							.attr('value') - MyEnnemi.vaisseau.attaque);

						afficherEcran('vaisseau-d', 'Notre vaisseau à subit ' 
								+ MyEnnemi.vaisseau.attaque 
								+ ' points de dégats.' );
					}
					// sinon c'est le bouclier qui prend les dégats de l'attaque 
					else {
						$('.js-MyShip-bouclier')
						.val(
							$('.js-MyShip-bouclier')
							.attr('value') - MyEnnemi.vaisseau.attaque);

						afficherEcran('bouclier-d', 'Le bouclier à absorbé 100% des dégats soit' 
								+ (MyEnnemi.vaisseau.attaque) 
								+ ' dégats du à l\'attaque ennemie.');
					}
				}
			}
			else if (ennemi_action == 2) {
				// si l'ennemi se protége on enléve que les dégats 
				// divisé par la défense du vaisseau ennemi
				if (atk_spe == 1) {
					// on enleve les dégats de notre attaque au vaisseau ennemi - sa defense
					$('.js-ennemi-progress').val(
						$('.js-ennemi-progress')
						.attr('value') - ((this.vaisseau.attaque * 1.90) 
							- ((this.vaisseau.attaque / 100) * MyEnnemi.vaisseau.defense)));
				}

				afficherEcran('ennemie-p', 'Le vaisseau adversaire c\'est protéger il à subit ' 
							+ MyEnnemi.vaisseau.defense 
							+ '% de dégats en moins...');
			}
			else {
				// si l'ennemi effectue son attaque spéciale on enleve 
				// nos dégat moins le double de ses dégats 
				if (atk_spe == 1) {
					// on enleve les dégats de notre attaque 
					// au vaisseau ennemi
					$('.js-ennemi-progress')
					.val(
						$('.js-ennemi-progress')
						.attr('value') - (this.vaisseau.attaque * 1.90));

					afficherEcran('ennemie-ds', 'Le vaisseau ennemi à subit  ' 
							+ MyShip.vaisseau.attaque 
							+ ' points de dégats due à notre attaque spéciale.');
				}
				
				if (esquive == 1) {
					afficherEcran('esquive', 'Vous avez reussi à esquiver le tir du vaisseau adverse !');
				} else {
					// si on posséde pas de bouclier on 
					// subit les dégats sur notre barre de vie
					if ($('.js-MyShip-bouclier').attr('value') == 0) {
						$('.js-MyShip-progress')
						.val(
							$('.js-MyShip-progress')
							.attr('value') - (MyEnnemi.vaisseau.attaque * 1.90));

						afficherEcran('vaisseau-d', 'Notre vaisseau à subit ' 
								+ (MyEnnemi.vaisseau.attaque * 1.90) 
								+ ' points de dégats du à l\'attaque spéciale du vaisseau ennemi.');
					}
					// sinon c'est le bouclier qui prend 
					// les dégats de l'attaque 
					else {
						$('.js-MyShip-bouclier')
						.val(
							$('.js-MyShip-bouclier')
							.attr('value') - (MyEnnemi.vaisseau.attaque * 1.90));

						afficherEcran('bouclier-d', 'Le bouclier à absorbé 100% des dégats soit' 
								+ (MyEnnemi.vaisseau.attaque * 1.90) 
								+ ' dégats du à l\'attaque spéciale ennemie.');
					}
				}
				
			}
			this.gestion_degats();
		} // atk_spe()
	this.gestion_degats = function() {
			/****************************************************************************
									Gestion dégats sur l'ennemi
			****************************************************************************/
			// 2 - Gestion de la barre de vie ennemi
			if ($('.js-ennemi-progress').attr('value') <= 0) {
				$('.js-ennemi-progress').val(0);
				// il faudrait faire un message styler 
				// du style Vous avez détruit ce vaisseau, avec pop-in de victoire
				gestionVictoire();
			}
			// on met a jour la valeur dans le vaisseau et sur l'interface
			MyEnnemi.vaisseau.pv = $('.js-ennemi-progress').attr('value');
			$('.js-ennemi-pv').html('PV: ' + MyEnnemi.vaisseau.pv + ' ');
			/****************************************************************************/
			/****************************************************************************
									Gestion dégats sur notre vaisseau
			****************************************************************************/
			// 1 - Gestion de notre Bouclier
			if ($('.js-MyShip-bouclier').attr('value') <= 0 && this.bouclier != 0) {
				$('.js-MyShip-bouclier').val(0);
				// il faudrait faire un message styler 
				// du style "Warning : Les bouclier sont tomber !!!"
				afficherEcran('alert', 'Les boulcier sont tombé.');
			}
			// on met a jour la valeur dans le 
			// vaisseau et sur l'interface
			this.bouclier = $('.js-MyShip-bouclier').attr('value');
			$('.js-MyShip-shield').html('Shield: ' + this.bouclier + ' ');
			/****************************************************************************/
			// 2 - Gestion de notre barre de vie et donc de la defaite eventuelle
			if ($('.js-MyShip-progress').attr('value') <= 0) {
				$('.js-MyShip-progress').val(0);
				gestionDefaite();
			}
			// on met a jour la valeur dans le vaisseau et sur l'interface
			this.vaisseau.pv = $('.js-MyShip-progress').attr('value');
			$('.js-MyShip-pv').html('PV: ' + this.vaisseau.pv + ' ');
			/****************************************************************************/
		} // gestion_degats()
}; // vaisseau_combat() class
// on crée les objets vaisseau et ennemie
var MyShip;
var MyEnnemi;

function chargementCombat() {
	MyShip = new vaisseau_combat(null, 0);
	MyEnnemi = new ennemi(0);
	$('#main').empty();
	$('#main').append(
		$('<div>')
		.attr({
			'class': 'bg',
			id: 'bg-combat'
		}));
	$('#main').append(
		$('<div>')
		.attr('class', 'main'));
	// on charge le vaisseau
	MyShip.vaisseau = selected_ship;
	// chargement des bonus des items
	chargementItemBonus(selected_equipement1);
	chargementItemBonus(selected_equipement2);
	// chargement de l'adversaire
	chargementEnnemi();
}

function chargementCombatUI() {
	// chargement de l'interface graphique de combat...
	// coté méchant (gauche)
	$('.main').append(
		$('<div>')
		.attr('class', 'cols4')
		.append(
			$('<h2>')
			.attr('class', 'title2 left')
			.html(MyEnnemi.vaisseau.nom),
			$('<span>')
			.attr('class', 'title1 c-white js-ennemi-pv')
			.html('PV: ' + MyEnnemi.vaisseau.pv + ' '),
			$('<progress>')
			.attr({
				value: MyEnnemi.vaisseau.pv,
				max: MyEnnemi.vaisseau.pv,
				class: 'life-progress cols8 js-ennemi-progress'
			}),
			$('<img>')
			.attr({
				src: window.ress.ennemies + MyEnnemi.vaisseau.image,
				alt: 'ship',
				class: 'cols9'
			})));
	// séparateur
	$('.main').append(
		$('<div>')
		.attr('class', 'g1'));
	// coté gentil (droite)
	$('.main').append(
		$('<div>')
		.attr('class', 'cols5')
		.append(
			$('<h2>')
			.attr('class', 'title2 right')
			.html(MyShip.vaisseau.nom + '- lvl' + MyShip.vaisseau.level),

			$('<progress>')
			.attr({
				value: MyShip.bouclier,
				max: MyShip.bouclier,
				class: 'shield-progress js-MyShip-bouclier'
			}),
			$('<span>')
			.attr('class', 'title1 c-white js-MyShip-shield')
			.html('Shield: ' + MyShip.bouclier + ' '),
			$('<progress>')
			.attr({
				value: MyShip.vaisseau.pv,
				max: MyShip.vaisseau.pv,
				class: 'life-progress cols8 js-MyShip-progress'
			}),
			$('<span>')
			.attr('class', 'title1 c-white js-MyShip-pv')
			.html('PV: ' + MyShip.vaisseau.pv + ' '),
			$('<img>')
			.attr({
				src: window.ress.vaisseaux + MyShip.vaisseau.image,
				alt: 'ship'
			})));
	// barre de menu combat
	$('.main').append(
		$('<div>')
		.attr({
			class: 'frame0 t-black cols4'
		})
		.append(
			$('<div>')
			.attr('class', 'frame-content')
			.append(
				$('<a>')
				.attr('class', 'btn2 red3')
				.html('Attaquer')
				.click(function() {
					MyShip.atk();
				}),
				$('<div>')
				.attr('class', 'g1'),
				$('<a>')
				.attr('class', 'btn2 blue3 js-def')
				.html('Defendre')
				.click(function() {
					MyShip.def();
				}),
				$('<div>')
				.attr('class', 'g1'),
				$('<a>')
				.attr('class', 'btn2 cyan3 js-atkspe')
				.html('Attaque Spécial')
				.click(function() {
					MyShip.atk_spe();
				}))));
	// séparateur
	$('.main').append(
		$('<div>')
		.attr('class', 'g1'));
	// Ecran de controle
	$('.main').append(
		$('<div>')
		.attr({
			class: 'frame0 t-black cols6'
		})
		.append(
			$('<div>')
			.attr('class', 'frame-content')
			.append(
				$('<h2>')
				.attr('class', 'title1 c-white')
				.html('Ecran de controle :'),
				$('<div>')
				.attr('class', 'c-white js-ecran'))));
	// disparition de l'écran de chargement
	$('.loader').fadeOut(500);
	// test sur les valeurs
	console.log(MyShip.vaisseau.attaque);
	console.log(MyShip.bouclier);
	console.log(MyEnnemi.vaisseau.nom);
}

function chargementItemBonus(item) {
	if (item != null) {
		if (item.spec == 'Bouclier') {
			MyShip.bouclier += parseInt(item.bonus);
		} else {
			MyShip.vaisseau.attaque = parseInt(selected_ship.attaque) + parseInt(item.bonus);
		}
	}
}

function chargementEnnemi() {
	$.ajax({
		url: window.ress.loader + 'load-combat-ennemi.php',
		data: {
			idmission: selected_mission.idmission
		},
		success: function(data) {
			MyEnnemi.vaisseau = data[0];
			chargementCombatUI();
		}
	});

}

function gestionVictoire() {
	window.missionLaunch = false;
	selected_equipement1 = null;
	selected_equipement2 = null;
	// mise à jour de l'argent et de l'xp dans la base 
	// et dans le js et php
	$.ajax({
		url: window.ress.traitement + 'recompense_mission.php',
		data: {
			money: selected_mission.or,
			idmission: selected_mission.idmission,
			idvaisseau: selected_ship.idvaisseau,
			xp: selected_mission.xp,
			points: (selected_mission.niveau * 10)
		},
		success: function(data) {
			// apparition de la pop_in
			$('.main').append(pop_in_Victoire(selected_mission, data));
			$('.js-center').center();
			// on met à jour l'argent dans l'affichage de la page et le js
			$.ajax({
				url: window.ress.loader + 'load-market-money.php',
				success: function(data) {
					$('.js-money').html(data + ' $');
				}
			})
		}
	});

}

function pop_in_Victoire(mission, levelUp) {
	var bouton_Suivant = $('<a>')
		.attr({
			'href': '#',
			'class': ' btn2 blue3 right'
		})
		.html('Accepter')
		.click(function() {
			$('.main').fadeOut(400, function() {
				$('.js-to-menu-box').removeClass('icon-cancel');
				$('.js-to-menu-box').addClass('icon-menu');
				$(this).empty();
				$('#bg-combat').attr('id', 'bg-home');
				chargementHomepage();
			});
			$('.main').fadeIn(400);
		});

	if (levelUp == "true") {
		bouton_Suivant = $('<a>')
			.attr({
				'href': '#',
				'class': ' btn2 blue3 right'
			})
			.html('Accepter')
			.click(function() {
				// on fait apparaitre une popup de level up du vaisseau
				$('.main').append(pop_in_levelUp(selected_ship));
				$('.js-center').center();
			});
	}
	return $('<div>')
		.attr('class', 'fullframe')
		.append(
			$('<div>')
			.attr('class', 'frame1 white cols6 js-center')
			.append(
				$('<div>')
				.attr('class', 'frame-content js-frame-m')
				.append(
					$('<h2>')
					.attr('class', 'title1')
					.html("Victoire !"),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<p>')
						.html("Vous avez remportez les "
							+ "récompenses suivantes :")),
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
					.append(bouton_Suivant))));
}

function gestionDefaite() {
	window.missionLaunch = false;
	selected_equipement1 = null;
	selected_equipement2 = null;
	// mise à jour de l'argent et de l'xp dans 
	// la base et dans le js et php
	$.ajax({
		url: window.ress.traitement + 'recompense_mission.php',
		data: {
			money: (selected_mission.or / 2),
			idmission: selected_mission.idmission,
			idvaisseau: selected_ship.idvaisseau,
			xp: (selected_mission.xp / 2),
			points: (selected_mission.niveau)
		},
		success: function(data) {
			// apparition de la pop_in
			$('.main').append(pop_in_Defaite(selected_mission, data));
			$('.js-center').center();
			// on met à jour l'argent dans l'affichage 
			// de la page et le js
			$.ajax({
				url: window.ress.loader + 'load-market-money.php',
				success: function(data) {
					$('.js-money').html(data + ' $');
				}
			})
		}
	});

}

function pop_in_Defaite(mission, levelUp) {
	var bouton_Suivant = $('<a>')
		.attr({
			'href': '#',
			'class': ' btn2 blue3 right'
		})
		.html('Accepter')
		.click(function() {
			$('.main').fadeOut(400, function() {
				$('.js-to-menu-box').removeClass('icon-cancel');
				$('.js-to-menu-box').addClass('icon-menu');
				$(this).empty();
				chargementHomepage();
				$('#bg-combat').attr('id', 'bg-home');
			});
			$('.main').fadeIn(400);
		});

	if (levelUp == "true") {
		bouton_Suivant = $('<a>')
			.attr({
				'href': '#',
				'class': ' btn2 blue3 right'
			})
			.html('Accepter')
			.click(function() {
				// on fait apparaitre une popup de level up du vaisseau
				$('.main').append(pop_in_levelUp(selected_ship));
				$('.js-center').center();
			});
	}
	return $('<div>')
		.attr('class', 'fullframe')
		.append(
			$('<div>')
			.attr('class', 'frame1 white cols6 js-center')
			.append(
				$('<div>')
				.attr('class', 'frame-content js-frame-m')
				.append(
					$('<h2>')
					.attr('class', 'title1')
					.html("Defaite ..."),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<p>')
						.html("Vous avez remportez les"
						+" récompenses suivantes :")),
					$('<div>')
					.attr('class', 'icon icon-coin'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(mission.or / 4),
					$('<div>')
					.attr('class', 'icon icon-xp'),
					$('<div>')
					.attr('class', 'icon-content2')
					.html(mission.xp / 4 + ' XP'),
					$('<div>')
					.attr('class', 'line0')
					.append(bouton_Suivant))));
}

function pop_in_levelUp(vaisseau) {
	var level = (parseInt(vaisseau.level) + 1);
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
						$('<h2>')
						.attr('class', 'title1')
						.html('Votre vaisseau à gagner un Niveau !')),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h4>')
						.attr('class', 'title1')
						.html(vaisseau.nom + ' - ' + level)),
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
						.html('Ces statistiques on augmentées :')),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<div>')
						.attr('class', 'icon icon-pv'),
						$('<div>')
						.attr('class', 'icon-content2')
						.html(vaisseau.pv + '+ 20 PV'),
						$('<div>')
						.attr('class', 'icon icon-defense'),
						$('<div>')
						.attr('class', 'icon-content2')
						.html(vaisseau.defense + '+ 2 DEF'),
						$('<div>')
						.attr('class', 'icon icon-attaque'),
						$('<div>')
						.attr('class', 'icon-content2')
						.html(vaisseau.attaque + '+ 5 ATK')),
					$('<div>')
					.attr('class', 'line2')
					.append(
						$('<a>')
						.attr({
							'href': '#',
							'class': ' btn2 blue3 right'
						})
						.html('Suivant')
						.click(function() {
							$('.fullframe').fadeOut(400);
							$('.main').fadeOut(400, function() {
								$('.js-to-menu-box')
								.removeClass('icon-cancel');
								$('.js-to-menu-box')
								.addClass('icon-menu');
								$(this).empty();
								$('#bg-combat').attr('id', 'bg-home');
								chargementHomepage();
							});
							$('.main').fadeIn(400);
						})))));
}