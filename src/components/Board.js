import React from 'react';
import {Cell} from './Cell';
import {generateBoard} from '../tools/boardGeneration';
import {getNewBoard} from '../tools/zerosDFS';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: generateBoard(10,10,10)
        }
        this.revealCell = this.revealCell.bind(this);
        this.disactivateCell = this.disactivateCell.bind(this);
    }


    revealCell(cellRow,cellCol){
        let cellProps = this.state.board[cellRow][cellCol];
        if (!cellProps.disactivated){
            let newBoard = this.state.board.map((row,i)=> row.map((cell,j)=>{
                return (i===cellRow && j===cellCol) ? {...cell,revealed:true} : cell
            }))

            if (cellProps.neighbours === 0 && !cellProps.isBomb)
                newBoard = getNewBoard(this.state.board,cellRow,cellCol);

            this.setState({board:newBoard});
        }
    }

    disactivateCell(cellRow,cellCol){
        let cellProps = this.state.board[cellRow][cellCol];
        if (!cellProps.revealed){
            let newBoard = this.state.board.map((row,i)=> row.map((cell,j)=>{
                return (i===cellRow && j===cellCol) ? {...cell,disactivated:!cellProps.disactivated } : cell
            }))
            this.setState({board:newBoard});
        }
    }


    render(){
        return (
        <table>
            { this.state.board.map( (row,cellRow) =>
                <tr>{
                row.map((cellProps,cellCol) => (<td>
                    <Cell cellStatus={cellProps} onLeftClick={()=>this.revealCell(cellRow,cellCol)} 
                    onRightClick={()=>this.disactivateCell(cellRow,cellCol)} /> 
                    </td> )
                )}
                </tr>)
            }
        </table>
        )
    }
}

export {Board}