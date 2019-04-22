import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverClass: '',
        }

        this._onMouseEnter = this._onMouseEnter.bind(this)
        this._onMouseLeave = this._onMouseLeave.bind(this)
    }

    componentDidMount() {
        const {hasSiblings} = this.props
        if(hasSiblings){
            PubSub.subscribe('PEOPLE_HOVER', (e, d) => {
                //console.log(e,d)
                let hoverClass = ''
                if(d.hover){
                    if(this.props.data.name != d.name){
                        hoverClass = 'sibling-is-hover'
                    }else{
                        hoverClass = 'is-hover'
                    }
                }else{
                    hoverClass = ''
                }
                
                this.setState({
                    hoverClass: hoverClass
                })
            })
        }
        
    }

    _onMouseEnter(){
        PubSub.publish('PEOPLE_HOVER', {
            hover: true,
            name:this.props.data.name
        })
    }

    _onMouseLeave(){
        PubSub.publish('PEOPLE_HOVER', {
            hover: false,
        })
    }
    
    render() {
        const {data} = this.props
        const {hoverClass} = this.state
//console.log(data)
        return (
            <div className={"people "+hoverClass} 
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}
            >
                <figure>
                    <img 
                    src={data.image.file.url+"?fit=thumb&f=center&h=40&w=40&r=20"} 
                    alt={data.image.file.fileName} />
                </figure>

                <div className="people-body fxs">
                    <div className="name fxs">{data.name}</div>
                    {data.info !== "" &&
                        <div className="info ">
                            {data.info}
                        </div>
                    }  
                </div>
                
            </div>
        );
    }
}

export default People;