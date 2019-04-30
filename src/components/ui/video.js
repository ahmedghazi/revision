import React, { Component } from 'react';

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //playState: 'initial',
            embedUrl: ''
        }

        this._handleVideo = this._handleVideo.bind(this)
        this._play = this._play.bind(this)
        this._pause = this._pause.bind(this)
        this._onReady = this._onReady.bind(this)
    }

    componentDidMount(){
        const {url} = this.props
        if(url){
            let embedUrl
            const videoObj = this._parseVideo(url)
            if(videoObj.type === "youtube"){
                embedUrl = '//www.youtube.com/embed/' + videoObj.id + '?autoplay=1'
            }
            else if(videoObj.type === "vimeo"){
                embedUrl = '//www.youtube.com/embed/' + videoObj.id + '?autoplay=1'
            }
        
            this.setState({
                embedUrl: embedUrl,
                
            })
        }
        
    }

    _parseVideo(url){
        // - Supported YouTube URL formats:
        //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
        //   - http://youtu.be/My2FRPA3Gf8
        //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
        // - Supported Vimeo URL formats:
        //   - http://vimeo.com/25451551
        //   - http://player.vimeo.com/video/25451551
        // - Also supports relative URLs:
        //   - //player.vimeo.com/video/25451551
        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
        let type = '';
        if (RegExp.$3.indexOf('youtu') > -1) {
            type = 'youtube';
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
            type = 'vimeo';
        }

        return {
            type: type,
            id: RegExp.$6
        };
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
        const {url} = this.props
        const {embedUrl, playState} = this.state
        return (
            <div className="video">
                {playState !== "initial" && embedUrl &&
                    <iframe 
                    title='modal-iframe'
                    width="100%" 
                    height="100%" 
                    src={embedUrl}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen></iframe>
                    // <YouTube
                    //     videoId={videoID}
                    //     containerClassName='embed-wrap'
                    //     opts={{
                    //         height: '100%',
                    //         width: '100%',
                    //         playerVars: {
                    //             autoplay: 1,
                    //             controls: 0,
                    //             modestbranding: 0,
                    //             showinfo: 0,
                    //             rel: 0,
                    //             playsinline: 1
                    //         }    
                    //     }}
                    //     onReady={this._onReady}
                    // />
                }
                {/* <div 
                    className="btn btn-small btn-video btn-white" 
                    onClick={this._handleVideo}>{playState === "play" ? "PAUSE" : "PLAY"}</div> */}
                    <div className="url">
                        <div className=" fxs gradient-texte gradient-texte--dark">{url}</div>
                    </div>
            </div>
        );
    }
}

export default Video;