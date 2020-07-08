import { connect } from 'react-redux';
import  { CurrentSongActionCreators , SongListActionCreators ,PlayingActionCreators,IndexActionCreators ,SearchHistroyActionCreators } from '../../actions/idnex.js';
import Suggest from './Suggest';
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    // song: state.song
  })
  
  // 映射dispatch到props上
  const mapDispatchToProps = (dispatch) => ({
    SetCurrentSong:(song)=>{
        dispatch(CurrentSongActionCreators.SetCurrentSong(song));
    },
    SetSongList:(list)=>{
      dispatch(SongListActionCreators.SetSongList(list))
    },
    SetPlaying:(flag)=>{
      dispatch(PlayingActionCreators.SetPlaying(flag))
    },
    SetCurrentIndex:(index)=>{
      dispatch(IndexActionCreators.SetCurrentIndex(index));
    },
    SetSearchHistory:(item)=>{
      dispatch(SearchHistroyActionCreators.SetSearchHistory(item));
    }
  })
  
  // 将UI组件包装成容器组件
  export default connect(mapStateToProps, mapDispatchToProps)(Suggest)