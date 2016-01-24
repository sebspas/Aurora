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
				profil = data;
				// Chargement du profil
				$('.main').append(
					$('<div>')
					.attr('class', 'mg-tb-25 ui-grid-solo ui-responsive')
					.append(
						infos(profil[0]),
						changement_avatar()
					)
				);
				
				classementJoueurs();
			}
		});
	} // OnReady()

function infos() {
		return $('<div>')
			.attr('class', 'ui-block-c')
			.append(
				$('<div>')
				.attr('class', 'ui-bar ui-bar-a')
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
			.attr('class', 'ui-block-c')
			.append(
				$('<div>')
				.attr('class', 'ui-bar ui-bar-a')
				.append(
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<h2>')
						.attr('class', 'title1 txt-center')
						.html("Changer votre avatar ici :")
					),
					$('<div>')
					.attr('class', 'line')
					.append(
						$('<form>')
						.attr({
							method: "GET",
							action: window.ress.traitement + 'changement_avatar.php',
							class : "form"
						})
						.append(
							$('<label>')
							.attr('for','avatar')
							.html('Url de votre image (jpeg, jpg, gif)'),
							$('<input>')
							.attr({
								type: 'text',
								name: 'image',
								id: 'avatar'
							}),
							$('<input>')
							.attr({
								class: 'ui-btn',
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
								success : OnSuccessChange
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
	var classement = 
		$('<div>')
			.attr('class', 'ui-grid-c ui-responsive')
			.append(
				$('<h2>')
				.attr('class', 'title1 txt-center')
				.html("Top 10 Players :")
			);

	$.ajax({
		url: window.ress.loader + 'load-classement.php',
		success: function(data) {
			var numCol  = 0;
			var tabLetter = {
				"0":"a",
				"1":"b",
				"2":"c"
			};
			for (var i = 0; i < data.length; i++) {
				if(numCol > 2) numCol = 0;
				classement.append(
					Joueur_classement(data[i],i, tabLetter[numCol]));
				numCol++;
			}

			$('.main').append(classement);
		}
	});
}

function Joueur_classement(joueur, i, col) {
	i = parseInt(i+1);
	return $('<div>')
			.attr('class', 'mg-tb-25 ui-block-b ' + col)
			.append(
				$('<div>')
				.attr('class', 'ui-bar ui-bar-a')
				.append(
					$('<a>')
					.attr({
						class: 'menu-avatar ',
						href: '#'
					})
					.append(
						$('<img>')
						.attr({
							class: 'img2',
							src: joueur.avatar,
							alt: 'avatar'
						})),
					$('<p>')
					.attr('class','title3 left')
					.html(i + ' - ' + joueur.pseudo + ' '),
					$('<p>')
					.attr('class','rigth')
					.html(' Points : ' + joueur.points)));
	}