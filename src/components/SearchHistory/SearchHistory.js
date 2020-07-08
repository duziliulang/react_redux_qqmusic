import React ,{ Component } from 'react';
// import { getHotKey } from '../../api/search';
import './SearchHistory.less';
import store from '../../store';
class SearchHistory extends Component{
    constructor( props ){
        super(props);
        this.state = {
            SearchList:store.getState().SearchHistory
        }
    }
    componentDidMount(){
        // this._getHotKey();
    }
    _setProps=(name)=>{
        this.props.changeProps(name);
    }
    render(){
        return(
            <div className='hotKeyCon'>
                <h3>历史搜索</h3>
                {
                    this.state.SearchList.length>0
                    ?this.state.SearchList.map(( item ,index )=>{
                        return <span 
                        className='KeySpan' 
                        key= { index }
                        onClick={()=>{ this._setProps(item.name)}}
                        > { item.name }</span>
                    })
                    :<div>暂无搜索记录</div>
                }
            </div>
        )
    }
}
export default SearchHistory;