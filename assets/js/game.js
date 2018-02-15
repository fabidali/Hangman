var gameObject = {
	presentKey: "",

	everyOption: [],
	incorrectOption: [],
	correctOption: [],
	correctOptionbyWins: [],

	champsArray: ["LAKERS", "CELTICS", "PISTONS", "76ERS"],
	randomTeam: "",
	nbaChamps:[],

	Matched: null,
	Repeated: null,

	availableOptions: 15,
	losingTally: 0,
	winCount:0,

	wordPick: function(){
		//Pick a number from 0 - 3
		var availableOptions = Math.random() * 4;
		availableOptions = Math.floor(availableOptions);

		this.randomTeam = this.champsArray[availableOptions];
		this.nbaChamps = this.randomTeam.split("");

		console.log(this.randomTeam + " " + this.nbaChamps);

		//the possible outcomes
		this.everyOption = [];
		this.incorrectOption = [];
		this.correctOption = [];
		this.correctOptionbyWins = [];
		this.availableOptions = 15;
	},

	searchforRepeat: function(){
		var repeatCounter = -1;

		//Loop for the number of guesses previously made amount of times.
		//If the current letter equals one from the array of everyOption, the counter variable counts up one.
		for (var i=0; i < this.everyOption.length; i++){
			if (this.presentKey == this.everyOption[i]){
				repeatCounter++;
			}
		}
		//If counter is zero, the global Repeated variable becomes false (signifying no matches found)
		//Otherwise a match was found and Repeated becomes true.
		if (repeatCounter == 0){
			this.Repeated = false;
		}
		else{
			this.Repeated = true;
		}
	},
	searchforMatch: function(){
		var matchCounter = 0;

		//Loop for each 80's NBA champ.
		//If the option chosen is equal to the the champs letter at a particular interval, the opposite variable will end up being one.
		for (var i=0; i < this.nbaChamps.length; i++){
			if (this.presentKey == this.nbaChamps[i]){
				matchCounter++;
			}
		}
		
		if (matchCounter == 0){
			this.Matched = false;
		}
		else{
			this.Matched = true;
		}
	},
	repeatOptions: function(){
		//If the same key is pressed twice it will no longer be available.
		if (this.Repeated == true){
			this.everyOption.pop(this.presentKey);
		}
		
		if (this.Repeated == false && this.Matched == false){
			this.incorrectOption.push(this.presentKey);
			this.availableOptions--;
		}
		
		if (this.Repeated == false && this.Matched == true){
			this.correctOption.push(this.presentKey);
			this.availableOptions--;
		}
	},
	theChampisHere: function(){
		//If there are no correctOption,
		//For the number of letters in the champs name, fill the displayed guesses with an underscore.
		if (this.correctOption.length == 0){
			for (var i=0; i<this.nbaChamps.length; i++){
				this.correctOptionbyWins[i] = "_";
			}
		}
		else {
			//For the number of letters in the champ's name,
			for (var i=0; i<this.nbaChamps.length; i++){
				//If the option shown is not the same as nbaChamps at i i,
				if (this.correctOptionbyWins[i] != this.nbaChamps[i]){
					//Loop for correctOption length number of times,
					for (var f=0; find<this.correctOption.length; f++){
						//If the correctOption at j is equal to nbaChamps at i, the displayedGuess becomes the bandletter at i i
						if (this.correctOption[f] == this.nbaChamps[i]){
							this.correctOptionbyWins[i] = this.nbaChamps[i];
						}
						
						else {
							this.correctOptionbyWins[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.correctOptionbyWins.join(" ");
		document.getElementById("selected_options").innerHTML = this.incorrectOption;
		document.getElementById("winnings").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.losingTally);
		document.getElementById("choices_left").innerHTML = this.availableOptions;
	},
	gameStatus: function(){
		var counter = 0;

		//Loop the same number of times as the letters in eact team's name. 
		//If a guess is equal to the the band letter at the same i, add 1 to the counter.
		for (var i=0; i<this.nbaChamps.length; i++){
			if (this.correctOptionbyWins[i] == this.nbaChamps[i]){
				counter++;
			}
		}

		if (counter == this.nbaChamps.length){
			alert("You win");
			this.winCount++;
			this.wordCompilation();
		}
		//If the number of guesses remaining is zero, the user has lost.
		if (this.availableOptions == 0){
			alert("You lose! For Real!");
			this.losingTally++;
			this.wordCompilation();
		}
	}
}

var isThisYourFirstTime = false;

//On every keyup...
document.onkeyup = function(f) {

	gameObject.presentKey = String.fromCharCode(f.keyCode).toUpperCase();

	//Start the game if the user presses the space button after page has been loaded
	if (gameObject.presentKey == " " && isThisYourFirstTime == false){


		gameObject.wordCompilation();

		isThisYourFirstTime = true;

	}

	gameObject.everyOption.push(gameObject.presentKey);

	console.log("Current Letter: " + gameObject.presentKey + "\n" + "NBA Champs: " + gameObject.nbaChamps + "\n" + "All Options: " + gameObject.everyOption);


	//Checks to see if the letter has been typed before.
	//Checks to see if the letter matches with one in the band name.
	gameObject.searchforRepeat();
	gameObject.searchforMatch();


	//This function determines which array to push the presentKey into.
	gameObject.repeatOptions();

	console.log("Surprisingly Correct: " + gameObject.correctOption);
	console.log("Of Course You're Wrong: " + gameObject.correctOption);
	console.log("Tic Toc, one more guess down the drain:" + gameObject.availableOptions);

	//Displays who's the champ.
	gameObject.theChampisHere();
	console.log(gameObject.correctOptionbyWins);

	//Displays the status of the game
	gameObject.gameStatus();
}