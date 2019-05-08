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

export {listNeighbours};