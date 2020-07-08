import React, { Component } from 'react';
import { player } from '../../api/song';
import { Slider } from 'antd';
import './player.less'
import store from '../../store';
import iconprevImg from './prve.png';
import iconplayImg from './play.png';
import iconnextImg from './next.png';
import iconpauseImg from './pause.png';
import iconJiantouImg from './jiantou.png';
import iconplaylistImg from './listIcon.png';
let iconprev ={
    backgroundImage: `url(${iconprevImg})` 
}
let iconplay ={
    backgroundImage: `url(${iconplayImg})` 
}
let iconnext ={
    backgroundImage: `url(${iconnextImg})` 
}
let iconpause ={
    backgroundImage: `url(${iconpauseImg})` 
}
let iconJianTou ={
    backgroundImage: `url(${iconJiantouImg})` 
}
let iconplaylist = {
    backgroundImage: `url(${iconplaylistImg})` 
}
class Player extends Component {
    constructor( props ){
        super(props);
        this.state={
            dasharray:Math.PI * 44,
            dashoffset:0,
            CurrentTime:0,
            oldCurrentSong:'',
            currentSongmid:'',
            miniClass:"mini-player",
            CurrentSong:store.getState().CurrentSong,
            unsubscribe:store.subscribe(() =>
                this.setState({
                    CurrentIndex:store.getState().CurrentIndex,
                    Playing:store.getState().Playing,
                    SongList :store.getState().SongList,
                    songImg:this.state.CurrentSong.image,
                    FullScreen:store.getState().FullScreen,
                    CurrentSong:store.getState().CurrentSong,
                    miniClass:store.getState().MiniClass
                }
             )
            )
        }
    }
    getSong=()=>{
        player(store.getState().CurrentSong.mid).then((res)=>{
            let item =res.data.items[0];
            let url="";
              url = "http://dl.stream.qqmusic.qq.com/" + item.filename + "?vkey=" + item.vkey + "&guid=7661965632&uin=0&fromtag=66";
            let CurrentSong = store.getState().CurrentSong;
            let playSong = Object.assign({}, {
                album: CurrentSong.album,
                duration: CurrentSong.duration,
                id: CurrentSong.id,
                image: CurrentSong.image,
                mid: CurrentSong.mid,
                singer: CurrentSong.singer,
                songname: CurrentSong.songname,
                vid: CurrentSong.vid,
                url
              })
              console.log(playSong)
              this.props.SetCurrentSong(playSong);
              this.PlayAudio();

        })
    }
    componentDidUpdate(store){
    }
    componentWillUnmount(){
        this.state.unsubscribe()
    }
    componentDidMount(){
        this.refs.audio.addEventListener("canplay",()=>{
            this.PlayAudio();
        })
        if(this.state.CurrentSong.url){
            this.props.SetPlaying(true)
        }
        this.setState({
            bgmUrl : {backgroundImage:this.state.CurrentSong.image},
        })
        this.PlayAudio();
         
    }
    format(interval) {
        interval = interval | 0;
        const minute = interval / 60 | 0;
        const second = this._pad(interval % 60);
        return minute + " : " + second
    }
    _pad(num, n = 2) {
        let len = num.toString().length
        while(len < n) {
            num = '0' + num
            len++
        }
        return num
    }

    CurrentTimeChange(value){
        let tempTime = value/100 * this.state.CurrentSong.duration;
        this.setState({
            CurrentTime:tempTime
        })
    }
    updateTime=(e)=>{
        let tempTime =  this.state.CurrentTime;
        let tempDuration = this.state.CurrentSong.duration;
        this.setState({
            CurrentTime:e.target.currentTime,
            defaultValue:tempTime/tempDuration*100  //滑动条跟随播放进度移动使用
        },()=>{
            this.setState({
                dashoffset: ( 1- this.state.CurrentTime / this.state.CurrentSong.duration )*this.state.dasharray
            })
            if(parseInt(this.state.CurrentTime)===this.state.CurrentSong.duration){ //播放结束
                this.props.SetCurrentIndex(store.getState().CurrentIndex+1)
                return 
            }
        })
    }
    togglePlaying(){
        this.props.SetPlaying(!store.getState().Playing)
        this.PlayAudio();
    }
    PlayAudio(){
        let audio = this.refs.audio;
        store.getState().Playing?audio.play() : audio.pause();
    }
    prev(){
        let arrLen = this.state.SongList.length;
        let tempIndex=this.state.CurrentIndex===0?arrLen-1:this.state.CurrentIndex-1;
        this.props.SetCurrentIndex(tempIndex);
        this.props.SetPlaying(true)
        this.props.SetCurrentSong(this.state.SongList[tempIndex])
        this.getSong()
    }
    toggleFullScreen=()=>{
        this.props.SetFullScreen(!store.getState().FullScreen);
    }
    next(){
        let arrLen = this.state.SongList.length;
        let tempIndex=this.state.CurrentIndex===arrLen-1?0:this.state.CurrentIndex+1
        this.props.SetCurrentIndex(tempIndex);
        this.props.SetPlaying(true)
        this.props.SetCurrentSong(this.state.SongList[tempIndex])
        this.getSong()
    }
    render() {

        return (
            <div className='playerCon' ref='playerCon' >
                {
                    this.state.FullScreen
                    ? <div className='normal-player'>
                        <span className='back' onClick={this.toggleFullScreen} style = { iconJianTou }>
                        </span>
                        <div className='songBg'>
                            <img src={this.state.songImg} alt=""/>
                        </div>
                        <p className='tittle'>{ this.state.CurrentSong.songname }</p>
                        <p className='tittle'>{  this.state.CurrentSong.Singer  }</p>
                        <div className='middle'>
                            <div className='middle_l'>
                                <div className='cd-wrapper'>
                                    <div className='cd'>
                                        {/* <img  src={ this.state.CurrentSong.image.indexOf('undefined')===-1 ? this.state.CurrentSong.image : timgImg } alt=""/> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className="progress-wrapper">
                                <span className="time time-l">{ this.format(this.state.CurrentTime) }</span> 
                                <div className="progress-bar-wrapper">
                                    <Slider
                                    ref ='slider'
                                    tipFormatter={null}  
                                    onChange= {(value)=>{
                                        let that = this;
                                        let time = value/100*this.state.CurrentSong.duration;
                                        this.refs.audio.currentTime = time;
                                        that.CurrentTimeChange(value)
                                    }}
                                    value={ this.state.defaultValue }
                                    />
                                </div>
                                <span className="time time-r">{ this.format(this.state.CurrentSong.duration) }</span>
                            </div>
                            <div className="operators">
                                <div className="mus_icon i-left">
                                    <i className="icon-prev" style={ iconprev }
                                    onClick={()=>{
                                        this.prev();
                                    }}
                                    ></i>  
                                </div> 
                                <div className="mus_icon i-center">
                                    <i className="iconplay"  style={ store.getState().Playing?iconpause :iconplay}
                                    onClick={()=>{
                                        this.togglePlaying();
                                    }}
                                    ></i>
                                </div>
                                <div className="mus_icon i-right">
                                    <i className="icon-next"  style={ iconnext }
                                    onClick={()=>{
                                        this.next()
                                    }}
                                    ></i>
                                </div> 
                            </div>
                        </div>
                    </div>
                    :<div className={this.state.miniClass} >
                        <span className="icon" 
                            onClick={ this.toggleFullScreen }
                        >
                            <img  src={ this.state.CurrentSong.image } alt=''/>
                        </span>
                        <div className="text">
                            <h2 className="name" >{ this.state.CurrentSong.songname }</h2>
                            <p  className="desc" >{ this.state.CurrentSong.Singer }</p>
                        </div>
                          <div className="progress-circle">
                            <svg  style={{width:'40px',height:'40px' }} viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <circle className="progress-background" r="22" cx="25" cy="25" fill="transparent" />
                                <circle className="progress-bar" 
                                    r="22" cx="25" 
                                    cy="25" fill="transparent" 
                                    strokeDasharray ={ this.state.dasharray }
                                    strokeDashoffset={ this.state.dashoffset }
                                />
                            </svg>
                            <span className='miniPlayIcon' style={ store.getState().Playing?iconpause :iconplay}
                                onClick={()=>{
                                    this.togglePlaying();
                                }}
                            ></span>
                        </div>
                        <div className="control">
                            <i className="icon-playlist" style= { iconplaylist }></i>
                        </div>
                    </div>
                }
                <audio 
                    className='audio'
                    src={ store.getState().CurrentSong.url }
                    ref='audio'
                    onTimeUpdate={this.updateTime }
                ></audio>
            </div>
        )
    }
  }
  export default Player;