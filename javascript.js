function startGame() {
    resetButton.style.display = 'flex';
    return Game = newGame();
};

const gameBoard = ((doc) => {
    let squaresClass = [];
    let numberOfWins = 0;
    let numberMoves = 0;
    
    for(i=1; i<10; i++){
        squaresClass.push(doc.querySelector('.square'+i));
    }

    const reset = () => {
        squaresClass.forEach(square => square.textContent = '');
        squaresClass.forEach(square => square.classList.remove(square.classList[3]));
        squaresClass.forEach(square => square.classList.remove(square.classList[2]));
                /*squaresClass.forEach(square => ()=>{
            while(square.classList.length > 2){
                let indexClass = square.classList.length - 1;
                square.classList.remove(`${square.classList[indexClass]}`);
            }
        });*/
        numberMoves = 0;
        numberOfWins = 0;
    };

    squaresClass.forEach(square => square.addEventListener('click', (e)=>{
        numberMoves += 1;
        if(numberOfWins == 0) {    
            thereIsVictory=Game.victory();
            if(thereIsVictory == 'No'){
                Game.playerToPlay(e);
            } 
            thereIsVictory=Game.victory();

            if(thereIsVictory == 'Yes'){
                Game.assignWinner();
                numberOfWins = 1;
            }
        }
        
        if(numberMoves == 9 && thereIsVictory == 'No'){
            Game.Draw();
        }
    })
    );

    return{squaresClass, reset};
   
})(document);





const Players = (name, symbol, numberCounter)=>{
    let counter = document.querySelector(`.counter_${numberCounter}`);
    
    const reset = () => {
        counter.textContent = 0;
    }

    let increaseCounter = () => {
        let counter = document.querySelector(`.counter_${numberCounter}`);
        currentCount = parseInt(counter.textContent)+1;
        counter.textContent = currentCount;
    }
    let putXorO = (e, currentTurn) => { 
        currentTurn += 1;     
        if(symbol === '+' && e.target.classList.length <= 2){
            e.target.classList.add('selectedX');
            e.target.textContent='+';
        } else if(symbol === 'o' && e.target.classList.length <= 2){
            e.target.classList.add('selectedO');
            e.target.textContent = '';
            currentTurn = 1;
        } else {
           currentTurn -= 1;
        }
        return currentTurn;
    };
    return {putXorO, name, increaseCounter, reset};
};

const player1 = Players('Houmser','+','uno');
const player2 = Players('Rommco','o','dos');

const startButton = document.querySelector('.start');
startButton.addEventListener('click', startGame);


let resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', ()=> {
    gameBoard.reset();
    Game.reset();
    player1.reset();
    player2.reset();
})

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', (e)=> {
    let popUp = document.querySelector('.popUpWinner');
    popUp.classList.remove('popUpWinner_open');
})

let newGameButton = document.querySelector('.newGame');
newGameButton.addEventListener('click', ()=>{
    gameBoard.reset();
    Game.reset();
    let popUp = document.querySelector('.popUpWinner');
    popUp.classList.remove('popUpWinner_open');
})



const newGame = ()=>{
    let divWinner = document.querySelector('.winnerName');
    let popUp = document.querySelector('.popUpWinner');
    let divWin = document.querySelector('.wins');
    let divSymbol = document.querySelector('.symbolPlayer');
    let currentTurn = 1;
    let thereIsVictory = 'No';
 

    const reset = () => {
        currentTurn = 1;
        thereIsVictory = 'No';
        divSymbol.textContent='';
        divSymbol.classList.remove(divSymbol.classList[1]);
    }

    const playerToPlay = (e) => {
        if(currentTurn == 1) {
            currentTurn = player1.putXorO(e, currentTurn);
        } else if (currentTurn == 2){
            currentTurn = player2.putXorO(e, currentTurn);
        } 
    };

    const assignWinner = () => {
        popUp.classList.add('popUpWinner_open');

        if(currentTurn==1){
            divWinner.textContent = `${player2.name}`;
            divWin.textContent = 'wins!'
            divSymbol.classList.add('symbolWinnerO');
            player2.increaseCounter();
        } else {
            divWinner.textContent = `${player1.name}`;
            divWin.textContent = 'wins!'
            divSymbol.textContent = '+';
            divSymbol.classList.add('symbolWinnerX');
            player1.increaseCounter();
        }

    }
    
    const Draw = () => {
        popUp.classList.add('popUpWinner_open');
        divWinner.textContent = `It's a`;
        divWin.textContent = 'DRAW!'
    }


    const victory = () => {
        let divClass1 =  (gameBoard.squaresClass[0]).classList[2];
        let divClass2 =  (gameBoard.squaresClass[1]).classList[2];
        let divClass3 =  (gameBoard.squaresClass[2]).classList[2];
        let divClass4 =  (gameBoard.squaresClass[3]).classList[2];
        let divClass5 =  (gameBoard.squaresClass[4]).classList[2];
        let divClass6 =  (gameBoard.squaresClass[5]).classList[2];
        let divClass7 =  (gameBoard.squaresClass[6]).classList[2];
        let divClass8 =  (gameBoard.squaresClass[7]).classList[2];
        let divClass9 =  (gameBoard.squaresClass[8]).classList[2];


        if(divClass1 == 'selectedX' && divClass2 == 'selectedX' && divClass3 == 'selectedX'){
            (gameBoard.squaresClass[0]).classList.add('winnerX');
            (gameBoard.squaresClass[1]).classList.add('winnerX');
            (gameBoard.squaresClass[2]).classList.add('winnerX');
        thereIsVictory = 'Yes';

        };
        if(divClass4 == 'selectedX' && divClass5 == 'selectedX' && divClass6 == 'selectedX'){
            (gameBoard.squaresClass[3]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[5]).classList.add('winnerX');
            thereIsVictory = 'Yes';
        }
        if(divClass7 == 'selectedX' && divClass8 == 'selectedX' && divClass9 == 'selectedX'){
            (gameBoard.squaresClass[6]).classList.add('winnerX');
            (gameBoard.squaresClass[7]).classList.add('winnerX');
            (gameBoard.squaresClass[8]).classList.add('winnerX');
            thereIsVictory = 'Yes';
        }
        if(divClass1 == 'selectedX' && divClass4 == 'selectedX' && divClass7 == 'selectedX'){
            (gameBoard.squaresClass[0]).classList.add('winnerX');
            (gameBoard.squaresClass[3]).classList.add('winnerX');
            (gameBoard.squaresClass[6]).classList.add('winnerX');
            thereIsVictory = 'Yes';
        }
        if(divClass2 == 'selectedX' && divClass5 == 'selectedX' && divClass8 == 'selectedX'){
            (gameBoard.squaresClass[1]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[7]).classList.add('winnerX');
            thereIsVictory = 'Yes';
        }
        if(divClass3 == 'selectedX' && divClass6 == 'selectedX' && divClass9 == 'selectedX'){
            (gameBoard.squaresClass[2]).classList.add('winnerX');
            (gameBoard.squaresClass[5]).classList.add('winnerX');
            (gameBoard.squaresClass[8]).classList.add('winnerX');
            thereIsVictory = 'Yes';
        }
        if(divClass1 == 'selectedX' && divClass5 == 'selectedX' && divClass9 == 'selectedX'){
            (gameBoard.squaresClass[0]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[8]).classList.add('winnerX');
            thereIsVictory = 'Yes';
        }
        if(divClass3 == 'selectedX' && divClass5 == 'selectedX' && divClass7 == 'selectedX'){
            (gameBoard.squaresClass[2]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[6]).classList.add('winnerX');
            thereIsVictory = 'Yes';
        }
        
        if(divClass1 == 'selectedO' && divClass2 == 'selectedO' && divClass3 == 'selectedO'){
            (gameBoard.squaresClass[0]).classList.add('winnerO');
            (gameBoard.squaresClass[1]).classList.add('winnerO');
            (gameBoard.squaresClass[2]).classList.add('winnerO');
        thereIsVictory = 'Yes';

        };
        if(divClass4 == 'selectedO' && divClass5 == 'selectedO' && divClass6 == 'selectedO'){
            (gameBoard.squaresClass[3]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[5]).classList.add('winnerO');
            thereIsVictory = 'Yes';
        }
        if(divClass7 == 'selectedO' && divClass8 == 'selectedO' && divClass9 == 'selectedO'){
            (gameBoard.squaresClass[6]).classList.add('winnerO');
            (gameBoard.squaresClass[7]).classList.add('winnerO');
            (gameBoard.squaresClass[8]).classList.add('winnerO');
            thereIsVictory = 'Yes';
        }
        if(divClass1 == 'selectedO' && divClass4 == 'selectedO' && divClass7 == 'selectedO'){
            (gameBoard.squaresClass[0]).classList.add('winnerO');
            (gameBoard.squaresClass[3]).classList.add('winnerO');
            (gameBoard.squaresClass[6]).classList.add('winnerO');
            thereIsVictory = 'Yes';
        }
        if(divClass2 == 'selectedO' && divClass5 == 'selectedO' && divClass8 == 'selectedO'){
            (gameBoard.squaresClass[1]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[7]).classList.add('winnerO');
            thereIsVictory = 'Yes';
        }
        if(divClass3 == 'selectedO' && divClass6 == 'selectedO' && divClass9 == 'selectedO'){
            (gameBoard.squaresClass[2]).classList.add('winnerO');
            (gameBoard.squaresClass[5]).classList.add('winnerO');
            (gameBoard.squaresClass[8]).classList.add('winnerO');
            thereIsVictory = 'Yes';
        }
        if(divClass1 == 'selectedO' && divClass5 == 'selectedO' && divClass9 == 'selectedO'){
            (gameBoard.squaresClass[0]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[8]).classList.add('winnerO');
            thereIsVictory = 'Yes';
        }
        if(divClass3 == 'selectedO' && divClass5 == 'selectedO' && divClass7 == 'selectedO'){
            (gameBoard.squaresClass[2]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[6]).classList.add('winnerO');
            thereIsVictory = 'Yes';
        }

        return thereIsVictory;
    };
    return {playerToPlay, victory, assignWinner, Draw, reset};
};


