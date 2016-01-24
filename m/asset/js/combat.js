// on crée une fonction renvoyant un nombre entre 1 et 3 correspondant 
// à l'action de l'adversaire
function randomize_action() {
	return Math.floor(Math.random() * (3 - 1 + 1) + 1);
}

// on crée la classe ennemi étant un vaisseau ayant en plus d'autres méthodes
var ennemi = function(ennemi) {
	this.vaisseau = ennemi;
};
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
			// si l'ennemie attaque normalement lui aussi
			if (ennemi_action == 1) {
				// on enleve les dégats de notre attaque au vaisseau ennemi
				$('.js-ennemi-progress')
				.val($('.js-ennemi-progress')
					.attr('value') - this.vaisseau.attaque);
				$('.js-ecran').prepend(
					$('<p>')
					.attr('class', 'c-blue2')
					.html('Le vaisseau ennemi à subit  ' 
						+ MyShip.vaisseau.attaque 
						+ ' points de dégats.'));
				// si on posséde pas de bouclier on subit les dégats 
				// sur notre barre de vie
				if ($('.js-MyShip-bouclier').attr('value') == 0) {
					$('.js-MyShip-progress').val(
						$('.js-MyShip-progress')
						.attr('value') - MyEnnemi.vaisseau.attaque);
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-red2')
						.html('Notre vaisseau à subit ' 
							+ MyEnnemi.vaisseau.attaque 
							+ ' points de dégats.'));
				}
				// sinon c'est le bouclier qui prend les dégats de l'attaque 
				else {
					$('.js-MyShip-bouclier').val(
						$('.js-MyShip-bouclier')
						.attr('value') - MyEnnemi.vaisseau.attaque);
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-green2')
						.html('Le bouclier à absorbé 100% des dégats soit' 
							+ (MyEnnemi.vaisseau.attaque) 
							+ ' dégats du à l\'attaque ennemie.'));
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
				$('.js-ecran').prepend(
					$('<p>')
					.attr('class', 'c-blue2')
					.html('Le vaisseau adversaire c\'est protéger il à subit ' 
						+ MyEnnemi.vaisseau.defense 
						+ '% de dégats en moins...'));
			}
			// si l'ennemi effectue son attaque spéciale on enleve 
			// nos dégat moins le double de ses dégats 
			else {
				// on enleve les dégats de notre attaque 
				// au vaisseau ennemi
				$('.js-ennemi-progress').val(
					$('.js-ennemi-progress')
					.attr('value') - this.vaisseau.attaque);
				$('.js-ecran').prepend(
					$('<p>')
					.attr('class', 'c-blue2')
					.html('Le vaisseau ennemi à subit  ' 
						+ MyShip.vaisseau.attaque 
						+ ' points de dégats.'));
				// si on posséde pas de bouclier on subit les dégats sur notre barre de vie
				if ($('.js-MyShip-bouclier').attr('value') == 0) {
					$('.js-MyShip-progress')
					.val(
						$('.js-MyShip-progress')
						.attr('value') - (MyEnnemi.vaisseau.attaque * 1.5));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-red2')
						.html('Notre vaisseau à subit ' 
							+ (MyEnnemi.vaisseau.attaque * 1.5) 
							+ ' points de dégats du à l\'attaque spéciale du vaisseau ennemi.'));
				}
				// sinon c'est le bouclier qui prend les dégats de l'attaque 
				else {
					$('.js-MyShip-bouclier')
					.val(
						$('.js-MyShip-bouclier')
						.attr('value') - (MyEnnemi.vaisseau.attaque * 1.5));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-green2')
						.html('Le bouclier à absorbé 100% des dégats soit' 
							+ (MyEnnemi.vaisseau.attaque * 1.5) 
							+ ' dégats du à l\'attaque spéciale ennemie.'));
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
					$('.js-MyShip-progress')
					.val(
						$('.js-MyShip-progress')
						.attr('value') - (MyEnnemi.vaisseau.attaque 
							- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-red2')
						.html('Notre vaisseau à subit seulement ' 
							+ (MyEnnemi.vaisseau.attaque 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' points de dégats, diminuer de ' 
							+ this.vaisseau.defense 
							+ '% grace à notre defense.'));
				}
				// sinon c'est le bouclier qui prend les dégats de l'attaque 
				else {
					$('.js-MyShip-bouclier')
					.val(
						$('.js-MyShip-bouclier')
						.attr('value') - (MyEnnemi.vaisseau.attaque 
							- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-green2')
						.html('Le bouclier à absorbé 100% des dégats soit' 
							+ (MyEnnemi.vaisseau.attaque 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' dégats du à l\'attaque ennemie grace à la defense.'));
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
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-red2')
						.html('Notre vaisseau à subit seulement ' 
							+ ((MyEnnemi.vaisseau.attaque * 1.5) 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' points de dégats due à l\'attaque spéciale du vaisseau ennemi, et grace à notre defense.'));
				}
				// sinon c'est le bouclier qui prend les dégats de l'attaque 
				else {
					$('.js-MyShip-bouclier')
					.val(
						$('.js-MyShip-bouclier')
						.attr('value') - ((MyEnnemi.vaisseau.attaque * 1.5) 
							- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-green2')
						.html('Le bouclier à absorbé 100% des dégats soit' 
							+ ((MyEnnemi.vaisseau.attaque * 1.5) 
								- ((MyEnnemi.vaisseau.attaque / 100) * this.vaisseau.defense)) 
							+ ' dégats du à l\'attaque spéciale ennemie et à notre défense.'));
				}
			}
			this.gestion_degats();
		} // def()
/***************************************************************************
Fonction gérant l'attaque spéciale de notre vaisseau fasse au vaisseau adverse 
***************************************************************************/
	this.atk_spe = function() {
			var ennemi_action = randomize_action();
			// si l'ennemie attaque normalement lui aussi
			if (this.nb_atk_spe == 0) {
				$('.js-ecran').prepend(
					$('<p>')
					.attr('class', 'c-red3')
					.html('Plus assez d\'énergie pour l\'attaque spéciale...Phase d\'attaque normal enclenché !'));
				this.atk();
			} else {
				--this.nb_atk_spe;
				if (ennemi_action == 1) {
					// on enleve les dégats de notre attaque au vaisseau ennemi
					$('.js-ennemi-progress').val($('.js-ennemi-progress').attr('value') - (this.vaisseau.attaque * 1.5));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-blue3')
						.html('Le vaisseau ennemi à subit  ' 
							+ (MyShip.vaisseau.attaque * 1.5) 
							+ ' points de dégats grace à notre attaque spéciale.'));
					// si on posséde pas de bouclier on subit les dégats sur notre barre de vie
					if ($('.js-MyShip-bouclier').attr('value') == 0) {
						$('.js-MyShip-progress')
						.val(
							$('.js-MyShip-progress')
							.attr('value') - MyEnnemi.vaisseau.attaque);
						$('.js-ecran').prepend(
							$('<p>')
							.attr('class', 'c-red2')
							.html('Notre vaisseau à subit ' 
								+ MyEnnemi.vaisseau.attaque 
								+ ' points de dégats.'));
					}
					// sinon c'est le bouclier qui prend les dégats de l'attaque 
					else {
						$('.js-MyShip-bouclier')
						.val(
							$('.js-MyShip-bouclier')
							.attr('value') - MyEnnemi.vaisseau.attaque);
						$('.js-ecran').prepend(
							$('<p>')
							.attr('class', 'c-green2')
							.html('Le bouclier à absorbé 100% des dégats soit' 
								+ (MyEnnemi.vaisseau.attaque) 
								+ ' dégats du à l\'attaque ennemie.'));
					}
				}
				// si l'ennemi se protége on enléve que les dégats 
				// divisé par la défense du vaisseau ennemi
				else if (ennemi_action == 2) {
					// on enleve les dégats de notre attaque au vaisseau ennemi - sa defense
					$('.js-ennemi-progress').val(
						$('.js-ennemi-progress')
						.attr('value') - ((this.vaisseau.attaque * 1.5) 
							- ((this.vaisseau.attaque / 100) * MyEnnemi.vaisseau.defense)));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-blue2')
						.html('Le vaisseau adversaire c\'est protéger il à subit ' 
							+ MyEnnemi.vaisseau.defense 
							+ '% de dégats en moins...'));
				}
				// si l'ennemi effectue son attaque spéciale on enleve 
				// nos dégat moins le double de ses dégats 
				else {
					// on enleve les dégats de notre attaque 
					// au vaisseau ennemi
					$('.js-ennemi-progress')
					.val(
						$('.js-ennemi-progress')
						.attr('value') - (this.vaisseau.attaque * 1.5));
					$('.js-ecran').prepend(
						$('<p>')
						.attr('class', 'c-blue2')
						.html('Le vaisseau ennemi à subit  ' 
							+ MyShip.vaisseau.attaque 
							+ ' points de dégats.'));
					// si on posséde pas de bouclier on 
					// subit les dégats sur notre barre de vie
					if ($('.js-MyShip-bouclier').attr('value') == 0) {
						$('.js-MyShip-progress')
						.val(
							$('.js-MyShip-progress')
							.attr('value') - (MyEnnemi.vaisseau.attaque * 1.5));
						$('.js-ecran').prepend(
							$('<p>')
							.attr('class', 'c-red2')
							.html('Notre vaisseau à subit ' 
								+ (MyEnnemi.vaisseau.attaque * 1.5) 
								+ ' points de dégats du à l\'attaque spéciale du vaisseau ennemi.'));
					}
					// sinon c'est le bouclier qui prend 
					// les dégats de l'attaque 
					else {
						$('.js-MyShip-bouclier')
						.val(
							$('.js-MyShip-bouclier')
							.attr('value') - (MyEnnemi.vaisseau.attaque * 1.5));
						$('.js-ecran').prepend(
							$('<p>')
							.attr('class', 'c-green2')
							.html('Le bouclier à absorbé 100% des dégats soit' 
								+ (MyEnnemi.vaisseau.attaque * 1.5) 
								+ ' dégats du à l\'attaque spéciale ennemie.'));
					}
				}
				this.gestion_degats();
			}
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
				$('.js-ecran').prepend(
					$('<p>')
					.attr('class', 'c-red2')
					.html('Les boulcier sont tombé.'));
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
	//$('#Frame .contents').empty();
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
	$('#Frame .contents')
	.empty()
	.append(
		$('<div>')
		.attr('class', 'ui-block ui-block-solo')
		.append(
			$('<div>')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<h2>')
				.attr('class', 'title1')
				.html(MyEnnemi.vaisseau.nom),

				$('<span>')
				.attr('class', 'title1 c-white js-ennemi-pv')
				.html('PV: ' + MyEnnemi.vaisseau.pv + ' '),

				$('<progress>')
				.attr({
					value: MyEnnemi.vaisseau.pv,
					max: MyEnnemi.vaisseau.pv,
					class: 'life-progress js-ennemi-progress'
				}),

				$('<img>')
				.attr({
					src: window.ress.ennemies + MyEnnemi.vaisseau.image,
					alt: 'ship',
					class: 'ui-block-c'
				})
			)
		)
	);

	// coté gentil (droite)
	$('#Frame .contents').append(
		$('<div>')
		.attr('class', 'ui-block ui-block-solo')
		.append(

			$('<div>')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<h2>')
				.attr('class', 'title1')
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
				})
			)
		)
	);
	// barre de menu combat
	$('#Frame .contents').append(
		$('<div>')
		.attr({
			class: 'ui-block ui-block-solo'
		})
		.append(
			$('<div>')
			.attr('class', 'ui-bar ui-bar-a')
			.append(
				$('<a>')
				.attr('class', ' ui-btn')
				.html('Attaquer')
				.click(function() {
					MyShip.atk();
				}),
				$('<div>')
				.attr('class', 'line'),
				$('<a>')
				.attr('class', ' ui-btn js-def')
				.html('Defendre')
				.click(function() {
					MyShip.def();
				}),
				$('<div>')
				.attr('class', 'line'),
				$('<a>')
				.attr('class', ' ui-btn js-atkspe')
				.html('Attaque Spéciale')
				.click(function() {
					MyShip.atk_spe();
				}))));

	// Ecran de controle
	$('#Frame .contents').append(
		$('<div>')
		.attr({
			class: 'ui-block ui-block-solo'
		})
		.append(
			$('<div>')
			.attr('class', 'ui-bar- ui-bar-b')
			.append(
				$('<h2>')
				.attr('class', 'title1 c-white')
				.html('Ecran de controle :'),
				$('<div>')
				.attr('class', 'c-white js-ecran'))));

	// // disparition de l'écran de chargement
	$('.loader').fadeOut(500);
	// test sur les valeurs
	console.log(MyShip.vaisseau.attaque);
	console.log(MyShip.bouclier);
	console.log(MyEnnemi.vaisseau.nom);
}

function chargementItemBonus(item) {
	if (item != null) {
		if (item.spec == 'Bouclier') {
			MyShip.bouclier = parseInt(item.bonus);
		} else {
			MyShip.vaisseau.attaque = 
			parseInt(selected_ship.attaque) + parseInt(item.bonus);
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
			$('#Frame').append(pop_in_Victoire(selected_mission, data));
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
			'class': ' ui-btn ui-btn-inline right'
		})
		.html('Accepter')
		.click(function() {
			$.mobile.changePage('#panel-fixed-page1');
			$('.main').fadeOut(400, function() {
				$(this).empty();
				chargementHomepage();
			});

			$('.main').fadeIn(400);
	});

	if (levelUp == "true") {
		bouton_Suivant = $('<a>')
			.attr({
				'href': '#',
				'class': ' ui-btn ui-btn-inline right'
			})
			.html('Accepter')
			.click(function() {
				// on fait apparaitre une popup de level up du vaisseau
				$('#Frame .contents').append(pop_in_levelUp(selected_ship));
			});
	}


	return $('#Frame .contents').empty()
	.append(
		$('<div>')
		.attr({
			'class': 'ui-block ui-block-solo'
		}).append(
			$('<div>')
			.attr({
				'class': "ui-bar ui-bar-a"
			}).append(
				$('<h2>')
				.attr('class', 'title1')
				.html("Victoire !"),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<p>')
					.html("Vous avez remporté les "
						+ "récompenses suivantes :")
				),
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
				.attr('class', 'line')
				.append(bouton_Suivant)
			)

		)
		
	);


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
			$('.contents').append(pop_in_Defaite(selected_mission, data));
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
			'class': ' ui-btn ui-btn-inline'
		})
		.html('Accepter')
		.click(function() {

			$.mobile.changePage('#panel-fixed-page1');
			$('.main').fadeOut(400, function() {
				$(this).empty();
				chargementHomepage();
			});

			$('.main').fadeIn(400);

		});

	if (levelUp == "true") {
		bouton_Suivant = $('<a>')
			.attr({
				'href': '#',
				'class': ' ui-btn ui-btn-inline'
			})
			.html('Accepter')
			.click(function() {
				// on fait apparaitre une popup de level up du vaisseau
				$('#Frame .contents').append(pop_in_levelUp(selected_ship));
			});
	}


	return $('#Frame .contents').empty()
	.append(
		$('<div>')
		.attr({
			'class': 'ui-block ui-block-solo'
		}).append(
			$('<div>')
			.attr({
				'class': "ui-bar ui-bar-a"
			}).append(
				$('<h2>')
				.attr('class', 'title1')
				.html("Défaite ..."),
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<p>')
					.html("Vous avez remporté les "
						+ "récompenses suivantes :")
				),
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
				.attr('class', 'line')
				.append(bouton_Suivant)
			)

		)
		
	);


}

function pop_in_levelUp(vaisseau) {
	var level = (parseInt(vaisseau.level) + 1);
	return $('<div>')
		.attr('class', 'ui-grid ui-grid-solo')
		.append(
			$('<div>')
			.attr('class', 'ui-block ui-block-a')
			.append(
				$('<div >')
				.attr('class', 'ui-bar ui-bar-a')
				.append(
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h2>')
						.attr('class', 'title1')
						.html('Votre vaisseau à gagné un Niveau !')),
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
					.attr('class', 'line')
					.append(
						$('<p>')
						.html('Ses caractéristiques ont augmenté :')),
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
							'class': ' ui-btn ui-btn-inline'
						})
						.html('Suivant')
						.click(function() {

						$.mobile.changePage('#panel-fixed-page1');
						$('.main').fadeOut(500, function() {
							$(this).empty();
							chargementHomepage();
							$('.main').fadeIn(500);
						});

	})))));
}