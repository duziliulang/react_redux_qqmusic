import  * as types from '../actionTypes';
import store from '../store';
export const IndexActionCreators = {
    SetCurrentIndex(payload){
        return {
            type :types.SET_CURRENTINDEX,
            payload
        }
    },
    GetCurrentIndex(payload){
        console.log('----------payload--------');
        return {
            type :types.GET_CURRENTINDEX,
            payload
        }
    }
}

export const CurrentSongActionCreators={
    SetCurrentSong(payload){
        return {
            type :types.SET_CURRENTSONG,
            payload
        }
    }
}
export const SongListActionCreators = {
    SetSongList(payload){
        return {
            type :types.SET_SONGLIST,
            payload
        }
    }
}

export const SearchHistroyActionCreators = {
    SetSearchHistory(payload){
        return {
            type :types.SET_SEARCHHISTORY,
            payload
        }
    }
}

export const PlayingActionCreators = {
    SetPlaying(payload){
        return {
            type :types.SET_PLAYING,
            payload
        }
    }
}

export const MiniClassActionCreators = {
    SetMiniClass(payload){
        return {
            type :types.SET_MINICLASS,
            payload
        }
    }
}

export const FullScreenActionCreators = {
    SetFullScreen(payload){
        return {
            type :types.SET_FULLSCREEN,
            payload
        }
    }
}



export const CurrentSongAction= store.getState().SongList[store.getState().CurrentIndex]