import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playState: '',
            video: '',
            youtubeID: ''
        }

        this._handleVideo = this._handleVideo.bind(this)
    }

    _handleVideo(){
        const {data} = this.props

        PubSub.publish("MODAL", {
            status: true,
            video: data.video
        })
    }

    render() {
        const {data} = this.props
        const {playState} = this.state
        console.log(data)
        return (
            <div className={"ui-media video-"+playState}>
                {data.image !== null &&
                    <div 
                    className="cover"
                    style={{backgroundImage: 'url('+data.image.fluid.src+')'}}></div>
                }
                <div className="gradient-overlay"></div>

                {data.video !== "" &&
                    <div 
                    className="btn btn-small btn-video btn-white" 
                    onClick={this._handleVideo}>PLAY</div>
                }

                <div className="bottom fs ">
                    <div className="inner">
                        {data.title !== "" &&
                            <div className="title">{data.title}</div>
                        }
                    </div>
                </div>
                
                
                
            </div>
        );
    }
}

export default Media;