import React from 'react'
import PubSub from 'pubsub-js';
import Video from './video';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            modalClass: 'hidden',
            isTouch: false
        }
        
        //this._afterChange = this._afterChange.bind(this)
    }

    componentDidMount(){
        if('ontouchstart' in window){
            this.setState({
                isTouch: true
            })
        }
        PubSub.subscribe('MODAL', (e,d) => {
            this.setState({
                video: d.video,
                modalClass: 'visible'
            })
            
            setTimeout(() => {                
                //this._update()
            }, 250)
        })

        document.querySelector(".modal .bg").addEventListener('click', evt => {
            this._close()
        });

        document.querySelector(".modal .close").addEventListener('click', evt => {
            this._close()
        });

        document.addEventListener('keyup', e => {
            const key = e.key || e.keyCode;
            switch(key){
                case "Escape":
                    this._close()
                break;

                default:
                break;
            }
            
        })
    }

    _close(){
        this.setState({
            modalClass: 'hidden',
            video: null
        })
    }

    

    render () {
        const { 
            modalClass, 
            video 
        } = this.state
        

        return (
            <div className={"modal "+modalClass} >
                <div className="bg"></div>
                <div className="inner">
                    {video != null &&
                        <Video url={video} />  
                    }
                </div>
                <div className="close fxs">CLOSE</div>
            </div>
        )
    }
}

export default Modal