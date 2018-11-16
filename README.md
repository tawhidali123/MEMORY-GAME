# MEMORY-GAME
1.  create an array to hold all icon image classes 
```javascript
const images = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", 
"fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 
```

2.  //Begin game by making a function that displays all the images into the container variable. Shuffle the images as the
cards are being displayed with the shuffle(image) function.
```javascript
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
```

3.  Include gameInstructions() function inside startGame()  


4.  inside gameInstructions() we add a click event listner  that has an if/else statement that sends two cards selected
into the empty ```let flipedCards = [];```. when the two cards are selected we should add the ```.classList.add('open', 'show', 'disable')```
classes into each card. Then when two cards are selected we call the ```compare()``` function.
```javascript
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
```

5.  compare() has two cards inside the function and if the two cards have the same image or 'innerHTML' i should say, i will
add a classlist of 'match' which will keep the cards flipped over and display a background color of green. If it 
doesnt match we want to remove the classlist of ('open', 'show', 'disable') so the cards are flipped back down.
On both occasions we want the 'flipedcards' array to be empty after any two cards were compared.
When the cards match we want to push the matched pair into an empty array called 'matched = []'.
gameOver() is also included for when the last pair of matched cards are executed. Talk about that in a bit.
```javascript
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
```


6. movesCompleted() calculates how many moves have been made by adding 1 to 'chancesTaken = 0' after every second click.
the timer() and rating() is also activated at this point.
```javascript
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
```

7.  I want to target the star rating at this point on the window. I want to show 3 stars if the user is under 18 chances
taken, 2 stars if chances taken is under 24, and 1 star if chances taken is 25 or over. I add the innerHTML to show the 
star icons in the window.
```javascript
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
```

8.  Back to the gameOver() we stated in the compare(). We know the game is over after all the images have been matched.
the array 'matched' has all the pairs of matched cards. Once 'matched.length' is equal to 'images.length'  which should be 16
i want to activate the modal function which will show how many moves the user took, the star rating, and a chance to play again.
To play the game over again theresa function called restart() which basically sets all the variable back to 0, empties out
each array and innerHTML.
```javascript
function gameOver() {
    if(matched.length === images.length) {

        setTimeout(function showModal() {
            popUp.style.display = 'block';        //change display class to block
            clearInterval(interval);              //stops counter
            winInfo.innerHTML = `<p>Good job, it took you ${chancesTaken} MOVES and ${counter} SECONDS
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

//play again button
const playAgain = document.querySelector('.button');
playAgain.addEventListener('click', restart);

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
```

9.  Activate game startGame();

