
var subject;
var limit = '&limit=10';
var apiKey = '&api_key=dc6zaTOxFJmzC';
var queryUrl;
var respCol;
var i;
var j;
var hasRating;
var animalButtons;
var state;
var newBtn;
var searchVal;

var animals = [
	'Puppies',
	'Kittens',
	'Piglets',
	'Foals',
	'Calfs',
	'Fawns',
	'Ducklings',
	'Chicks',
	'Lamb',
	'Tadpoles'
], j;

function displayButtons() {
	for(j = 0; j < animals.length; j++) {
		animalButtons = $('<button class="btn btn-default btn-gif" data-subject="' + animals[j] + '"><span>' + animals[j] + '</span></button>');
		$('.row-btn').append(animalButtons);
	}
}

function ajaxQuery() {
	$('.row-gif').empty();
	if($('#search').val() == 'Search') {
		subject = $(this).attr('data-subject');
	} 
	else {
		subject = $('#search').val();
	}
	queryUrl = ('https://api.giphy.com/v1/gifs/search?q=' + subject + limit + apiKey);

	$.ajax({
		url: queryUrl, 
		method: 'GET'})

	.done(function(response) {

		for(i = 0; i < response.data.length; i++) {


			respCol = $('<div class="col-md-4"><img class="img-responsive gif-thumb" alt="" src="' + 
				response.data[i].images.fixed_height_still.url 
				+ '" data-state="still" data-animate="' + 
				response.data[i].images.fixed_height.url 
				+ '" data-still="' + 
				response.data[i].images.fixed_height_still.url 
				+ '" /></div>');

			$('.gif-thumb').on('load');
			hasRating = response.data[i].rating.toUpperCase();
			if(response.data[i].rating === '') {
				respCol.prepend('<br><p>Rating: NR</p>');
			} else {
				respCol.prepend('<br><p>Rating: ' + hasRating + '</p>');
			}
			$('.row-gif').append(respCol);
    	} 

			$('.gif-thumb').on('click', onGifClick);

	}); // closing done function

} // closing ajax

function newButton(event) {
	searchVal = $('#search').val().trim();

	$('#search').blur();

		newBtn = $('<button class="btn btn-default btn-gif" data-subject="' + searchVal + '"><span>' + searchVal + '</span></button>');
		$('.row-btn').append(newBtn);
		ajaxQuery();
	$('#search').val('Search');

	searchFocus();
	$('.btn-gif').click(ajaxQuery);

} // close newButton

function searchFocus(){
	$('#search').focus(function() {
		if((($('#search').attr('value')) || ($('#search').val()))  == 'Search') {
			$('#search').attr('value', '');
			$('#search').val('');
		}
	});
	$('#search').blur(function() {
		if((($('#search').attr('value')) || ($('#search').val()))  == '') {
			$('#search').attr('value', 'Search');
			$('#search').val('Search');
		}
	});
} //close search focus


function onGifClick(event) {
	state = $(event.target).attr('data-state'); 
	if (state == 'still'){
        $(event.target).attr('src', $(event.target).data('animate'));
        $(event.target).attr('data-state', 'animate');
    } else {
        $(event.target).attr('src', $(event.target).data('still'));
        $(event.target).attr('data-state', 'still');
    } // close if-else
} // close onGifClick


$(document).ready(function() {
	searchFocus();
	displayButtons();
	$('.btn-search').click(newButton);
	$('.btn-gif').click(ajaxQuery);
	// enter button
	$(document).keypress(function(e) {
		if(e.which === 13) {
			newButton();
		}
	});


}); // end document ready
