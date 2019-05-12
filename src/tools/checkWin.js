const checkWin = (board,bombNumber) => {
    var numberOfcellsRevealed=board.reduce((prev,row)=>{
        return prev + row.reduce((prev,cell) => prev + 1*(!cell.isBomb && cell.revealed),0)
    },0)
    if ((board.length*board[0].length - bombNumber) !== numberOfcellsRevealed)
        return false
    //if win return the a new board fully revealed
    else {
        return board.map(row => row.map(cell => ({...cell, revealed:true})))
    }
}

export {checkWin}