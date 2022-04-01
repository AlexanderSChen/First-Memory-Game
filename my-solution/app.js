const section = document.querySelector("section");
let correctMatches = 0;
let score = 0;
let bestScore = localStorage.getItem("top-score");
let start = document.getElementById("start");

// if there is a best score then change the inner text of top-score to display the best score.
if(bestScore) {
    document.getElementById("top-score").innerText = bestScore;
}

// let startBtn = document.getElementById("start-button");
// startBtn.addEventListener("click", startGame);
//Generate the data
const getData = () => [
    { gifSrc: "./gifs/1.gif", name: "gif 1"}, 
    { gifSrc: "./gifs/2.gif", name: "gif 2"}, 
    { gifSrc: "./gifs/3.gif", name: "gif 3"}, 
    { gifSrc: "./gifs/4.gif", name: "gif 4"}, 
    { gifSrc: "./gifs/5.gif", name: "gif 5"}, 
    { gifSrc: "./gifs/6.gif", name: "gif 6"}, 
    { gifSrc: "./gifs/7.gif", name: "gif 7"}, 
    { gifSrc: "./gifs/8.gif", name: "gif 8"}, 
    { gifSrc: "./gifs/9.gif", name: "gif 9"}, 
    { gifSrc: "./gifs/10.gif", name: "gif 10"}, 
    { gifSrc: "./gifs/11.gif", name: "gif 11"}, 
    { gifSrc: "./gifs/12.gif", name: "gif 12"}, 
    { gifSrc: "./gifs/1.gif", name: "gif 1"}, 
    { gifSrc: "./gifs/2.gif", name: "gif 2"}, 
    { gifSrc: "./gifs/3.gif", name: "gif 3"}, 
    { gifSrc: "./gifs/4.gif", name: "gif 4"}, 
    { gifSrc: "./gifs/5.gif", name: "gif 5"}, 
    { gifSrc: "./gifs/6.gif", name: "gif 6"}, 
    { gifSrc: "./gifs/7.gif", name: "gif 7"}, 
    { gifSrc: "./gifs/8.gif", name: "gif 8"}, 
    { gifSrc: "./gifs/9.gif", name: "gif 9"}, 
    { gifSrc: "./gifs/10.gif", name: "gif 10"}, 
    { gifSrc: "./gifs/11.gif", name: "gif 11"}, 
    { gifSrc: "./gifs/12.gif", name: "gif 12"}, 
];


// shuffleCards function randomizes order inside array
const shuffleCards = () => {
    const cardData = getData();
    
    //arrow function sorts array randomly
    cardData.sort(()=> Math.random() - 0.5);

    return cardData;
    // console.log(cardData);
}

// Function creates HTML for each card
const cardCreate = () => {
    const cardData = shuffleCards();
    //Generate HTML creating a forEach function that creates a card div element, front img element, and back div element with class lists added to them for card front and back.
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const front = document.createElement('img');
        const back = document.createElement('div');
        card.classList = "card";
        front.classList = "front";
        back.classList = "back";
        // give the front of the cards the value of the gifs.
        front.src = item.gifSrc;
        back.innerText = "❓";
        // gives each of the cards a unique name so we can check if they match later.
        card.setAttribute('name', item.name);
        // attach cards to the section
        section.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

        //event listener checks for clicks and toggles the card, causing it to flip in the css and runs the checkCards function for the clicked card.
        card.addEventListener("click", function(event) {
            card.classList.toggle("toggleCard");
            checkCards(event);
        });
    });
};

cardCreate();

// Check matching cards
const checkCards = (e) => {
    const cardClick = e.target;
    // console.log(cardClick);
    setScore(score + 1);
    cardClick.classList.add("flipped");
    // When clicked, the flipped class is added to the card
    const flippedCards = document.querySelectorAll(".flipped");
    
    // if flipped cards 
    if(flippedCards.length === 2) {
        // check if the names of the cards match
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            correctMatches += 2;
            console.log("match");
            flippedCards.forEach((card) => {
                // if correct, remove flipped class and remove pointer events so correct cards can no longer be clicked.
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
            // when 2 wrong matches are clicked, the flipped class is removed for the cards and a timeout is triggered so the first card does not immediately flip back that removes toggleCard so the card flips back.
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
        }
    }
    if(correctMatches === 24) endGame();
};

function startGame() {
    setScore(0);
    shuffleCards();
}

function setScore(newScore) {
    score = newScore;
    document.getElementById("current-score").innerText = score;
}

function endGame() {
    let end = document.getElementById("end");
    let scoreBoard = end.children[1];
    scoreBoard.innerText = "Your Score: " + score;
    let bestScore = +localStorage.getItem("top-score") || Infinity;
    if(score < bestScore) {
        scoreBoard.innerText += " - NEW BEST SCORE!!";
        localStorage.setItem("top-score", score);
    }
    document.getElementById("end").classList.add("game-over");
}

