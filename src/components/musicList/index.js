import { connect } from 'react-redux';
import  { IndexActionCreators ,SongListActionCreators ,CurrentSongActionCreators} from '../../actions/idnex.js';
import musicList from './musiclist';
// 映射Redux全局的state到组件的props上
  function mapStateToProps(state){
     return  state
  }
  // 映射dispatch到props上
  const mapDispatchToProps = (dispatch) => ({
    selectItem:(index,songList)=>{
        dispatch(IndexActionCreators.SetCurrentIndex(index));
        dispatch(SongListActionCreators.SetSongList(songList))
        // dispatch(CurrentSongActionCreators.SetCurrentSong(songList[index]));
    },
    SetCurrentSong:(song)=>{
      dispatch(CurrentSongActionCreators.SetCurrentSong(song));
    }
  })
  
  // 将UI组件包装成容器组件
  export default connect(mapStateToProps, mapDispatchToProps)(musicList)