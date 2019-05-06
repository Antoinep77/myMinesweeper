import React from 'react';
import {Cell} from './Cell';
import {generateBoard} from '../tools/boardGeneration'

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: generateBoard(10,10,20)
        }
    }
    render(){
        return (
        <table>
            { this.state.board.map( row =>
                <tr>{
                row.map(cellProps => <td><Cell {...cellProps} /></td> )
                }
                </tr>)
            }
        </table>
        )
    }
}

export {Board}