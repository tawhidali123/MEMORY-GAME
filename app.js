//holds all cards

//  icon classes
const images = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", 
"fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];





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
        
        setTimeout(function() {
            card.classList.add('open', 'show', 'disable')
        },500)
    
        setTimeout(function() {
            card.classList.remove('open', 'show', 'disable')
        },2500)

    
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

    // Start Timer
    if(chancesTaken === 1) {
        counter = 0;
        timer();
    };

    rating(chancesTaken);
    

};



// STAR RATING
let star = document.querySelector('.stars');

function rating() {
    
    if(chancesTaken <= 18) {
        star.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;       // 3 star performance if chancesTaken is under 18
    } else if(24 >= chancesTaken) {
        star.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;       // 2 star performance if chancesTaken is under 24
    } else {
        star.innerHTML =
        `<li><i class="fa fa-star"></i></li>`;      // 1 star performance if chancesTaken is 25 or over

    }

};






// GAMEOVER!!!

// ****** MODALS ******
//get modal from html
const popUp = document.querySelector('.modal');

//winners info
const winInfo = document.querySelector('.modal-body');

//star display
const modalStar = document.querySelector('.modal-star');


//play again button
const playAgain = document.querySelector('.button');
playAgain.addEventListener('click', restart);


function gameOver() {
    if(matched.length === images.length) {

        setTimeout(function showModal() {
            popUp.style.display = 'block';        //change display class to block
            clearInterval(interval);              //stops counter
            winInfo.innerHTML = `<p>It took you (${chancesTaken} MOVES) and (${counter} SECONDS)
            to finish the game. Think you can do better?</p>`;                                  // How the player performed

            if(chancesTaken <= 18) {
                modalStar.innerHTML = 
                `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`;       // 3 star performance if chancesTaken is under 18
            } else if(24 >= chancesTaken) {
                modalStar.innerHTML = 
                `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`;       // 2 star performance if chancesTaken is under 24
            } else {
                modalStar.innerHTML =
                `<li><i class="fa fa-star"></i></li>`;      // 1 star performance if chancesTaken is 25 or over
        
            }

        }, 500);
    }
};



// Restart button
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restart); 


function restart() {
    //clear every holder
    container.innerHTML = '';
    flipedCards = [];
    matched = [];
    chancesTaken = 0;
    moves.innerHTML = 0;
    counter = 0;
    time.innerHTML = 0;
    clearInterval(interval);
    startGame();
    rating();
    popUp.style.display = 'none';
};




//  ****  Timer *****
const time = document.querySelector('.timer');
let counter = 0;
let interval;

function timer() {
    interval = setInterval(function() {
        counter++;
        time.innerHTML = counter + ' seconds';

    }, 1000);
    
};






//Activate Game!!
startGame();
























