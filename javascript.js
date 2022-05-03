function startGame() {
    return Game = newGame(1);
};

const gameBoard = ((doc) => {
    let squaresClass = [];
    
    for(i=1; i<10; i++){
        squaresClass.push(doc.querySelector('.square'+i));
    }

    squaresClass.forEach(square => square.addEventListener('click', (e)=>{
        Game.playerToPlay(e);
    })
    );

    return{squaresClass};
   
})(document);

const Players = (name, symbol)=>{
    let putXorO = (e, currentTurn) => { 
        currentTurn += 1;     
        if(symbol === '+' && e.target.classList.length <= 2){
            e.target.classList.add('pivot')
            e.target.classList.add('selectedX')
            e.target.textContent='+';
        } else if(symbol === 'o' && e.target.classList.length <= 2){
            e.target.classList.add('pivot')
            let div = document.createElement('div');
            div.classList.add('pivot');
            div.classList.add('pivot1');
            div.classList.add('selectedO');
            e.target.appendChild(div);
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
    return {playerToPlay}
};


