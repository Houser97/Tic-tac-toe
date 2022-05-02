const gameBoard = ((doc) => {
    let squaresClass = [];
    
    for(i=1; i<10; i++){
        squaresClass.push(doc.querySelector('.square'+i));
    }

    function putXorO(e) {
        e.target.classList.add('selected');
    };

    squaresClass.forEach(square => square.addEventListener('click', putXorO))

    console.log(squaresClass);
})(document);



