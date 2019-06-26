/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, prevRoll, playerOneName, playerTwoName, gamePlaying;

playerOneName = 'Player 1' // prompt('What is Player One\'s name? ');
playerTwoName = 'Player 2' // prompt('What is Player One\'s name? ');

init();

// can use the .value property to get .value of a field 

document.querySelector('form').addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    playerOneName = formData.get('field-a');
    playerTwoName = formData.get('field-b');
    e.preventDefault();
    document.querySelector('.name-entry').classList.add('swipe-up-fade');

    document.getElementById('name-0').textContent = playerOneName;
    document.getElementById('name-1').textContent = playerTwoName;
});


// document.querySelector('.btn-roll').addEventListener('click', btn); // btn is the "Callback function" , gets passed into the Eventlistener function to be called. so does not require btn(); the parameter brackets
document.querySelector('.btn-roll').addEventListener('click', function () { // This is an anonomouse function    
    if (gamePlaying) {

        var dice = Math.ceil(Math.random() * 6);
        var diceDOM = document.querySelector('.dice');
        var currentPlayerRoundscore = document.querySelector('#current-' + activePlayer);

        document.querySelector('.dice').style.display = 'block';

        // when dice number changes, change dice png link based on number
        diceDOM.src = './images/dice-' + dice + '.png';

        // if dice rolls same number 2x then show flash
        prevRoll === dice ? diceDOM.classList.add('dice-scale-and-flash') : diceDOM.classList.remove('dice-scale-and-flash')
        prevRoll = dice;

        if (dice > 1) {
            // Add score
            roundScore += dice;
            // roundScore = roundScore + dice; // More work, use above version
            currentPlayerRoundscore.textContent = roundScore;
        } else {
            nextPlayer();
        }

    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {

        //Add current roll score to global score
        scores[activePlayer] += roundScore;
        console.log(scores);

        // update UI to match results , check if the player won the game
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        if (scores[activePlayer] >= 50) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';

            gamePlaying = false; // Game playing false
        } else {
            nextPlayer();
        }
    }

})

document.querySelector('.btn-new').addEventListener('click', init);



function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // turnery operator
    console.log('current active player: ', activePlayer);

    roundScore = 0;

    document.querySelector('#current-' + activePlayer).textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevRoll = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // game starts with hidden dice

    document.getElementById('score-0').textContent = '0'; // faster than querySelecter
    document.getElementById('score-1').textContent = '0'; // do not need to use the context for ID #
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = playerOneName;
    document.getElementById('name-1').textContent = playerTwoName;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}







// document is the OBJECT and .textContent is the METHOD
//document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-1').textContent; // This is a getter
// console.log('x: ', x);