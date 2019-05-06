let randInt = (min,max) => Math.floor( (max-min)*Math.random() )


let generateBombs = (rows, cols, bombsNumber) => {
    if (bombsNumber > cols*rows){
        throw new Error("To many bombs for the board.")
    }
    let bombs = [];
    while (bombs.length< bombsNumber){
        let bombIndex = [randInt(0,rows-1),randInt(0,cols-1)];
        if (!(bombIndex in bombs)){
            bombs.push(bombIndex);
        }
    }
    return bombs
}

let listNeighbours = (i,j,rows,cols) =>{
    let listOfRows = [i];
    let listOfCols = [j];
    let listOfNeighbours = [];
    if (i>0)
        listOfRows.push(i-1);
    if (i<rows-1)
        listOfRows.push(i+1);
    if (j>0)
        listOfCols.push(j-1);
    if (j<cols-1)
        listOfCols.push(j+1);
    for (let i2 of listOfRows){
        for (let j2 of listOfCols){
            if (i2 !== i || j2 !== j)
                listOfNeighbours.push([i2,j2])
        }
    }
    return listOfNeighbours
}

let generateBoard = (rows,cols,bombsNumber) =>{
    var bombs = generateBombs(rows,cols,bombsNumber);
    var board = new Array(rows).fill(null).map( () => new Array(cols).fill(null).map(()=> ({isBomb:false, neighbours:0})));
    for (let [i,j] of bombs){
        console.log(board)
        board[i][j].isBomb = true;
        for(var [k,l] of listNeighbours(i,j,rows,cols)){
            board[k][l].neighbours += 1
        }
    }
    return board
}

export {generateBoard}