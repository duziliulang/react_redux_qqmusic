import React , { Component } from 'react';
import { Input } from 'antd';
import './SearchBox.less';
class SearchBox extends Component{
    componentDidMount(){

    }
    inpuValueChange=(event)=>{
        this.props.InputQuery(event.target.value)
    }
    render(){
        return  <div className='searchInputCon'>
                <Input  placeholder="请输入搜索内容" onChange = { this.inpuValueChange }/>
            </div>
    }
}
export default SearchBox;