
const GameBoard = (() => {
    var boardElement = document.querySelector('.board')
    var board = ['', '', '', '', '', '', '', '', '',]
    //set up grid for html
    const init = (function(){
        //set up cells for the game
        for(let i = 0; i < 9; i++)
        {
            const gridCell = document.createElement('div')
            gridCell.id = `cell-${i}`
            gridCell.classList.add('cell', 'unactive-cell')
            gridCell.innerHTML = ""
            board.push(gridCell.innerHTML)
            boardElement.appendChild(gridCell)
        }
    })()
    //test function just for development
    function showBoardArray(){
        board.forEach(i => console.log(i))
    }

    //reset board to default settings
    function reset(){
        board = []
    }

    return {showBoardArray, board}

})()

const displayController = (() => {
    //render board from GameBoard into the webpage
    function render(board){
        for(let i = 0; i < 9; i++)
        {
            var cell = document.getElementById(`cell-${i}`)
            cell.innerHTML = board[i]
        }
    }
    render(GameBoard.board)
    return{render}
})()

function createPlayer(name, symbol){
    this.name = name
    this.symbol = symbol
    console.log(`Created Player: ${this.name}`)
    return{name, symbol}
    
}

const GameController = (() => {

    (function init(){
        //add event listeners to squares
        for(let i = 0; i < 9; i++){
            var cell = document.getElementById(`cell-${i}`)
            cell.addEventListener('click', placeLogic)
        }


    })()

    var player1 = createPlayer("Daniel", "X")
    var player2 = createPlayer("Jordy", "O")

    //used to pass index from the init in game controller to placing piece
    function placeLogic(){
        var index = indexFromId(this.id)
        console.log(index)
        placePiece(player1, GameBoard.board, index)
    }

    //grabs index from html-id
    function indexFromId(id){
            var index
        switch(id){
            case 'cell-0':
                index = 0
                break;
            case 'cell-1':
                index = 1
                break;
            case 'cell-2':
                index = 2
                break;
            case 'cell-3':
                index = 3
                break;
            case 'cell-4':
                index = 4
                break;
            case 'cell-5':
                index = 5
                break;
            case 'cell-6':
                index = 6
                break;
            case 'cell-7':
                index = 7
                break;
            case 'cell-8':
                index = 8
                break;
        }
        return index
    }


    //places piece and renders board
    function placePiece(player, board, index){
        console.log(player.symbol)
        board[index] = `${player.symbol}`
        displayController.render(GameBoard.board)
    }

    function checkWin(board){

    }
})()
