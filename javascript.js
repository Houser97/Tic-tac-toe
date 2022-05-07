let player1 = 0;
let player2 = 0;
let playAI = 'NY';
let winner = null;

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
    let numberOfWins = 0; /*Ayuda a clavar la victoria para evitar mas jugadas*/
    
    for(i=1; i<10; i++){
        squaresClass.push(doc.querySelector('.square'+i));
    }

    const reset = () => {
        squaresClass.forEach(square => square.textContent = '');
        squaresClass.forEach(square => square.classList.remove(square.classList[3]));
        squaresClass.forEach(square => square.classList.remove(square.classList[2]));
        numberOfWins = 0;
    };

    squaresClass.forEach(square => square.addEventListener('click', (e)=>{ 
        if(playAI == 'No'){
            if(numberOfWins == 0) {    

                thereIsVictory=Game.victory();

                if(thereIsVictory == 'No'){
                    Game.playerToPlay(e);
                    /* AI
                    Game.ai(e,gameBoard.squaresClass);
                    */

                } 

                thereIsVictory=Game.victory(); /*Se vuelve a declarar */

                if(thereIsVictory == 'Yes'){
                    Game.assignWinner();
                    /*Game.assignWinnerAI();*/
                    numberOfWins = 1;
                }
            }
        } else{
            /* --------------------Seccion para jugar contra AI------------------*/
            /* Seccion que llama a los metodos para hacer la jugadas y evita que se hagan
            mas cuando hay un ganador o empate */
            if(numberOfWins == 0) {    

                thereIsVictory=Game.victory();

                if(thereIsVictory == 'No'){
                    Game.ai(e);
                } 

                thereIsVictory=Game.victory(); /*Se vuelve a declarar */

                if(thereIsVictory == 'Yes'){
                    Game.assignWinnerAI();
                    numberOfWins = 1;
                }
            }
        }


        /*Guardar espacios disponibles*/
        let availableSquare = [];
        squaresClass.forEach(square => {
            if(square.classList.length < 3){
                availableSquare.push(square);
            }
        })

        

        /*Definir empate si no hay espacios y no hubo victoria*/
        if(availableSquare.length == 0 && thereIsVictory == 'No'){
            Game.Draw();
            console.log(availableSquare);
        }
    })
    );

    return{squaresClass, reset};
   
})(document);

/*(gameBoard.squaresClass).forEach(square => {
    square.classList.add('winnerX');
    
})*/

/*(gameBoard.squaresClass).forEach( square => {
    if(square.classList.length <=2 && square.textContent == ''){
        console.log(gameBoard.squaresClass)
    } 
})*/



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
        currentCount = parseInt(counter.textContent)+1;
        counter.textContent = currentCount;
    }

    let putXorO = (e, currentTurn) => { 
        let currentPlayer1 = document.querySelector('.playerTurn1');
        let currentPlayer2 = document.querySelector('.playerTurn2');
        currentTurn += 1; /*Pasa el turno en playerToPlay en objeto GAME */  

        if(symbol === '+' && e.target.classList.length <= 2){
            e.target.classList.add('selectedX');
            e.target.textContent='+';

            /*Ilumina contador de jugador en turno*/
            currentPlayer1.classList.remove('effect'); 
            currentPlayer2.classList.add('effect')

        } else if(symbol === 'o' && e.target.classList.length <= 2){
            e.target.classList.add('selectedO');
            e.target.textContent = '';
            currentTurn = 1; /*Se reinicia la cuenta para asignar turno.*/

            /*Ilumina contador de jugador en turno*/
            currentPlayer1.classList.add('effect')
            currentPlayer2.classList.remove('effect');
        } else {
           currentTurn -= 1; /*Si hubo jugada no valida se permite al jugador volver a tirar*/
        }
        return currentTurn;
    };
/*Nuevo*/
let scores = {
    winnerX: -10,
    winnerO: 10, /*AI juega con O, por eso es positivo aca*/
    tie: 0
}

function minimax(depth, isMaximizing){
    Game.victoryAI(); /* revisar cuando el minimax llegue al final de la partida*/
    
    if(winner !== null){
        console.log(scores[winner]);
        return scores[winner];
    } 

    if(isMaximizing){
        let bestScore = -Infinity;
        (gameBoard.squaresClass).forEach( square => {
            if(square.classList.length <=2 && square.textContent == ''){
                square.classList.add('selectedO'); /*Haz jugada*/
                let score = minimax(depth+1 ,false);
                square.classList.remove('selectedO'); /*Limpia jugada*/
                bestScore = Math.max(score,bestScore);
            } 
        })
        return bestScore;
    } else {
        let bestScore = Infinity;
        
        (gameBoard.squaresClass).forEach( square => {
            contadorPosicion += 1;
            
            if(square.classList.length <=2 && square.textContent == ''){
                square.classList.add('selectedX'); /*Haz jugada*/
                let score = minimax(depth+1 ,true);
                square.classList.remove('selectedX'); /*Limpia jugada*/
                square.textContent = '';

                bestScore = Math.min(score,bestScore);
            } 
            
        })
        
        return bestScore;
    }
    
}

let thereIsVictory = 'No';
    const playWithAi = (e) => {
        let turn = 0;
        
        if(symbol === '+' && e.target.classList.length <= 2){
            turn +=1;
            e.target.classList.add('selectedX');
            e.target.textContent='+';
/*Se implementa empate otra vez para saber si AI no debe tirar, ya que este metodo deja que tiren los dos a la vez */
            thereIsVictory=Game.victory();
            let availableSquare = [];
            (gameBoard.squaresClass).forEach(square => {
            if(square.classList.length < 3){
                availableSquare.push(square);
            }
            })
            if(availableSquare.length == 0 && thereIsVictory == 'No'){
                Game.Draw();
                console.log(availableSquare.length);
             } else {
/* Turno de AI */
            
            if(thereIsVictory == 'No'){
                
                let bestScore = -10000;
                let bestMove = 0;
                let contadorPosicion = -1;
                
                
                (gameBoard.squaresClass).forEach( square => {
                    contadorPosicion += 1;
                    
                    if(square.classList.length <=2 && square.textContent == ''){
                        square.classList.add('selectedO'); /*Haz jugada*/
                        let score = minimax(0 ,false);
                        square.classList.remove('selectedO'); /*Limpia jugada*/
                        if(score > bestScore){
                            bestScore = score;
                            bestMove = square; /*Mejor jugada hallada*/
                        }
                    } 
                    
                })
                console.log(bestMove);
                console.log(bestScore);
                bestMove.classList.add('selectedO');
                turn +=1;
            }
            
        }
            
    }

        return turn;
    };
    return {putXorO, name, increaseCounter, reset, playWithAi, resetAI};
};

/* Objeto de juego */
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

    const ai = (e) => {
        currentTurn = player1.playWithAi(e);
    }

    const playerToPlay = (e) => {
        if(currentTurn == 1) {
            currentTurn = player1.putXorO(e, currentTurn);
        } else if (currentTurn == 2){
            currentTurn = player2.putXorO(e, currentTurn);
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
        let boardClassesArray = [[divClass1,divClass2,divClass3],
                                 [divClass4,divClass5,divClass6],
                                 [divClass7,divClass8,divClass9]]
        let winnerX = 'winnerX';
        let winnerO = 'winnerO';

/*
        for(i=0; i<=2; i ++){
            
            if(boardClassesArray[0][0]=='selectedX' || boardClassesArray[0][0]=='selectedO'){
                if(boardClassesArray[i][0]==boardClassesArray[i][1] && boardClassesArray[i][1]==boardClassesArray[i][2]){
                    winner = boardClassesArray[i][0];
                    thereIsVictory = 'Yes';
                    if(boardClassesArray[i][0]=='selectedX'){
                        (gameBoard.squaresClass[0]).classList.add('winnerX');
                        (gameBoard.squaresClass[1]).classList.add('winnerX');
                        (gameBoard.squaresClass[2]).classList.add('winnerX');
                    } else{
                        (gameBoard.squaresClass[3]).classList.add('winnerO');
                        (gameBoard.squaresClass[4]).classList.add('winnerO');
                        (gameBoard.squaresClass[5]).classList.add('winnerO');
                    }
                    break;
                }
            }
            
        }*/

        if(divClass1 == 'selectedX' && divClass2 == 'selectedX' && divClass3 == 'selectedX'){
            (gameBoard.squaresClass[0]).classList.add('winnerX');
            (gameBoard.squaresClass[1]).classList.add('winnerX');
            (gameBoard.squaresClass[2]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';

        };
        if(divClass4 == 'selectedX' && divClass5 == 'selectedX' && divClass6 == 'selectedX'){
            (gameBoard.squaresClass[3]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[5]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';
        }
        if(divClass7 == 'selectedX' && divClass8 == 'selectedX' && divClass9 == 'selectedX'){
            (gameBoard.squaresClass[6]).classList.add('winnerX');
            (gameBoard.squaresClass[7]).classList.add('winnerX');
            (gameBoard.squaresClass[8]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';
        }
        if(divClass1 == 'selectedX' && divClass4 == 'selectedX' && divClass7 == 'selectedX'){
            (gameBoard.squaresClass[0]).classList.add('winnerX');
            (gameBoard.squaresClass[3]).classList.add('winnerX');
            (gameBoard.squaresClass[6]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';
        }
        if(divClass2 == 'selectedX' && divClass5 == 'selectedX' && divClass8 == 'selectedX'){
            (gameBoard.squaresClass[1]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[7]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';
        }
        if(divClass3 == 'selectedX' && divClass6 == 'selectedX' && divClass9 == 'selectedX'){
            (gameBoard.squaresClass[2]).classList.add('winnerX');
            (gameBoard.squaresClass[5]).classList.add('winnerX');
            (gameBoard.squaresClass[8]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';
        }
        if(divClass1 == 'selectedX' && divClass5 == 'selectedX' && divClass9 == 'selectedX'){
            (gameBoard.squaresClass[0]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[8]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';
        }
        if(divClass3 == 'selectedX' && divClass5 == 'selectedX' && divClass7 == 'selectedX'){
            (gameBoard.squaresClass[2]).classList.add('winnerX');
            (gameBoard.squaresClass[4]).classList.add('winnerX');
            (gameBoard.squaresClass[6]).classList.add('winnerX');
            thereIsVictory = 'Yes';
            winner = 'winnerX';
        }
        
        if(divClass1 == 'selectedO' && divClass2 == 'selectedO' && divClass3 == 'selectedO'){
            (gameBoard.squaresClass[0]).classList.add('winnerO');
            (gameBoard.squaresClass[1]).classList.add('winnerO');
            (gameBoard.squaresClass[2]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';

        };
        if(divClass4 == 'selectedO' && divClass5 == 'selectedO' && divClass6 == 'selectedO'){
            (gameBoard.squaresClass[3]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[5]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';
        }
        if(divClass7 == 'selectedO' && divClass8 == 'selectedO' && divClass9 == 'selectedO'){
            (gameBoard.squaresClass[6]).classList.add('winnerO');
            (gameBoard.squaresClass[7]).classList.add('winnerO');
            (gameBoard.squaresClass[8]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';
        }
        if(divClass1 == 'selectedO' && divClass4 == 'selectedO' && divClass7 == 'selectedO'){
            (gameBoard.squaresClass[0]).classList.add('winnerO');
            (gameBoard.squaresClass[3]).classList.add('winnerO');
            (gameBoard.squaresClass[6]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';
        }
        if(divClass2 == 'selectedO' && divClass5 == 'selectedO' && divClass8 == 'selectedO'){
            (gameBoard.squaresClass[1]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[7]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';
        }
        if(divClass3 == 'selectedO' && divClass6 == 'selectedO' && divClass9 == 'selectedO'){
            (gameBoard.squaresClass[2]).classList.add('winnerO');
            (gameBoard.squaresClass[5]).classList.add('winnerO');
            (gameBoard.squaresClass[8]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';
        }
        if(divClass1 == 'selectedO' && divClass5 == 'selectedO' && divClass9 == 'selectedO'){
            (gameBoard.squaresClass[0]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[8]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';
        }
        if(divClass3 == 'selectedO' && divClass5 == 'selectedO' && divClass7 == 'selectedO'){
            (gameBoard.squaresClass[2]).classList.add('winnerO');
            (gameBoard.squaresClass[4]).classList.add('winnerO');
            (gameBoard.squaresClass[6]).classList.add('winnerO');
            thereIsVictory = 'Yes';
            winner = 'winnerO';
        }
        
            /*Guardar espacios disponibles*/
            let availableSquare = [];
            gameBoard.squaresClass.forEach(square => {
                if(square.classList.length < 3){
                    availableSquare.push(square);
                }
            })
    
            /*Definir empate si no hay espacios ni ganador para minimax AI*/
            if(availableSquare.length == 0 && winner==null){
                winner = 'tie';
            }


        return thereIsVictory;
    };

    const victoryAI = () => {
        let divClass1 =  (gameBoard.squaresClass[0]).classList[2];
        let divClass2 =  (gameBoard.squaresClass[1]).classList[2];
        let divClass3 =  (gameBoard.squaresClass[2]).classList[2];
        let divClass4 =  (gameBoard.squaresClass[3]).classList[2];
        let divClass5 =  (gameBoard.squaresClass[4]).classList[2];
        let divClass6 =  (gameBoard.squaresClass[5]).classList[2];
        let divClass7 =  (gameBoard.squaresClass[6]).classList[2];
        let divClass8 =  (gameBoard.squaresClass[7]).classList[2];
        let divClass9 =  (gameBoard.squaresClass[8]).classList[2];
        let boardClassesArray = [[divClass1,divClass2,divClass3],
                                 [divClass4,divClass5,divClass6],
                                 [divClass7,divClass8,divClass9]]
/*
        for(i=0; i<=2; i ++){
            
            if(boardClassesArray[0][0]=='selectedX' || boardClassesArray[0][0]=='selectedO'){
                if(boardClassesArray[i][0]==boardClassesArray[i][1] && boardClassesArray[i][1]==boardClassesArray[i][2]){
                    winner = boardClassesArray[i][0];
                    thereIsVictory = 'Yes';
                    if(boardClassesArray[i][0]=='selectedX'){
                        (gameBoard.squaresClass[0]).classList.add('winnerX');
                        (gameBoard.squaresClass[1]).classList.add('winnerX');
                        (gameBoard.squaresClass[2]).classList.add('winnerX');
                    } else{
                        (gameBoard.squaresClass[3]).classList.add('winnerO');
                        (gameBoard.squaresClass[4]).classList.add('winnerO');
                        (gameBoard.squaresClass[5]).classList.add('winnerO');
                    }
                    break;
                }
            }
            
        }*/
        winner = null;

        if(divClass1 == 'selectedX' && divClass2 == 'selectedX' && divClass3 == 'selectedX'){
            winner = 'winnerX';

        };
        if(divClass4 == 'selectedX' && divClass5 == 'selectedX' && divClass6 == 'selectedX'){
            winner = 'winnerX';
        }
        if(divClass7 == 'selectedX' && divClass8 == 'selectedX' && divClass9 == 'selectedX'){
            winner = 'winnerX';
        }
        if(divClass1 == 'selectedX' && divClass4 == 'selectedX' && divClass7 == 'selectedX'){
            winner = 'winnerX';
        }
        if(divClass2 == 'selectedX' && divClass5 == 'selectedX' && divClass8 == 'selectedX'){
            winner = 'winnerX';
        }
        if(divClass3 == 'selectedX' && divClass6 == 'selectedX' && divClass9 == 'selectedX'){
            winner = 'winnerX';
        }
        if(divClass1 == 'selectedX' && divClass5 == 'selectedX' && divClass9 == 'selectedX'){
            winner = 'winnerX';
        }
        if(divClass3 == 'selectedX' && divClass5 == 'selectedX' && divClass7 == 'selectedX'){
            winner = 'winnerX';
        }
        
        if(divClass1 == 'selectedO' && divClass2 == 'selectedO' && divClass3 == 'selectedO'){
            winner = 'winnerO';

        };
        if(divClass4 == 'selectedO' && divClass5 == 'selectedO' && divClass6 == 'selectedO'){
            winner = 'winnerO';
        }
        if(divClass7 == 'selectedO' && divClass8 == 'selectedO' && divClass9 == 'selectedO'){
            winner = 'winnerO';
        }
        if(divClass1 == 'selectedO' && divClass4 == 'selectedO' && divClass7 == 'selectedO'){
            winner = 'winnerO';
        }
        if(divClass2 == 'selectedO' && divClass5 == 'selectedO' && divClass8 == 'selectedO'){
            winner = 'winnerO';
        }
        if(divClass3 == 'selectedO' && divClass6 == 'selectedO' && divClass9 == 'selectedO'){
            winner = 'winnerO';
        }
        if(divClass1 == 'selectedO' && divClass5 == 'selectedO' && divClass9 == 'selectedO'){
            winner = 'winnerO';
        }
        if(divClass3 == 'selectedO' && divClass5 == 'selectedO' && divClass7 == 'selectedO'){
            winner = 'winnerO';
        }
        
            /*Guardar espacios disponibles*/
            let availableSquare = [];
            gameBoard.squaresClass.forEach(square => {
                if(square.classList.length < 3){
                    availableSquare.push(square);
                }
            })
    
            /*Definir empate si no hay espacios ni ganador para minimax AI*/
            if(availableSquare.length == 0 && winner==null){
                winner = 'tie';
            }
            return winner;
        }
    return {playerToPlay, victory, assignWinner, Draw, reset, ai,assignWinnerAI, victoryAI};
};

/*--------------------------  Event Listeners ----------------------*/
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

