import {listNeighbours} from './listNeighbours';

let randInt = (min,max) => Math.floor( (max-min)*Math.random() )


let generateBombs = (rows, cols, bombsNumber) => {
    if (2*bombsNumber > cols*rows ){
        throw new Error("Too many bombs for the board.")
    }
    let bombs = new Set();
    let bombList = [];
    while (bombs.size< bombsNumber){
        let bombIndex = [randInt(0,rows-1),randInt(0,cols-1)];
        let bombHash = bombIndex[0]+";"+bombIndex[1]
        if (!( bombs.has(bombHash))){
            bombs.add(bombHash);
            bombList.push(bombIndex);
        }
    }
    return bombList
}

let generateBoard = (rows,cols,bombsNumber) =>{
    var bombs = generateBombs(rows,cols,bombsNumber);
    var newCell = {isBomb:false, neighbours:0, revealed:false,disactivated:false}
    var board = new Array(rows).fill(null).map( () => new Array(cols).fill(null).map(()=> Object.assign({},newCell)));
    for (let [i,j] of bombs){
        board[i][j].isBomb = true;
        for(var [k,l] of listNeighbours(i,j,rows,cols)){
            board[k][l].neighbours += 1
        }
    }
    return board
}

export {generateBoard}