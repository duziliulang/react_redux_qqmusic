import React , { Component } from 'react';
import './singerTel.less';
class singerTel extends Component{
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount(){
    }
    selectSinger=(singer)=>{
        this.props.selectSinger(singer)
    }
    render(){
        let singerObj = this.props.singerObj;
        return(
            <>
                {
                    singerObj.items.map(( item , index )=>{
                      return  <div className='singerList' key={ item.id } onClick={()=>{
                          this.selectSinger(item)
                      }}>
                          <span className='singerPicSpan'> <img src={ item.avatar } alt=""/></span>
                          <span> { item.name }</span>
                      </div>
                    })
                }
            </>
        )
    }
}
export default singerTel;