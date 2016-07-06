$(document).ready(function(){

	/*FIRST NAME FOCUS*/
	//When Page Loads, focus on the "Name" field	
	$('#name').focus();

	/*JOB ROLE SELECTION*/
	//Make the "Your job role" text field appear when users select Other from the Job Role menu

	var customJob = document.createElement('input');
	customJob.setAttribute('type', 'text');
	customJob.setAttribute('id', 'custom_job');
	customJob.setAttribute('name', 'custom_job');
	customJob.setAttribute('placeholder', 'Your job role');

	$('fieldset').eq(0).append(customJob);
	$(customJob).hide();

	//Apply click listeners to the Job Role drop down option of "OTHER"
	$('#title-area').on('click','li', function(){
		if($(this).children().text() === "Other"){
			$(customJob).show('fast');

		} else {
			$(customJob).hide('fast');

		}
	});


	/*T- SHIRT SECTION*/
	//Hide the T-Shirt color options until a user chooses a T-Shirt

	$('#colors').hide();

	//Function designed to swap between T-Shirt options based on selection
	function colorSelector(num,num1,num2){
		$('#colors li').show();
		$('#colors li').eq(num).hide();
		$('#colors li').eq(num1).hide();
		$('#colors li').eq(num2).hide();
		$('#colors li').eq(0).hide();

	}

	//Click listers on T-Shirt theme options
	$('#design').on('click', 'li', function(){
		$('#colors a').eq(0).text("Select a Theme");
		$('#colors').show();
		if($(this).index() === 1){
			colorSelector(4,5,6);
			

		} else if($(this).index() === 2){
			colorSelector(1,2,3);
		}
	});


	/*ACTIVITY REGISTRATION*/
	//Ensure that a user cannot select two activities that are at the same time

	var cost = 0;

	//Listen to any chance that occurs on the checkbox inputs. Data attributes applied to the checkbox elements to help theme the same timed events together
	$('.activities input').change(function(){
		//Find the particular data type that is clicked on
		var timeType = $(this).attr('data-time-type');
		//Grab the text within the corresponding checkbox
		var labelText = $(this).parents('label').text();
		//Find the starting index of where the dollar sign begins within each text label
		var start = labelText.indexOf('$') + 1;
		//Grab the end of the string
		var end = labelText.length;
		//Grab the corresponding dollar amounts out of the individual text field
		var number = labelText.slice(start, end);

		//Check to see if the input was checked
		if($(this).prop('checked')){
			cost += parseInt(number);
			//Disable conflicting data types
			$(this).parents().siblings().children('*[data-time-type='+timeType+']').prop('disabled', true);
			//Apply disabled class to make the appearence of hidden
			$(this).parents().siblings().children('*[data-time-type='+timeType+']').parent().addClass('disabled');

		} else {
			cost -= parseInt(number);
			$(this).parents().siblings().children('*[data-time-type='+timeType+']').prop('disabled', false);
			$(this).parents().siblings().children('*[data-time-type='+timeType+']').parent().removeClass('disabled');
		}

	//Display the total cost of activities below the list of activities
		if(cost > 0){
			$('.payment-total').stop().css('opacity', '0').html(function(){
				return '$'+cost;
			}).animate({
				opacity: 1

			}, 500);
		} else {
			$('.payment-total').text("");
		}
	});


	/*DISPLAYING PAYMENT SECTION*/
	var $paypal = $('.paypal');
	var $bitcoin = $('.bitcoin');
	var $creditCard = $('#credit-card');

	//Hide both the paypal and bitcoin sections on load
	$paypal.hide();
	$bitcoin.hide();

	$('#payment-area').on('click', 'li', function(){
		if($(this).index() === 1){
			$creditCard.show('fast');
			$paypal.hide('fast');
			$bitcoin.hide('fast');

		} else if($(this).index() === 2){
			$creditCard.hide('fast');
			$paypal.show('fast');
			$bitcoin.hide('fast');

		} else {
			$creditCard.hide('fast');
			$paypal.hide('fast');
			$bitcoin.show('fast');

		}

	});

	//A quick fix to the Payment dropdown to make "Credit Card" appear by default.

	$('#payment-area a').eq(0).text("Credit Card");

	
	/*FORM VALIDATION*/
	/* The labelAdditions function seeks to apply an error rule on particular "label" elements throughout the form based on a specific regex text
	that each input on the form must go through. These paramters are set in the inPut Check function. The function also counts the number of times
	an error to an input occurs when run. This is useful during the submit stage as it used to determine if the submit is successful or if the form 
	should prevent a default action*/

	function labelAdditions(label, regexTest, element){
		if(!regexTest){
			check += 1;
			if(label.hasClass('error')){
				return false;
			} else {
				label.addClass('error');
				label.append(element);
			}

		} else {
			if(label.hasClass('error')){
				label.removeClass('error');
				label.children().remove();
			}
		}
	}

	var check;

	/*CHECK THE INPUTS AND APPLY ERRORS*/
	/*The input check grabs the necesssary elements and runs the appropriate labelAdditions function against each respctive user input to determine
	if an error has occured. If the regex and or boolean tests for each input does not pass, the labelAdditions function will append the span tag to
	the respective label element */

	function inputCheck(){
		check = 0;
		var $missing = '<span class="required"> Error</span>';
		var $missingAdjust = '<span class="required size-adjusted"> Error</span>';

		var $nameLabel = $('#name').prev();
		var $nameString = $('#name').val();
		var $nameRegex = /^[a-zA-Z,'.\-\s]+$/.test($nameString);

		var $emailLabel = $('#mail').prev();
		var $emailString = $('#mail').val();
		var $emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($emailString);

		var $activitieslabel = $('.activities legend');
		var $activities = false;
		var $activitiesInput = $('.activities input');

		var $paymentChoice = $('#payment-area .trigger').text();
		var $ccNumLabel = $('#cc-num').prev();
		//Utilized a jQuery plugin here to validate the credit cards initial input
		var $ccCheck = $('#cc-num').validateCreditCard();
		//Sets the boolean based on it's result
		var $ccBool = $ccCheck.luhn_valid;

		var $zipLabel = $('#zip').prev();
		var $zipString = $('#zip').val();
		var $zipRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test($zipString);

		var $cvvLabel = $('#cvv').prev();
		var $cvvString = $('#cvv').val();
		var $cvvRegex = /^[0-9]{3,4}$/.test($cvvString);

		var $dateLabel = $('#month label');
		var $dateBool = false;

		//Check name
		labelAdditions($nameLabel, $nameRegex, $missing);
		//Check email 
		labelAdditions($emailLabel, $emailRegex, $missing);

		
		//Loop through the checked inputs to see if any have been checked. If so make the $activities boolean true
		for(var i = 0; i < $activitiesInput.length; i++){
			if($activitiesInput.eq(i).prop('checked')){
				$activities = true;
			}

		}

		//Check Acitivites input
		labelAdditions($activitieslabel, $activities, $missing);

		//Run the credit card checks only if the payment choice of "Credit Card is selected.
		if($paymentChoice === "Credit Card"){
			labelAdditions($ccNumLabel, $ccBool, $missing);
			labelAdditions($zipLabel, $zipRegex, $missingAdjust);
			labelAdditions($cvvLabel, $cvvRegex, $missingAdjust);
			if($('#month .trigger').text() === "Month" || $('#year .trigger').text() === "Year"){
				$dateBool = false;
			} else {
				$dateBool = true;
			}
			labelAdditions($dateLabel, $dateBool, $missing);
		}
	}

	$('button').click(function(e){
		inputCheck();
		//Check to see if there are any erros on the form
		if(check > 0){
			e.preventDefault();
		}		
	});

});