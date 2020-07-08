// 排行榜页面
import React ,{ Component } from 'react';
import { getTopList } from '../../api/ranking';
import { Row, Col } from 'antd';
import Ptxt from '../../components/Ptxt';
import Loading from '../../components/loading/loading';
import './Ranking.less'
class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true
        }
      }
    componentDidMount(){
        this._getTopList();
    }
    _getTopList = ()=>{
        getTopList().then(res=>{
            this.setState({
                topList:res.data.topList,
                isLoading:false
            })
        })
    }
    render(){
        let  topList = this.state.topList;
        return(
            <div className='rankCon'>
                    {
                        this.state.isLoading
                        ?<Loading/>
                        :topList.map((item, index) => {
                            return   <div key={item.id} className='rankItem' onClick={()=>{
                                   this.props.history.push('/ranking/'+item.id)
                            }}>
                                <Row>
                                    <Col span={16}>
                                        <h3>{item.topTitle}</h3>
                                        <Ptxt songList = { item.songList}/>
                                    </Col>
                                    <Col span={8}>
                                        <img className='rankImg' src={item.picUrl} alt={item.id}/>
                                    </Col>
                                </Row>
                            </div>
                        })
                    }
            </div>
        )
    }
}
export default Ranking;