import React from 'react'

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isRevealed: false,
            isDesactivated: false
        }
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    handleLeftClick(event){
        if (event.type === 'click') {
            this.setState({isRevealed: true});
          }
    }

    handleRightClick(event){
        event.preventDefault();
        this.setState({isDesactivated: true});
    }

    render(){
        return (
            <div onClick= {this.handleLeftClick} onContextMenu= {this.handleRightClick}> 
                {this.state.isRevealed ?
                (this.props.isBomb ? "X" : this.props.neighbours) 
                : (this.state.isDesactivated? "D": "O")
            }
            </div> 
        )
    }
}

export {Cell}