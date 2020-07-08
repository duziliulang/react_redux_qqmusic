// 歌手--歌手作品页面
import React ,{ Component } from 'react';
import { getSingerDetail } from '../../api/singer';
import MusicList from '../../components/musicList';
import Loading from '../../components/loading/loading';
import { createSong } from '../../common/song';
// import store from '../../store';
// import  { IndexActionCreators } from '../../actions/idnex.js';
class singerDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            singerId : this.props.match.params.id,
            isLoading:true
        }
    }
    componentDidMount(){
        this._getSingerDetail();
    }
    _getSingerDetail(){
        getSingerDetail(this.state.singerId).then((res)=>{
           
            let songList = this._normalizeSongs(res.data.list) 
            this.setState({
                tittle:res.data.singer_name,
                songList,
                isLoading:false
            })
        })
    }
    _normalizeSongs(list) {
        let arr=[];
        list.forEach((item)=>{
            let musicData=item.musicData;
            if(musicData.albummid&&musicData.songid){
                arr.push(createSong(musicData))
            }
        });
        return arr;
    }
    // selectItem(index){
    //     console.log('点击歌曲');
    //     console.log(index);
    //     store.dispatch(IndexActionCreators.SetCurrentIndex(index));
    // }
    render(){
        return(
            <>
                {
                     this.state.isLoading
                     ?<Loading/>
                     :<MusicList 
                     tittle={ this.state.tittle } 
                    //  selectItem ={ this.selectItem } 
                     songList = { this.state.songList }
                     />
                }
            </>
            
        )
    }
}
export default singerDetails;