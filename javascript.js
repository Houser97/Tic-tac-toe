let player1 = 0;
let player2 = 0;

function createPlayers(e) {
    e.preventDefault();
    let popUpForm = document.querySelector('.popUpForm');
    popUpForm.style.display = 'none';
    let player1Element = document.getElementById('namePlayer1').value;
    let player2Element = document.getElementById('namePlayer2').value;
    
    player1 = Players(player1Element,'+','uno');
    player2 = Players(player2Element,'o','dos');

    let name1 = document.querySelector('.nameDisplay1');
    name1.textContent = `${player1Element}`;

    let name2 = document.querySelector('.nameDisplay2');
    name2.textContent = `${player2Element}`;
}

function startGame() {
    document.querySelector('.playerTurn1').classList.add('effect');
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
        /*numberMoves += 1; quitar el que esta dentro con game ai*/
        if(numberOfWins == 0) {    
            thereIsVictory=Game.victory();
            if(thereIsVictory == 'No'){
                /*Game.playerToPlay(e);*/
                
                Game.ai(e,gameBoard.squaresClass);
                numberMoves += 1;

            } 
            thereIsVictory=Game.victory();

            if(thereIsVictory == 'Yes'){
                /*Game.assignWinner();*/
                Game.assignWinnerAI();
                numberOfWins = 1;
            }
        }
        /*numberMoves == 9* en el if 
        if(numberMoves >= 5 && thereIsVictory == 'No'){
            Game.Draw();
        }*/ 
        let availableSquare = [];
        squaresClass.forEach(square => {
            if(square.classList.length < 3){
                availableSquare.push(square);
            }
        })
        if(availableSquare.length == 0){
            Game.Draw();
            console.log(availableSquare);
        }
    })
    );

    return{squaresClass, reset};
   
})(document);





const Players = (name, symbol, numberCounter)=>{
    let counter = document.querySelector(`.counter_${numberCounter}`);
    
    const reset = () => {
        counter.textContent = 0;
        numberMoves = 0;
    }

    const resetAI = () => {
        numberMoves = 0;
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
/*Nuevo*/
let numberMoves = 0;
let thereIsVictory = 'No';
    const playWithAi = (e, board) => {
        let turn = 0;
        numberMoves += 1;
        if(symbol === '+' && e.target.classList.length <= 2){
            turn +=1;
            e.target.classList.add('selectedX');
            e.target.textContent='+';

            let availableSquare = [];
            board.forEach(square => {
            if(square.classList.length < 3){
                availableSquare.push(square);
            }
            })
            if(availableSquare.length == 0){
                Game.Draw();
                console.log(availableSquare);
             } else {

            thereIsVictory=Game.victory();
            if(thereIsVictory == 'No'){
                turn +=1;
                let bestScore = -Infinity;
                let bestMove;

                let helpCounter = 0;
                let positionSquare = 0;

                board.forEach(square => {
                    helpCounter +=1;
                    
                    if(square.classList.length <=2 && square.textContent == ''){
                        square.classList.add('selectedO');
                        let score = minimax(board);
                        square.classList.remove('selectedO');

                        if(score >= bestScore){
                            bestScore = score;
                            bestMove = square;
                            positionSquare = helpCounter;
                        }
                    } else{
                        
                    }
                })
                bestMove.classList.add('selectedO')
            }
        }
            function minimax(board){
                return 1;
            }
            
        }
        return turn;
    };
    return {putXorO, name, increaseCounter, reset, playWithAi, resetAI};
};

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
    player1.resetAI();
    player2.resetAI();
})

let Form = document.querySelector('.form');
Form.addEventListener('submit', createPlayers);



const newGame = ()=>{
    let divWinner = document.querySelector('.winnerName');
    let popUp = document.querySelector('.popUpWinner');
    let divWin = document.querySelector('.wins');
    let divSymbol = document.querySelector('.symbolPlayer');
    let currentTurn = 1;
    let thereIsVictory = 'No';
    let currentPlayer1 = document.querySelector('.playerTurn1');
    let currentPlayer2 = document.querySelector('.playerTurn2');
 

    const reset = () => {
        currentTurn = 1;
        thereIsVictory = 'No';
        divSymbol.textContent='';
        divSymbol.classList.remove(divSymbol.classList[1]);
        currentPlayer1.classList.add('effect');
        currentPlayer2.classList.remove('effect')
    }

    const ai = (e,board) => {
        currentTurn = player1.playWithAi(e, board);
    }

    const playerToPlay = (e) => {
        if(currentTurn == 1) {
            currentTurn = player1.putXorO(e, currentTurn);
            currentPlayer1.classList.remove('effect');
            currentPlayer2.classList.add('effect')
        } else if (currentTurn == 2){
            currentTurn = player2.putXorO(e, currentTurn);
            currentPlayer1.classList.add('effect')
            currentPlayer2.classList.remove('effect');
        } 
    };

    const assignWinnerAI = () => {
        popUp.classList.add('popUpWinner_open');
        console.log(currentTurn);

        if(currentTurn%2){
            divWinner.textContent = `${player1.name}`;
            divWin.textContent = 'wins!'
            divSymbol.textContent = '+';
            divSymbol.classList.add('symbolWinnerX');
            player1.increaseCounter();
        } else {
            divWinner.textContent = `${player2.name}`;
            divWin.textContent = 'wins!'
            divSymbol.classList.add('symbolWinnerO');
            player2.increaseCounter();
        }

    }

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
    return {playerToPlay, victory, assignWinner, Draw, reset, ai,assignWinnerAI};
};


