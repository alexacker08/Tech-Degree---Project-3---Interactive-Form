/*FIRST NAME FOCUS*/
//When Page Loads, focus on the "Name" field
$(document).ready(function(){
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


	$('#title-area').on('click','li', function(){
		console.log("CLICK");
		if($(this).children().text() === "Other"){
			$(customJob).show('fast');

		} else {
			$(customJob).hide('fast');

		}
	});

	/*T- SHIRT SECTION*/
	//Hide the T-Shirt color options until a user chooses a T-Shirt

	$('#colors').hide();

	function colorSelector(num,num1,num2){
		$('#colors li').show();
		$('#colors li').eq(num).hide();
		$('#colors li').eq(num1).hide();
		$('#colors li').eq(num2).hide();
		$('#colors li').eq(0).hide();

	}

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

	$('#payment-area a').eq(0).text();

	$('#payment-area').on('click', 'li', function(){
		if($(this).index() === 1){
			$creditCard.show();
			$paypal.hide();
			$bitcoin.hide();

		} else if($(this).index() === 2){
			$creditCard.hide();
			$paypal.show();
			$bitcoin.show();

		} else {
			$creditCard.hide();
			$paypal.hide();
			$bitcoin.show();

		}

	});



	//Make Credit Card visible by default but make other payment divs visible if selected

	//If a user chooses either PayPal or Bitcoin, then simply hide the "Credit Card" section and reveal the chosen section

	$('#payment-area a').eq(0).text("Credit Card");


	/*FORM VALIDATION*/

	function labelAdditions(label, regexTest, element){
		if(!regexTest){
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


	function inputCheck(){
		var $missing = '<span class="required"> Missing Required Field</span>';

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
		var $ccCheck = $('#cc-num').validateCreditCard();
		var $ccBool = $ccCheck.luhn_valid;

		var $zipLabel = $('#zip').prev();
		var $zipString = $('#zip').val();
		var $zipRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test($zipString);

		var $cvvLabel = $('#cvv').prev();
		var $cvvString = $('#cvv').val();
		var $cvvRegex = /^[0-9]{3,4}$/.test($cvvString);

		var $dateLabel = $('#month label');
		var $dateBool = false;

		if($('#month .trigger').text() === "Month" || $('#year .trigger').text() === "Year"){
			$dateBool = false;

		} else {
			$dateBool = true;

		}

		labelAdditions($nameLabel, $nameRegex, $missing);
		labelAdditions($emailLabel, $emailRegex, $missing);
		labelAdditions($dateLabel, $dateBool, $missing);
		
		for(var i = 0; i < $activitiesInput.length; i++){
			if($activitiesInput.eq(i).prop('checked')){
				$activities = true;
			}

		}

		labelAdditions($activitieslabel, $activities, $missing);


		if($paymentChoice === "Credit Card"){
			labelAdditions($ccNumLabel, $ccBool, $missing);
			labelAdditions($zipLabel, $zipRegex, $missing);
			labelAdditions($cvvLabel, $cvvRegex, $missing);
		}
	}


	$('button').click(function(e){
		e.preventDefault();
		inputCheck();

	});

});


	//Number
	//Zip Code
	//3 number CVV

/*FORM WORKS WITHOUT JAVASCRIPT*/
//Ensure that all information to fill out the form is visible when JavaScript is disabled