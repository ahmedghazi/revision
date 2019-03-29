import React from "react"

class Repeater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 20
        }
        
        //this._onScroll = this._onScroll.bind(this)
    }

    componentDidMount(){
        //const {length} = this.state
        //const items = Array.from(new Array(length),(val,index)=>index);
        
        // document.addEventListener("scroll", this._onScroll)
        // this._onScroll()

        this._tick()
    }

    _tick(){
        const scroller = this.refs.scroller;
        const {length} = this.state
        setInterval(() => {
            //let topPos = scroller.offsetTop + 10;
            //console.log(scroller.scrollTop + scroller.offsetHeight, scroller.scrollHeight)
            scroller.scrollTop += 1;
			// $(".scrollSide").animate({scrollTop:"+=10px"}, 100, function () {  
			// 	if(this.scrollTop + this.offsetHeight >= this.scrollHeight) {
			// 		var clone = $('.scrollSide').children('figure').eq(0).clone();
			// 		$('.scrollSide').append(clone);
			// 	}
            // });
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
                <div key={index}>{title}</div>
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
