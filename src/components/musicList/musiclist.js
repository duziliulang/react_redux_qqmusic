import React ,{ Component } from 'react';
import './index.less';
import { player } from '../../api/song';
import store from '../../store';
export default  class MusicList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            songList:[],
            unsubscribe:store.subscribe(() =>
                this.setState({
                    CurrentIndex:store.getState().CurrentIndex
                })
            )
        };
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{   //组件销毁前，返回空
            return;
          };
    }
    getSingerName=(singer=[])=>{
        let singerName = '';
        if(singer){
            singer.forEach((item)=>{
                singerName+=item.name;
            })
        }
        return singerName;
    }
    getSong=(CurrentSong)=>{
        player(CurrentSong.mid,CurrentSong).then((res)=>{
            let item =res.data.items[0];
            let url="";
              url = "http://dl.stream.qqmusic.qq.com/" + item.filename + "?vkey=" + item.vkey + "&guid=7661965632&uin=0&fromtag=66";
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
              this.props.SetCurrentSong(playSong);


        })
    }
    render(){
        const songList = this.props.songList;
        return(
            <div>
                <h1 className='songTittle'>{ this.props.tittle }</h1>
                <div>
                    <img className='bgImg' src={"http://y.gtimg.cn/music/photo_new/T003R300x300M000001Q9Gqh3nngXX.jpg"} alt=""/>
                </div>
                <div className='songInfoCon'>
                    {
                         songList.map((item,index)=>{
                            return <div 
                            className='songInfo' 
                            key={ item.id }
                            onClick= {
                                ()=>{
                                 
                                    this.getSong(this.props.songList[index]);
                                    setTimeout(()=>{
                                        this.props.selectItem (index,this.props.songList);
                                    },500)
                                 }} 
                            >
                                <p className='songName'>{item.songname}</p>
                                <p className='singerName'>{ item.singer+'  ·  '+item.album}</p>
                            </div>
                         })
                    }
                </div>
            </div>
        )
    }
}
