import React, { Component } from 'react';

class MenuIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: null,
        }
    }

    componentDidMount(){
        const {data} = this.props
        let index = {}
        data.forEach(element => {
            if(element.node.title){
                const firstChar = element.node.title.charAt(0)
                let arr = index[firstChar]
                if(arr){
                    arr.push(element.node)
                }else{
                    arr = [element.node]
                }
                index[firstChar] = arr
                
            }
            
        });
        //console.log(index)
        this.setState({
            index: index
        })
    }
    render() {
        const {index} = this.state
        //const {data} = this.props
        console.log(index)
        if(index == null){
            return('loading ...')
        }
        return (
            <div className="index fs">
                Index
            </div>
        );
    }
}

export default MenuIndex;