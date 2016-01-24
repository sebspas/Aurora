$(document).ready(OnReady);
var listeShip;

var currentId = 0;

function OnReady() {
	if (page == "hangar") {
		ChargementHangarPage();
	}
}

function ChargementHangarPage() {
		$.ajax({
			url: window.ress.loader + 'load-hangar-ship.php',
			success: function(data) {
				listeShip = data;
				// Chargement du hangar
				$('.main').append(frame_hangar());
				$('.main').append(
					$('<div>')
					.attr('class', 'contenu'));
				$('.frame-content').prepend(vaisseau_hangar(listeShip[0]));
				$('.contenu').append(vaisseau(listeShip[0]));
			}
		})
	} // OnReady()

function frame_hangar() {
	return $('<div>')
		.attr('class', 'frame1 t-black c-white cols3')
		.append(
			$('<div>')
			.attr('class', 'frame-content')
			.append(
				$('<div>')
				.attr('class', 'line')
				.append(
					$('<a>')
					.attr({
						class: 'btn2 blue3 left js-prev',
						href: '#'
					})
					.html('Precedent')
					.click(function() {
						var prev = currentId - 1;
						if (prev < 0) {
							prev = listeShip.length - 1;
						}

						$('.frame-content .row').fadeOut(500, function() {
							$(this).empty();
							$(this).append(
								vaisseau_hangar(listeShip[prev]));
							$(this).fadeIn(500);
							currentId = prev;
						});

						$('.contenu').fadeOut(500, function() {
							$(this).empty();
							$(this).append(vaisseau(listeShip[prev]));
							$(this).fadeIn(500);
							currentId = prev;
						});
					}),
					$('<a>')
					.attr({
						class: 'btn2 blue3 right js-next',
						href: '#'
					})
					.html('Suivant')
					.click(function() {
						var next = currentId + 1;
						if (next == listeShip.length) {
							next = 0;
						}

						$('.frame-content .row').fadeOut(500, function() {
							$(this).empty();
							$(this).append(
								vaisseau_hangar(listeShip[next]));
							$(this).fadeIn(500);
							currentId = next;
						});

						$('.contenu').fadeOut(500, function() {
							$(this).empty();
							$(this).append(vaisseau(
								listeShip[next]));
							$(this).fadeIn(500);
							currentId = next;
						});

					}))));
}

function vaisseau_hangar(vaisseau) {
		var type = 'Leger';
		if (vaisseau.type == 2) {
			type = 'Moyen';
		}
		return $('<div>')
			.attr('class', 'row')
			.append($('<div>')
				.attr('class', 'line')
				.append(
					$('<h2>')
					.attr('class', 'title1 txt-center')
					.html(vaisseau.nom)),
				$('<div>')
				.attr('class', 'line')
				.html(type + ' - Niv ' + vaisseau.level),

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
					.html(vaisseau.attaque + ' ATK'),
					$('<div>')
					.attr('class', 'icon icon-xp'),
					$('<div>')
					.attr('class', 'icon-content')
					.html(vaisseau.xp + '/' + vaisseau.nextlevel + ' Xp'))

			);
	} // infos()


function vaisseau(vaisseau) {

		return $('<div>')
			.attr('class', 'cols6')
			.append(
				$('<img>')
				.attr({
					src: window.ress.vaisseaux + vaisseau.image,
					alt: ''
				})
			);
	} // vaisseau()