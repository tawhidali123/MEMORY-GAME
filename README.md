# MEMORY-GAME
MEMORY GAME
/*
 * Create a list that holds all of your cards
 */

//  icon classes
const images = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", 
"fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}






// container to hold all cards
const container = document.querySelector('.deck');


// array to hold cards that were flipped **ONLY 2 ELEMENTS SHOULD BE INSIDE
let flipedCards = [];

// holds how many cards were matched
let matched = [];




// Begin Game !
function startGame() {
    //shuffle images
    shuffle(images);

    // loop through icon images to display cards and have the 'i' tags inside the 'li' element
    // ***
    // Cards are displayed 
    for (let img of images) {
        const card = document.createElement('li');
        card.classList.add('card');  
        card.innerHTML = `<i class='${img}'></i>`;
        container.appendChild(card);

    
        // adds click and instructions to each card
        gameInstructions(card);
    }
};




//GAME INSTRUCTIONS  
function gameInstructions(card) {
// click to show card
    card.addEventListener('click', function() {
        
        //  SECOND card is sent into flipedCards array to compare
        if(flipedCards.length === 1) {
            const card1 = flipedCards[0];
            const card2 = this;

            card2.classList.add('open', 'show', 'disable');
            flipedCards.push(this);               


           compare(card1, card2);

        // FIRST card to get sent into flipedcards array 
        } else { 
            card.classList.add('open', 'show', 'disable');
            flipedCards.push(this);

        }


    });
};
  


function compare(card1, card2) {
   
    // compare first card to the second card

    // THEY MATCH
    if(card1.innerHTML === card2.innerHTML) {
        card2.classList.add('match');
        card1.classList.add('match');     //CARDS MATCH! *

        matched.push(card1, card2);         // MATCHED PAIR PUSHED INTO ARRAY TO DECIDE WHEN GAME IS OVER

        flipedCards = [];       //CLEAR THE ARRAY FOR A NEW COMPARISON *

        gameOver();         // GAME OVER ! when MATCHED array has the same number of values as IMAGES

        
    // THEY DON'T MATCH
    } else {
        setTimeout(function() {  
            flipedCards[0].classList.remove('open', 'show', 'disable');
            flipedCards[1].classList.remove('show', 'open', 'disable'); 
            flipedCards = []             //THEY WERE NOT A MATCH, CLEAR THE ARRAY FOR THE NEXT SET *

        }, 400);
    
    }
    
    movesCompleted();     // MOVES ARE CALCULATED AFTER 2ND CLICK
    
};




// MOVES SECTION
const moves = document.querySelector('.moves');
moves.innerHTML = 0;
let chancesTaken = 0;



// MOVES CALCULATOR
function movesCompleted() {
    chancesTaken++;
    moves.innerHTML = chancesTaken;

    rating(chancesTaken);
};



// STAR RATING
const star = document.querySelector('.stars');
star.innerHTML = '';

function rating() {
    if(chancesTaken <= 16) {
        star.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;       // 3 star performance if chancesTaken is under 10
    } else if(23 >= chancesTaken) {
        star.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;       // 2 star performance if chancesTaken is under 17
    } else {
        star.innerHTML =
        `<li><i class="fa fa-star"></i></li>`;      // 1 star performance if chancesTaken is 18 or over

    }

};






// GAMEOVER!!!
function gameOver() {
    if(matched.length === images.length) {

        setTimeout(function popUp() {
        alert('GAME OVER!!  PLEASE PLAY AGAIN!');
        }, 500);
    }
};



// Restart button
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
    container.innerHTML = '';
    flipedCards = [];
    matched = [];
    chancesTaken = 0;
    moves.innerHTML = 0;
    startGame();
    rating();
    
});




//Activate Game!!
startGame();

