import React from "react"

class Repeater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 20
        }        
    }

    componentDidMount(){
        this._tick()
    }

    _tick(){
        const scroller = this.refs.scroller;
        const {length} = this.state
        setInterval(() => {
            //console.log(scroller.scrollTop + scroller.offsetHeight, scroller.scrollHeight)
            scroller.scrollTop += 1;

            if(scroller.scrollTop + scroller.offsetHeight >= scroller.scrollHeight) {
                this.setState({
                    length: length + 20
                })
            }
		}, 50);
    }

    renderItems(){
        const {title} = this.props
        const {length} = this.state

        const arr = Array.from(new Array(length),(val,index)=>index);
        const items = arr.map(index => (
                <div 
                key={index}
                className='item blink' style={{
                    animationDelay: index+"00ms"
                }}>{title}</div>
        ))
        return items
    }

    render(){
        //const {menuClass} = this.state
        const {title} = this.props
        return(
            <div className="repeater" ref="scroller">
                {this.renderItems()}
            </div>
        )
    }
}

export default Repeater
