import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playState: '',
            video: '',
            youtubeID: ''
        }

        this._play = this._play.bind(this)
        this._onReady = this._onReady.bind(this)
        
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

    _pause(){
        const {video} = this.state
        
        this.setState({
            playState: 'pause'
        } )

        video.pauseVideo()
    }

    youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    }

    _onReady(event) {
        console.log(event)
        this.setState({
            video: event.target
        } )
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

                <div className="bottom fs ">
                    <div className="inner">
                        {data.title !== "" &&
                        <   div className="title">{data.title}</div>
                        }

                        {data.video !== "" &&
                            <div 
                            className="btn btn-small btn-video btn-white" 
                            onClick={this._play}>{playState === "play" ? "PAUSE" : "PLAY"}</div>
                        }
                    </div>
                </div>
                
                {playState === "play" &&
                    <YouTube
                        videoId={youtubeID}
                        containerClassName='embed-wrap'
                        opts={{
                            height: '100%',
                            width: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 0,
                                modestbranding: 1,
                                showinfo: 0,
                                rel: 0
                            }    
                        }}
                        onReady={this._onReady}
                    />
                    
                }
                
            </div>
        );
    }
}

export default Media;