import React, { Component } from 'react';
import './index.less';
import LogoImg from './musicIcon.png';

let logoStyle ={
        backgroundImage: `url(${LogoImg})` 
    }
class Header extends Component {
    render() {
        return (
            <div className='header'>
                <span className='playIcon' style={ logoStyle }></span>
                <span>QQ音乐播放器</span>
            </div>
        )
    }
  }
  export default Header;