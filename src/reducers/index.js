import { combineReducers }  from 'redux';
import  * as types from '../actionTypes';
const  rootReaducer = combineReducers({
    CurrentIndex,
    SongList,
    Playing,
    FullScreen,
    CurrentSong,
    SearchHistory,
    MiniClass
    // SongList[CurrentIndex]
})

function  CurrentIndex(preState = 0 , action ){
    switch( action.type ){
        case  types.SET_CURRENTINDEX:
            return action.payload
        case  types.GET_CURRENTINDEX:
            return action.payload    
        default :
        return preState;
    }
}

function SongList(preState = [] , action ){
    switch( action.type ){
        case types.SET_SONGLIST:
            return action.payload
        default :
        return preState;
    }
}
function SearchHistory(preState = [] , action ){
    switch( action.type ){
        case types.SET_SEARCHHISTORY:
            return action.payload
        default :
        return preState;
    }
}
function Playing(preState = false,action){
    switch( action.type ){
        case types.SET_PLAYING:
            return action.payload
        default :
        return preState;
    }
}
function MiniClass(preState = 'mini-player',action){
    switch( action.type ){
        case types.SET_MINICLASS:
            return action.payload
        default :
        return preState;
    }
}
function FullScreen(preState = true , action ){
    switch (action.type){
        case types.SET_FULLSCREEN:
           return action.payload
           default :
           return preState;
    }
}

function CurrentSong(preState={},action){
    switch(action.type){
        case types.SET_CURRENTSONG:
            return action.payload
        // case types.GET_CURRENTSONG:
        //     return action.payload
        default :
        return preState;
    }
}
export default  rootReaducer;