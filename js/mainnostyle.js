/*FIRST NAME FOCUS*/
//When Page Loads, focus on the "Name" field

$('#name').focus();

var customJob = document.createElement('input');
customJob.setAttribute('type', 'text');
customJob.setAttribute('id', 'custom_job');
customJob.setAttribute('name', 'custom_job');
customJob.setAttribute('placeholder', 'Your job role');


/*JOB ROLE SELECTION*/
//Make the "Your job role" text field appear when users select Other from the Job Role menu

$('fieldset').eq(0).append(customJob);
$(customJob).hide();

$(document).ready(function(){
	$('#title-area').on('click','li', function(){
		console.log("CLICK");
		if($(this).children().text() === "Other"){
			$(customJob).show('fast');

		} else {
			$(customJob).hide('fast');

		}
	});
});


/*T- SHIRT SECTION*/
//Hide the T-Shirt color options until a user chooses a T-Shirt




var $colorArea = $('#colors-js-puns');

//Make the color menu read "Please select a t-shirt theme" until one is selected
//Implement different color options based on the theme selected

var $jsPuns = $('*[data-shirt-type="js-puns"]');
var $iLovePuns = $('*[data-shirt-type="i-love-js"]');
var $initialShirt = $('*[data-shirt-type="initial-selection"]'); 

$jsPuns.hide();
$iLovePuns.hide();

$('#design').change(function(){
	
	if($(this).prop('selectedIndex') === 1){
		$initialShirt.hide();
		$iLovePuns.hide();
		$jsPuns.show();
		$colorArea.find('option').eq(1).prop('selected',true);

	} else if($(this).prop('selectedIndex') === 2) {
		$initialShirt.hide();
		$iLovePuns.show();
		$jsPuns.hide();
		$colorArea.find('option').eq(4).prop('selected',true);
	
	} else if($(this).prop('selectedIndex') === 0){
		$jsPuns.hide();
		$iLovePuns.hide();
		$initialShirt.show();
		$colorArea.find('option').eq(0).prop('selected',true);
	}
})



/*ACTIVITY REGISTRATION*/
//Ensure that a user cannot select two activities that are at the same time

var cost = 0;

$('.activities input').change(function(){
	var timeType = $(this).attr('data-time-type');
	var labelText = $(this).parents('label').text();
	var start = labelText.indexOf('$') + 1;
	var end = labelText.length;
	var number = labelText.slice(start, end)

	if($(this).prop('checked')){
		cost += parseInt(number);
		$(this).parents().siblings().children('*[data-time-type='+timeType+']').prop('disabled', true);
		$(this).parents().siblings().children('*[data-time-type='+timeType+']').parent().addClass('disabled');

	} else {
		cost -= parseInt(number);
		$(this).parents().siblings().children('*[data-time-type='+timeType+']').prop('disabled', false);
		$(this).parents().siblings().children('*[data-time-type='+timeType+']').parent().removeClass('disabled');
	}

//Display the total cost of activities below the list of activities

	if(cost > 0){
		$('.payment-total').text('$'+cost);
	} else {
		$('.payment-total').text("");
	}

});


/*DISPLAYING PAYMENT SECTION*/
var $paypal = $('.paypal');
var $bitcoin = $('.bitcoin');
var $creditCard = $('#credit-card');

$paypal.hide();
$bitcoin.hide();

$('#payment option').eq(1).prop('selected', true);

//Make Credit Card visible by default but make other payment divs visible if selected

//If a user chooses either PayPal or Bitcoin, then simply hide the "Credit Card" section and reveal the chosen section
$('#payment').change(function(){
	if($(this).prop('selectedIndex') === 1){
		$creditCard.show();
		$bitcoin.hide();
		$paypal.hide();
	} else if($(this).prop('selectedIndex') === 2){
		$paypal.show();
		$creditCard.hide();
		$bitcoin.hide();
	} else if($(this).prop('selectedIndex') === 3){
		$bitcoin.show();
		$paypal.hide();
		$creditCard.hide();
	} else {
		$paypal.hide();
		$bitcoin.hide();
		$creditCard.hide();
	}
});


/*FORM VALIDATION*/
//Ensure that the email field input is validily formatted
function checkEmail(string){
	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string);
	return regex;

}

function emptyFieldCheck(element){
	if(element.val() === ""){
		element.prev().addClass('error')
	} else if(element.prev().hasClass('error')){
		element.prev().removeClass('error')
	}
}


$('button').click(function(e){
	e.preventDefault();
	var $emailValue = $('#mail').val();	
	var $name = $('#name')
	var $activities = $('.activities input');
	var $zip = $('#zip');
	var $cvv = $('#cvv');

	//Check to see if a name has been entered into the form
	emptyFieldCheck($name);

	//Loop through the activity items to see if any checkbox checked
	for(var i = 0; i < $activities.length; i++){
		var checked = false;
		if($activities.eq(i).prop('checked')){
			checked = true;
			break;
		}
	}

	//If nothing checked in activities, apply the error class
	if(!checked){
		$('.activities legend').addClass('error');
	} else if($('.activities legend').hasClass('error')) {
		$('.activities legend').removeClass('error');
	}

	//Run the check Email function to see if valid
	var $goodEmail = checkEmail($emailValue);
	//Based on returned bolean apply or remove error class
	if(!$goodEmail){
		$('#mail').prev().addClass('error');
	} else if($('#mail').prev().hasClass('error')) {
		$('#mail').prev().removeClass('error');
	}

//If credit card is selected, make sure the user supplies a
	if($('#payment').prop('selectedIndex') === 1){
		$('#cc-num').validateCreditCard(function(result){
			if(!result.valid){
				$(this).prev().addClass('error');
			} else if($(this).prev().hasClass('error')) {
				$(this).prev().removeClass('error');
			}
		});	

		emptyFieldCheck($zip);
		emptyFieldCheck($cvv);

	}
});



	//Number
	//Zip Code
	//3 number CVV

/*FORM WORKS WITHOUT JAVASCRIPT*/
//Ensure that all information to fill out the form is visible when JavaScript is disabled