document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        {
            name: 'cheeseBurger',
            image: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            image: 'images/fries.png'
        },
        {
            name: 'hotdog',
            image: 'images/hotdog.png'
        },
        {
            name: 'milkshake',
            image: 'images/milkshake.png'
        },
        {
            name: 'pizza.png',
            image: 'images/pizza.png'
        },
        {
            name: 'ice-cream.png',
            image: 'images/ice-cream.png'
        },
        {
            name: 'cheeseBurger',
            image: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            image: 'images/fries.png'
        },
        {
            name: 'hotdog',
            image: 'images/hotdog.png'
        },
        {
            name: 'milkshake',
            image: 'images/milkshake.png'
        },
        {
            name: 'pizza.png',
            image: 'images/pizza.png'
        },
        {
            name: 'ice-cream.png',
            image: 'images/ice-cream.png'
        }
    
    ];

    cardsArray.sort(() => 0.5 - Math.random);
    const board = document.querySelector('.grid');
    let cardsChoosen = [];
    let cardsChoosenId = [];
    const cardsWon = [];
    const resultDisplay = document.getElementById('result');
    const prevResult = document.getElementById('previous-result');

    const storeCurrentScore = function (score) {
        localStorage.setItem('previousScore', score);
    }

    const getLastScore = function () {
        const score = localStorage.getItem('previousScore');
        return score;
    }
    // flip match 
    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChoosenId[0];
        const optionTwoId = cardsChoosenId[1];
        if(optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('You have clicked the same image');
        }else if(cardsChoosen[0] === cardsChoosen[1]) {
            alert('You found a match');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChoosen);
            storeCurrentScore(cardsWon.length);
        }else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Sorry try again!');
        }
        cardsChoosen = [];
        cardsChoosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if(cardsWon.length === cardsArray.length/2) {
            resultDisplay.textContent = 'Congratulations You find them all!';
            storeCurrentScore(cardsWon.length);
        }

    }
    // flip cards
    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChoosen.push(cardsArray[cardId].name);
        cardsChoosenId.push(cardId);
        this.setAttribute('src', cardsArray[cardId].image);
        if(cardsChoosen.length === 2) {
            setTimeout(checkForMatch(), 500);
        }

    }

    function createBoard() {
        for(let i=0; i<cardsArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            board.appendChild(card);
            let previousScore = getLastScore();
            if(!previousScore) {
                prevResult.textContent = 'No record found';
            }else {
                prevResult.textContent = previousScore;
            }
        }
        
    }

createBoard();
});
