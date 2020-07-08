// 搜索页面
import React , { Component } from 'react';
import HotKey from '../../components/HotKey';
import SearchHistory from '../../components/SearchHistory';
// import SearchBox from '../../components/SearchBox/SearchBox';
import './Search.less';
import Suggest from '../../components/Suggest/index';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            query:''
        };
    }
    componentDidMount(){
    //    this.onChange()
    }
    inpuValue=(e)=>{
        this.setState({
            query:e.target.value
        })
    }
    setProps=(name)=>{
        this.refs.input.value=name;
        this.setState({
            query:name
        })
    }
    focus=()=>{
        this.props.SetMiniClass('mini-player focus')
    }
    blur=()=>{
        this.props.SetMiniClass('mini-player')
    }
    render(){
        return(
            < >
                <div className='searchInputCon'>
                    <input type="text" 
                    onKeyUp = {this.inpuValue} ref='input' 
                    onFocus = { this.focus }
                    onBlur = { this.blur }
                    />
                </div>
                <>
                    {
                         this.state.query
                         ? null
                         :<HotKey changeProps={this.setProps} />
                    }
                </>
                <div >
                    {
                         this.state.query
                         ? null
                         :<SearchHistory changeProps={this.setProps} />
                    }
                </div>
                <div className='searchResult'>
                    {
                        this.state.query
                        ? <Suggest query={ this.state.query } /> 
                        :null
                    }
                </div>
            </>
        )
    }
}
export default Search;