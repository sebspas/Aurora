$(document).ready(OnReady);
var profil;

function OnReady() {
	if (page == "profil") {
		ChargementProfilPage();
	}
}

var left_block;

function ChargementProfilPage() {
		$.ajax({
			url: window.ress.loader + 'load-profil.php',
			success: function(data) {
				left_block = $('<div>')
					.attr('class', 'cols8');
				profil = data;
				// Chargement du profil
				$('.main').append(infos(profil[0]));
				$('.main').append(
					$('<div>')
					.attr('class', 'g1'));

				left_block.append(changement_avatar());
				classementJoueurs();
			}
		});
	} // OnReady()

function infos() {
		return $('<div>')
			.attr('class', 'frame0 cols2 t-black c-white')
			.append(
				$('<div>')
				.attr('class', 'frame-content')
				.append(
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h2>')
						.attr('class', 'title1 txt-center')
						.html(profil.pseudo)
					),
					$('<div>')
					.attr('class', 'row')
					.append(
						$('<img>')
						.attr({
							src: profil.avatar,
							alt: "image profil",
							class: 'js-avatar'
						})
					),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<p>')
						.html("Email : " + profil.email)
					),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<p>')
						.html("Rang : " + profil.rang)
					),
					$('<div>')
					.attr('class', 'line')
					.append(
						// a venir si le temps le permet (modification de profil)
					)
				));
	} // infos()

function changement_avatar() {
		return $('<div>')
			.attr('class', 'frame0 cols4 t-black c-white')
			.append(
				$('<div>')
				.attr('class', 'frame-content')
				.append(
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h2>')
						.attr('class', 'title1 txt-center')
						.html("Changer votre avatar ici :")
					),
					$('<div>')
					.attr('class', 'row')
					.append(
						$('<form>')
						.attr({
							method: "GET",
							action: window.ress.traitement + 'changement_avatar.php',
							class: "form"
						})
						.append(
							$('<label>')
							.attr('for', 'avatar')
							.html('Url de votre image (jpeg, jpg, gif)'),
							$('<input>')
							.attr({
								type: 'text',
								name: 'image',
								id: 'avatar'
							}),
							$('<input>')
							.attr({
								class: 'btn blue3 center',
								type: 'submit',
								value: 'Changer',
								name: 'Changer'
							}))
						.submit(function(event) {
							event.preventDefault();
							$.ajax({
								type: $(this).attr("method"),
								url: $(this).attr("action"),
								data: $(this).serialize(),
								success: OnSuccessChange
							});
							return true;
						}))));
	} // infos()

function OnSuccessChange(data) {
	if (data.error) {
		alert(data.error);
	} else {
		$('.js-avatar').attr('src', data.url);
	}
}

function classementJoueurs() {

	var players = $('<div>')
				.attr('id', 'players');

	var classement =
		$('<div>')
		.attr('class', 'frame0 cols4 t-black c-white')
		.append(
			$('<div>')
			.attr('class', 'frame-content')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<h2>')
					.attr('class', 'title1 txt-center')
					.html("Top 10 Players :")
				),
				players
			)
		);
	$.ajax({
		url: window.ress.loader + 'load-classement.php',
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				players.append(
					Joueur_classement(data[i], i)
				);
			}
			left_block.append(
				$('<div>').attr('class', 'g2')
			);
			left_block.append(classement);
			$('.main').append(left_block);
		}
	});
}

function Joueur_classement(joueur, i) {
	i = parseInt(i + 1);
	return $('<div>')
		.attr('class', 'row')
		.append(
			$('<a>')
			.attr({
				class: 'menu-avatar ',
				href: '#'
			})
			.append(
				$('<img>')
				.attr({
					src: joueur.avatar,
					alt: 'avatar'
				})),
			$('<p>')
			.attr('class', 'title3 left')
			.html(i + ' - ' + joueur.pseudo + ' '),
			$('<p>')
			.attr('class', 'rigth')
			.html(' Points : ' + joueur.points));
}