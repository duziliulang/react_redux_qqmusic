import React , { Component } from 'react';
import { searchByKey } from '../../api/search';
import { player } from '../../api/song';
import { Empty } from 'antd';
import store from '../../store';
import './Suggest.less';
import { createSong } from '../../common/song';
class Suggest extends Component{
    constructor(props){
        super(props);
        this.state={
            inNull:true
        };
    }
    componentDidMount(){
        this._searchByKey(this.props.query)
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
          };
    }
    _searchByKey=(searchName)=>{
        if(searchName){
            searchByKey(searchName).then((res)=>{
                if(res.data.song.itemlist.length>0){
                    this.setState({
                        searchSongList : this.RecombinationList(res.data.song.itemlist),
                        inNull:false
                    })
                }
            })
        }
    }
    RecombinationList(list){
        let newList = [];
        list.forEach((musicData)=>{
            if(musicData.id&&musicData.docid){
                newList.push(createSong(musicData))
            }
        })
        return newList;
    }
    getSong=()=>{

    }
    setItem=(itemSong)=>{
        player(itemSong.mid).then((res)=>{
            let item =res.data.items[0];
            let url="";
                url = "http://dl.stream.qqmusic.qq.com/" + item.filename + "?vkey=" + item.vkey + "&guid=7661965632&uin=0&fromtag=66";
            let CurrentSong = itemSong;
            let playSong = Object.assign({}, {
                album: CurrentSong.album,
                duration: CurrentSong.duration,
                id: CurrentSong.id,
                image: CurrentSong.image,
                mid: CurrentSong.mid,
                Singer: CurrentSong.singer,
                songname: CurrentSong.songname,
                vid: CurrentSong.vid,
                url
              })
              if(store.getState().SongList.length===0){
                  let newSongList =  store.getState().SongList;
                  newSongList.push(playSong);
                  this.props.SetSongList(newSongList);
              }else{
                  let CurrentIndex = store.getState().CurrentIndex;
                  let newSongList =  store.getState().SongList;
                  newSongList.splice(CurrentIndex+1, 0, playSong);
                  this.props.SetSongList(newSongList);
                  this.props.SetCurrentIndex(CurrentIndex+1);
              }
              let SearchHistory = store.getState().SearchHistory;
              if(SearchHistory.length>0){
                if(JSON.stringify(SearchHistory).indexOf(itemSong.songname)===-1){
                    SearchHistory.push({'name':itemSong.songname})
                }
                
              }else{
                  console.log('数组长度为0直接添加')
                SearchHistory.push({'name':itemSong.songname })
              }

              this.props.SetSearchHistory(SearchHistory)
              this.props.SetCurrentSong(playSong);
              this.props.SetPlaying(true)
            //   this.PlayAudio();
        })
    }
    render(){
        return(
            <div>
                <ul className='searchSongUl'>
                    {
                        this.state.inNull
                        ?<Empty/>
                        :this.state.searchSongList.map((item,index)=>{
                            return <li 
                            key={ item.id }
                            onClick={ ()=>{this.setItem(item) }}
                            >{ item.songname+'/'+item.singer }</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default Suggest;
// 周杰伦