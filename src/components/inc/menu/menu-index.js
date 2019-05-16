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

        PubSub.subscribe("MENU_HOVER_OUT", (e,d) => {
            const items = document.querySelectorAll(".menu-index")
            items.forEach(element => {
                element.classList.remove("inactive")
            })
        })

        PubSub.subscribe("MENU_HOVER_IN", (e,d) => {
            const slug = d.slug
            const items = document.querySelectorAll(".menu-index")
            //console.log(items)
            items.forEach(element => {
                element.classList.add("inactive")
            })
            if(document.querySelector(".menu-index[data-slug="+slug+"]"))
                document.querySelector(".menu-index[data-slug="+slug+"]").classList.remove("inactive")
        })
    }
    
    _menuMouseEnter(slug){
        PubSub.publish('MENU_HOVER_IN', {slug: slug})
    }

    _menuMouseLeave(){
        PubSub.publish('MENU_HOVER_OUT')
    }

    _renderIndexListLetter(key){
        const {index} = this.state
        const ul = index[key].map( (item, _key) => {
            return (
                <li 
                className="menu-index fxs"
                key={key}
                onClick={() => this._onClick(item.slug)}
                onMouseEnter={() => this._menuMouseEnter(item.slug)}
                onMouseLeave={() => this._menuMouseLeave()}
                data-slug={item.slug}
                >
                    <h3 className="fxs">{item.title}</h3>
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
            <div className="menu-index fs">
                <h2 className="fs">INDEX</h2>
                {Object.keys(index).map((key, index) => (
                    <div key={key} className="index-item">
                        <div className="index fs">{key}</div>
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