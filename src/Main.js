import React , { Component } from 'react';
import MyHeader from './components/Header';
import MyTalList from './components/TabList';
import store from './store';
class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            unsubscribe:store.subscribe(() =>
                this.setState({
                    SongList:store.getState().SongList
                })
            )
        };
      }
      render (){
        return(
            <div>
                <MyHeader/>
                <MyTalList/>

                
                <div style={{ paddingTop:'80px' }}>
                    { this.props.children }
                </div>
            </div>
        )
    }
}
export default Main;