
const GameBoard = (() => {
    var boardElement = document.querySelector('.board')
    var board = ['', '', '', '', '', '', '', '', '']
    //set up grid for html
    const init = (function(){
        //set up cells for the game
        for(let i = 0; i < 9; i++)
        {
            const gridCell = document.createElement('div')
            gridCell.id = `cell-${i}`
            gridCell.classList.add('cell', 'unactive-cell')
            gridCell.innerHTML = ""
            boardElement.appendChild(gridCell)
        }
    })()
    //test function just for development
    function showBoardArray(){
        board.forEach(i => console.log(i))
    }

    //reset board to default settings
    function reset(){
        for(let i = 0; i < 9; i++){
            board[i] = ''
            var cell = document.getElementById(`cell-${i}`)
            if(cell.classList.contains('active-cell')){
                cell.classList.remove('active-cell')
                cell.classList.add('unactive-cell')
            }
        }
        GameController.reset(currentPlayer)
        displayController.render(board)
    }

    return {showBoardArray, board, reset}

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

//create player object
function createPlayer(name, symbol){
    this.name = name
    this.symbol = symbol
    //console.log(`Created Player: ${this.name}`)
    return{name, symbol}
    
}

const GameController = (() => {

    (function init(){
        //add event listeners to squares
        for(let i = 0; i < 9; i++){
            var cell = document.getElementById(`cell-${i}`)
            cell.addEventListener('click', placeLogic)
        }

        //wire reset button
        var resetButton = document.getElementById('reset-btn')
        resetButton.addEventListener('click', GameBoard.reset)

    })()

    var player1 = createPlayer("Daniel", "X")
    var player2 = createPlayer("Jordy", "O")
    var currentPlayer = player1

    //used to pass index from the init in game controller to placing piece
    function placeLogic(){
        var index = indexFromId(this.id)
        placePiece(currentPlayer, GameBoard.board, index)

        //check for win/tie
        checkWin(GameBoard.board, currentPlayer.symbol)

        //switch to other player
        currentPlayer = switchTurn(currentPlayer)
    }

    function switchTurn(){
        if(currentPlayer == player1){
            return player2
        }
        else{
            return player1
        }
    }

    function reset(currentPlayer){
        currentPlayer = player1
        return currentPlayer
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
        var cell = document.getElementById(`cell-${index}`)
        if(board[index] == ''){
            cell.classList.remove('unactive-cell')
            cell.classList.add('active-cell')
            board[index] = `${player.symbol}`
            displayController.render(GameBoard.board)
            checkWin(board, player)
        }
    }

    function checkWin(board, player){
        var flag = false
        var symbol = player.symbol
        //check horizontal
        if(
            ((symbol === board[0]) && (board[0] == board[1]) && (board[1] === board[2])) || 
            ((symbol === board[3]) && (board[3] == board[4]) && (board[4] === board[5])) ||
            ((symbol === board[6]) && (board[6] == board[7]) && (board[7] === board[8]))){
                flag = true
            }
        //check vertical
        if(
            ((symbol === board[0]) && (board[0] == board[3]) && (board[3] === board[6])) || 
            ((symbol === board[1]) && (board[1] == board[4]) && (board[4] === board[7])) ||
            ((symbol === board[2]) && (board[2] == board[5]) && (board[5] === board[8]))){
                flag = true
            }
        //check diagonal
        if(
            ((symbol === board[0]) && (board[0] == board[4]) && (board[4] === board[8])) || 
            ((symbol === board[2]) && (board[2] == board[4]) && (board[4] === board[6]))){
                flag = true
            }

        if(flag == true){
            alert(`${player.name} has won! Congrats!`)
            GameBoard.reset()
        }
    }

    function logBoard(board){
        console.log(
            `${board[0]} | ${board[1]} | ${board[2]}\n
            ${board[3]} | ${board[4]} | ${board[5]}\n
            ${board[6]} | ${board[7]} | ${board[8]}
            `
        )
    }

    return{reset}
})()
