import React , { Component } from 'react';
import SingerTel from '../../components/singerTel/singerTel'
import './singerView.less';
import store from '../../store';
let currentIndex = 0;
 class singerView extends Component{
    constructor(props){
        super(props);
        this.state={
            currentIndex:0,
            LetterList:this.props.LetterList,
            fixedP:'',
            unsubscribe:store.subscribe(() =>
                this.setState({
                    CurrentIndex:store.getState().CurrentIndex
                })
            )
        };
    }
    componentWillUnmount(){
        // this.state.unsubscribe()
        this.setState = (state,callback)=>{  
            return;
          };
    }
    componentDidMount(){
        setTimeout(()=>{
            this.accumulationHeight();
        },100)
        let LetterCon = document.getElementById('LetterCon');
        let touchY1 = '';
        let touchY2 = '';
        const LiHeight =20;
        let firstIndex ;
        let lastIndex ;
        LetterCon.addEventListener('touchstart',(e)=>{
            touchY1=e.touches[0].clientY;  
            firstIndex =parseInt(e.target.getAttribute('datatype'));
            this._scrollTo(firstIndex)
        
            this.setState({
                currentIndex,
                fixedP:this.state.LetterList[firstIndex]
            })
            e.stopPropagation();
        })
        LetterCon.addEventListener('touchmove',(e)=>{
            touchY2=e.touches[0].clientY;
            lastIndex= parseInt((touchY2-touchY1)/LiHeight)+firstIndex
            this._scrollTo(lastIndex)

           e.stopPropagation();
        })
        window.onscroll=()=>{
            let top =  document.documentElement.scrollTop || document.body.scrollTop;
            if(top>0){
                let fixedP = this.state.LetterList[this.state.currentIndex];
                this.setState({
                    fixedP
                })
            }
            let heightList = this.state.heightList;
            for(let i = 0 ; i < heightList.length  ; i++ ){
                let height1 = heightList[i];
                let height2 = heightList[i+1];
                if( top>=height1 && top < height2 ){
                    this.setState({
                        currentIndex:i
                    })
                }
            }
        }
    }
    checkSinger=(singer)=>{
        this.props.history.push('/singerPage/'+singer.id);
    }
    accumulationHeight(){
        this.setState({
            heightList :[]
        })
        let _heightList  = this.state.heightList;
        let listGroupList = document.querySelectorAll('.listGroup');
        let TempHeight = 0;
        _heightList.push(TempHeight)
        listGroupList.forEach((item,index)=>{
            _heightList.push(TempHeight+=item.clientHeight)
        })
        this.setState({
            heightList :_heightList
        })
    }
    _scrollTo(currentIndex){
        this.setState({
            currentIndex,
            fixedP:this.state.LetterList[currentIndex]
        })
        let scrollY = this.state.heightList[currentIndex];
        document.documentElement.scrollTop=scrollY;
    }
    render(){
        let singerList = this.props.singerList;
        let LetterList = this.props.LetterList;
        return(
            <>
                <ul  className='singerCon' ref='listview'>
                    {
                        singerList.map(( item , index )=>{
                            return <li key={ item+index }  className='listGroup'>
                                <h4>{ item.tittle }</h4>
                                <SingerTel singerObj = { item } selectSinger = { this.checkSinger }/>
                            </li>
                        })
                    }
                </ul>
                <ul className='LetterCon' id = 'LetterCon'                
                >
                    {
                        LetterList.map(( item , index )=>{
                            return <li key={ index } datatype={ index } 
                            className ={ index === this.state.currentIndex ? 'current':null }
                            onClick={()=>{
                                this._scrollTo(index)
                            }}
                            > { item } </li>
                        })
                    }
                </ul>
                <p className='fixedP'>
                    {
                        this.state.fixedP
                        ?this.state.fixedP
                        :null
                    }
                </p>
            </>
        )
    }
}
export default singerView;