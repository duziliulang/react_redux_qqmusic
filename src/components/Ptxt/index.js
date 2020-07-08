import React ,{ Component } from 'react';
import './index.less';
class Ptxt extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true
        }
      }
      render(){
          return (
              <ul>
                  {
                      this.props.songList.map((item,index)=>{
                        return <li key={index}>{item.songname}</li>
                      })
                  }
              </ul>
          )
      }
}
export default Ptxt;