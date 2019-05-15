import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class MenuIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: null,
        }

        this._onClick = this._onClick.bind(this)
    }

    componentDidMount(){
        const {data} = this.props
        let index = {}
        data.forEach(element => {
            if(element.node.title){
                const firstCharTitle = element.node.title.charAt(0)
                let arr = index[firstCharTitle]
                if(arr){
                    arr.push(element.node)
                }else{
                    arr = [element.node]
                }
                index[firstCharTitle] = arr
            }
            
        });
  
        index = Object.keys(index).sort().reduce((r, k) => (r[k] = index[k], r), {});
        this.setState({
            index: index
        })
    }
    
    _renderIndexListLetter(key){
        const {index} = this.state
        const ul = index[key].map( (item, _key) => {
            return (
                <li 
                key={key}
                onClick={() => this._onClick(item.slug)}>
                    <div>{item.title}</div>
                    {item.subtitle &&
                        <div>{item.subtitle}</div>
                    }
                </li>
            )
        })
        return ul;
    }

    _onClick(slug){
        if(slug){
            const tile = document.getElementById(slug)
            PubSub.publish('TILE', {tile: tile})
         
            PubSub.publish('MENU', {open: false})
        }
    }

    render() {
        const {index} = this.state
        
        if(index == null){
            return('loading ...')
        }
        //const k = "T"
        //console.log(index)
        return (
            <div className="menu-index fxs">
                {Object.keys(index).map((key, index) => (
                    <div key={key} className="index-item">
                        <div className="index">{key}</div>
                        <ul>
                            {this._renderIndexListLetter(key)}
                            {/* {index[key].map( (item, _key) => (
                                    <li key={key}>{item.title}</li>
                            ))} */}
                        </ul>
                    </div>
                ))}
            
            </div>
        );
    }
}

export default MenuIndex;