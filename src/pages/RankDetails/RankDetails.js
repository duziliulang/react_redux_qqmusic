//排行榜--歌曲列表页面
import React ,{ Component } from 'react';
import MusicList from '../../components/musicList';
import Loading from '../../components/loading/loading';
import { getMusicList } from '../../api/ranking';
import { createSong } from '../../common/song';
class RankDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            topId : this.props.match.params.id,
            isLoading:true
        };
    }
    componentDidMount(){
        this._getMusicList();
    }
    _getMusicList = ()=>{
        getMusicList(this.state.topId).then((res)=>{
            let  songList = this._normalizeSongs(res.songlist);
            this.setState({
                tittle:res.topinfo.ListName,
                songList:songList,
                isLoading:false
            })
        })
    }
    _normalizeSongs(list) {
        let arr=[];
        list.forEach((item)=>{
            let musicData=item.data;
            if(musicData.albummid&&musicData.songid){
                arr.push(createSong(musicData))
            }
        });
        return arr;
    }
    render(){
        return(
            <>
                {
                    this.state.isLoading
                    ?<Loading/>
                    :<MusicList tittle={ this.state.tittle } songList = { this.state.songList }/>
                }
            </>
            
        )
    }
}
export default RankDetails;