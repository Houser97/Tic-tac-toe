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
    let putXorO = (e) => {      
        if(symbol === '+' && e.target.classList.length < 3){
                    e.target.classList.add('selectedX')
                    e.target.textContent='+';
                } else if(symbol === 'o' && e.target.classList.length < 3){
                    e.target.classList.add('selectedO')
                    e.target.textContent='o';
                }
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
            player1.putXorO(e);
            currentTurn += 1;
        } else {
            player2.putXorO(e);
            currentTurn = 1;
        } 
    };
    return {playerToPlay}
};


