
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
        GameController.reset()
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
    return{name, symbol}
    
}

function createBot(name, symbol){
    this.name = name
    this.symbol = symbol

    function score(board, player){
        if(GameController.checkWin(board, this) == 'X'){
            return 1
        }else if(GameController.checkWin(board, player) == 'O'){
            return -1
        }else if(GameController.checkTie(board) == true){
            return 0
        }else{
            return null
        }
    }

    function minimax(board, player, isMax = true){
        let moves = []
        let result = score(board, player)
        if(result !== null){
            return result
        }
        if(isMax == true){
            let bestScore = -1000.
            for(let i = 0; i < 9; i++){
                if(board[i] == ''){
                    board[i] = this.symbol
                    let score = minimax(board, player, false)
                    board[i] = ''
                    bestScore = Math.max(score, bestScore)
                }
            }
            return bestScore
        }
        if(isMax == false){
            let bestScore = 1000
            for(let i = 0; i < 9; i++){
                if(board[i] == ''){
                    board[i] = player.symbol
                    let score = minimax(board, player, true)
                    board[i] = ''
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore
        }
    }

    return {name, symbol, findMove}

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

    var aiGame = false
    var swapButton = document.getElementById('swap-btn')
    swapButton.addEventListener('click', swapPlayer)
    var player1 = createPlayer("Daniel", "X")
    var player2 = createPlayer("Jordy", "O")
    var currentPlayer = player1

    function swapPlayer(){
        GameBoard.reset()
        if(aiGame === false){
            swapButton.innerHTML = "Play vs Player"
            player1 = createBot('ProBot', 'X')
            currentPlayer = player1
            aiGame = true
            botPlaceLogic()
        }else{
            swapButton.innerHTML = "Play vs AI"
            player1 = createPlayer("Daniel", "X")
            currentPlayer = player1
            aiGame = false
        }
    }


    function botPlaceLogic(){
        move = player1.findMove(GameBoard.board, player2)
        //console.log(`player1: ${player1.name}, player2: ${player2.name}`)
        placePiece(player1, GameBoard.board, move)
        var win = checkWin(GameBoard.board, currentPlayer)
        if(win == 'X' || win == 'O'){
            alert(`${currentPlayer.name} has won! Congrats!`)
            GameBoard.reset()
        }
        if(win == null){
            var tie = checkTie(GameBoard.board)
            if(tie == true){
                    alert(`This game was a tie! Play again!`)
                    GameBoard.reset()
            }
        }
        //switch to other player
        if(win == null && tie == false){
            currentPlayer = switchTurn(currentPlayer)
        }
    }



    //used to pass index from the init in game controller to placing piece
    function placeLogic(){
        var index = indexFromId(this.id)
        placePiece(currentPlayer, GameBoard.board, index)

        //check for win/tie
        var win = checkWin(GameBoard.board, currentPlayer)
        if(win !== null){
            alert(`${currentPlayer.name} has won! Congrats!`)
            GameBoard.reset()
        }else{
            var tie = checkTie(GameBoard.board)
            if(tie == true){
                    alert(`This game was a tie! Play again!`)
                    GameBoard.reset()
            }
        }
        //switch to other player
        if(win == null && tie == false){
            currentPlayer = switchTurn(currentPlayer)
        }
        if(aiGame == true){
            botPlaceLogic()
        }
    }

    function switchTurn(){
        if(currentPlayer == player1){
            return player2
        }
        else{
            return player1
        }
    }

    function reset(){
        currentPlayer = player1
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
        }
    }

    function checkWin(board, player){
        var symbol = player.symbol
        //check horizontal
        if(
            ((symbol === board[0]) && (board[0] == board[1]) && (board[1] === board[2])) || 
            ((symbol === board[3]) && (board[3] == board[4]) && (board[4] === board[5])) ||
            ((symbol === board[6]) && (board[6] == board[7]) && (board[7] === board[8]))){
                return symbol
            }
        //check vertical
        else if(
            ((symbol === board[0]) && (board[0] == board[3]) && (board[3] === board[6])) || 
            ((symbol === board[1]) && (board[1] == board[4]) && (board[4] === board[7])) ||
            ((symbol === board[2]) && (board[2] == board[5]) && (board[5] === board[8]))){
                return symbol
            }
        //check diagonal
        else if(
            ((symbol === board[0]) && (board[0] == board[4]) && (board[4] === board[8])) || 
            ((symbol === board[2]) && (board[2] == board[4]) && (board[4] === board[6]))){
                return symbol
            }
        else{
            return null
        }

        
    }

    function checkTie(board){
            //check for tie
            let tie = true
            for(let i = 0; i < 9; i++){
                if(board[i] == ''){
                    tie = false
                }
            }
            
            return tie
    }


    return{reset, checkWin, checkTie}
})()
