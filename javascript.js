function startGame() {
    let popUp = document.querySelector('.popUpWinner');
    
    popUp.classList.add('popUpWinner_open');
    return Game = newGame(1);
};

const gameBoard = ((doc) => {
    let squaresClass = [];
    
    for(i=1; i<10; i++){
        squaresClass.push(doc.querySelector('.square'+i));
    }

    squaresClass.forEach(square => square.addEventListener('click', (e)=>{
        thereIsVictory=Game.victory();
        if(thereIsVictory == 'No'){
            Game.playerToPlay(e);
        } 
        thereIsVictory=Game.victory();
    })
    );

    return{squaresClass};
   
})(document);

const Players = (name, symbol)=>{
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
    return {putXorO};
};

const player1 = Players('Houmser','+');
const player2 = Players('Rommco','o');

const startButton = document.querySelector('.start');
startButton.addEventListener('click', startGame);

const newGame = (currentTurn)=>{
    const getCurrentTurn = () => currentTurn;
    const playerToPlay = (e) => {
        if(currentTurn == 1) {
            currentTurn = player1.putXorO(e, currentTurn);
        } else if (currentTurn == 2){
            currentTurn = player2.putXorO(e, currentTurn);
        } 
    };

    

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

        let thereIsVictory = 'No';

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
    return {playerToPlay, victory};
};


