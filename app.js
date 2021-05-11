
const GameBoard = (() => {
    var boardElement = document.querySelector('.board')
    var board = ['X', 'X', 'O', 'X', '', 'X', 'X', 'O', '',]
    //set up grid for html
    const init = (function(){
        //

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



const createPlayer = ({playerName, symbol}) => ({
    playerName,
    symbol,
    setAttributes (playerName, symbol){
        this.playerName = playerName
        this.symbol = symbol
        return this
    }
})