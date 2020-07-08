import { connect } from 'react-redux';
import  { IndexActionCreators ,PlayingActionCreators,FullScreenActionCreators ,CurrentSongActionCreators } from '../../actions/idnex.js';
import Player from './player';
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    // song: state.song
  })
  
  // 映射dispatch到props上
  const mapDispatchToProps = (dispatch) => ({
    SetPlaying:(flag)=>{
        dispatch(PlayingActionCreators.SetPlaying(flag))
    },
    SetCurrentIndex:(index)=>{
        dispatch(IndexActionCreators.SetCurrentIndex(index));
    },
    SetFullScreen:(flag)=>{
        dispatch(FullScreenActionCreators.SetFullScreen(flag))
    },
    SetCurrentSong:(song)=>{
        dispatch(CurrentSongActionCreators.SetCurrentSong(song));
    }

  })
  
  // 将UI组件包装成容器组件
  export default connect(mapStateToProps, mapDispatchToProps)(Player)