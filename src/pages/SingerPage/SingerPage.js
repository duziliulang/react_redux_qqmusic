// 歌手列表页面
import React , { Component } from 'react';
import SingerView from '../../components/singerView/singerView';
import Loading from '../../components/loading/loading';
import { getSingerList } from '../../api/singer';
import Singer from '../../common/singer';


class SingerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            LetterList:[]
        };
    }
    componentDidMount(){
        this._getSingerList();
    }
    _getSingerList=()=>{
        getSingerList().then((res)=>{
            this.setState({
                singerList:this.ResetSingerList(res.data.list),
                isLoading:false
            })
        })
    }
    ResetSingerList=(list)=>{
        const HotSingerLen = 10;
        const singerHotTittle='热门';
        let mapSinger = {
            hot :{
                tittle : singerHotTittle,
                items:[]
            }
        }
        list.forEach(( item , index )=>{
            if( index < HotSingerLen ){
                mapSinger.hot.items.push(new Singer({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            }
            let LetterKey = item.Findex;
            if(!mapSinger[LetterKey]){
                mapSinger[LetterKey]={
                    tittle:LetterKey,
                    items:[]
                }
            }
            mapSinger[LetterKey].items.push(new Singer({
                name: item.Fsinger_name,
                id: item.Fsinger_mid
            }))
        });
        let retList = [];
        let hotList = [];
        for(let key in mapSinger){
            let item = mapSinger[key];
            if(item.tittle.match(/[a-zA-Z]/)){
                retList.push(item)
            }else if(item.tittle.match(/[\u4e00-\u9fa5]/)){
                hotList.push(item)   
            }
        }
        
        retList.sort(function(a, b) {
            return a.tittle.charCodeAt(0) - b.tittle.charCodeAt(0);
        });

        // 取字母右侧滑动用
        let arr = hotList.concat(retList);
        for( let i = 0 ; i <arr.length ; i ++ ){
            if( arr[i].tittle.match(/[\u4e00-\u9fa5]/) ){
                this.state.LetterList.push(arr[i].tittle.substr(0,1));
            }else{
                this.state.LetterList.push(arr[i].tittle);
            }
        }
        return arr;
    }
    render(){
        return(
            <>
                {
                    this.state.isLoading
                    ? <Loading/>
                    : <SingerView singerList={ this.state.singerList } LetterList = { this.state.LetterList}  history={this.props.history}/>
                }           
            </>
        )
    }
}
export default SingerPage;