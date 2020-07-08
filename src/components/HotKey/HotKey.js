import React ,{ Component } from 'react';
import { getHotKey } from '../../api/search';
import Loading from '../loading/loading';
import './HotKey.less';
class HotKey extends Component{
    constructor( props ){
        super(props);
        this.state = {
            isLoading:true
        }
    }
    componentDidMount(){
        this._getHotKey();
    }
    _getHotKey(){
        getHotKey().then((res)=>{
            let TempHotKeyList=res.data.hotkey ;
            TempHotKeyList= TempHotKeyList.length>15?TempHotKeyList.slice(0,14):TempHotKeyList;
            this.setState({
                HotKeyList:TempHotKeyList,
                isLoading :false
            })
        })
    }
    _setProps=(name)=>{
        this.props.changeProps(name);
        // let SearchHistory = store.getState().SearchHistory;
        // if(SearchHistory.length>0){
        //   SearchHistory.forEach((item)=>{
        //           if( item.name !== name){
        //             console.log("=====hotkey===========")
        //               SearchHistory.push({'name':name })
        //               return
        //           }
        //   })
        // }else{
        //   SearchHistory.push({'name':name })
        // }

        // this.props.SetSearchHistory(SearchHistory)
    }
    render(){
        return(
            <div className='hotKeyCon'>
                <h3>热门搜索</h3>
                {
                    this.state.isLoading
                    ?<Loading/>
                    :this.state.HotKeyList.map(( item ,index )=>{
                        return <span 
                        className='hotKeySpan'
                         key= { item.n }
                         onClick={()=>{ this._setProps(item.k)}}
                         > { item.k }</span>
                    })
                }
            </div>
        )
    }
}
export default HotKey;