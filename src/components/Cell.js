import React from 'react';
import bomb from '../images/bomb.jpeg';
import flag from '../images/flag.png';

class Cell extends React.Component{
    imagesMap = {
        bomb: <img class="cell" alt="bomb" src={bomb} />,
        flag: <img class="cell unrevealed" alt="flag" src={flag} />,
        default: <div class= "cell unrevealed"></div>,
        number: (neighbours) =>{
            if (neighbours===0)
                return <div class= "cell revealed"></div>
            if (neighbours===1)
                return <div class= "cell revealed green"><div class="center">{neighbours}</div></div>
            if (neighbours===2)
                return <div class= "cell revealed blue"><div class="center">{neighbours}</div></div>
            return <div class= "cell revealed red"><div class="center">{neighbours}</div></div>
        }
    }
    constructor(props){
        super(props);
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    handleLeftClick(event){
        if (event.type === 'click') {
            this.props.onLeftClick()
          }
    }

    handleRightClick(event){
        event.preventDefault();
        this.props.onRightClick();
    }

    render(){
        return (
            <div onClick= {this.handleLeftClick} onContextMenu= {this.handleRightClick}> 
                {this.props.cellStatus.revealed ?
                (this.props.cellStatus.isBomb ? this.imagesMap["bomb"] : this.imagesMap["number"](this.props.cellStatus.neighbours)) 
                : (this.props.cellStatus.disactivated?  this.imagesMap["flag"]:this.imagesMap["default"])
            }
            </div> 
        )
    }
}

export {Cell}