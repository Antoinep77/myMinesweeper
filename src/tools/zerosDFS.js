import {listNeighbours} from './listNeighbours';


// given the coordinates of one point with zero neigbours returned the new board with all reachables zeros revealed
let getNewBoard = (board,i,j) => {
    if (board[i][j].neighbours !==0)
        throw new Error("The starting point should have zero neighbours");

    var newBoard = board.map(row => row.map(item => item));
    let stack = [];
    stack.push([i,j]);
    newBoard[i][j].revealed =true;
    while (stack.length >0){
        var [k,l] = stack.pop();
        let currentCell = newBoard[k][l];

        if(currentCell.neighbours === 0){
            var neighbours = listNeighbours(k,l,board.length,board[0].length);
            for (let [i2,j2] of neighbours){
                if (!newBoard[i2][j2].revealed){
                    stack.push([i2,j2]);
                    newBoard[i2][j2].revealed =true
                }
            }
        }
    }
    return newBoard
}

export {getNewBoard};