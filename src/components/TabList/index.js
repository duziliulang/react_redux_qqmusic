import React , { Component } from 'react';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom'
import './index.less';
class TabList extends Component{
    render(){
        return (
            <div className='tabListCon'>
                <Row>
                    <Col span={6}><NavLink exact to="/recommend" activeClassName="active">推荐</NavLink></Col>
                    <Col span={6}><NavLink exact to="/singerPage" >歌手</NavLink></Col>
                    <Col span={6}><NavLink exact to="/ranking" >排行榜</NavLink></Col>
                    <Col span={6}><NavLink exact to="/search" >搜索</NavLink></Col>
                </Row>
            </div>
        )
    }
}
export default TabList;