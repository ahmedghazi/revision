import React, { Component } from 'react';
import Video from './video';


class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playState: '',
            video: '',
            youtubeID: ''
        }
    }

    _play(){
        const {video} = this.props.data
        const {youtubeID, playState} = this.state
console.log("youtubeID",youtubeID)
        if(!youtubeID){
            const _youtubeID = this.youtube_parser(video)
            this.setState({
                youtubeID: _youtubeID,
                playState: 'play'
            } )
        }else{
            //if(playState === "play")
            this.setState({
                playState: playState === "play" ? "pause" : "play"
            } )
        }
    }

    render() {
        const {data} = this.props
        const {playState,youtubeID} = this.state
        //console.log(data)
        return (
            <div className={"ui-media video-"+playState}>
                <div 
                className="cover"
                style={{backgroundImage: 'url('+data.image.fluid.src+')'}}></div>

                <div className="gradient-overlay"></div>

                {data.video !== "" &&
                    <Video url={data.video} />    
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