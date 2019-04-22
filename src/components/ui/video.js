import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playState: 'initial',
            video: '',
            youtubeID: ''
        }

        this._handleVideo = this._handleVideo.bind(this)
        this._play = this._play.bind(this)
        this._pause = this._pause.bind(this)
        this._onReady = this._onReady.bind(this)
    }

    componentDidMount(){
        const {url} = this.props
        const _youtubeID = this._youtube_parser(url)
        console.log(_youtubeID)
        this.setState({
            youtubeID: _youtubeID
        })
    }

    _handleVideo(){
        const {playState} = this.state
        if(playState === "initial"){
            this.setState({
                playState: 'play'
            })
        }else{
            if(playState === "play"){
                this._pause()
            }else{
                this._play()
            }
        }
    }

    _play(){
        const {video} = this.state
        video.playVideo()
        this.setState({
            playState: 'play'
        })
    }

    _pause(){
        const {video} = this.state
        video.pauseVideo()
        this.setState({
            playState: 'pause'
        })
    }
    
    _youtube_parser(url){
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
        const {youtubeID, playState} = this.state
        return (
            <div className="video">
                {playState !== "initial" &&
                    <YouTube
                        videoId={youtubeID}
                        containerClassName='embed-wrap'
                        opts={{
                            height: '100%',
                            width: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 0,
                                modestbranding: 0,
                                showinfo: 0,
                                rel: 0,
                                playsinline: 1
                            }    
                        }}
                        onReady={this._onReady}
                    />
                }
                <div 
                    className="btn btn-small btn-video btn-white" 
                    onClick={this._handleVideo}>{playState === "play" ? "PAUSE" : "PLAY"}</div>
            </div>
        );
    }
}

export default Video;