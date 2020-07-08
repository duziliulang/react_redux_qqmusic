import React from 'react';
import { Route , Switch , BrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './Main';
import Recommend from './pages/Recommend/Recommend';
import Ranking from './pages/Ranking/Ranking';
import RankDetails from './pages/RankDetails/RankDetails';
import singerDetails from './pages/singerDetails/singerDetails';
import SingerPage from './pages/SingerPage/SingerPage';
import Search from './pages/Search';
import store from './store';
import Player from './components/player/index';
// import store from './store';
import { Provider } from "react-redux";
class MyRouter extends React.Component{
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
    render(){
        return(
            <BrowserRouter>
                <Provider  store={store}>
                    <App>
                        <Switch>
                            <Route  path='/ranking/:id' component={ RankDetails }  />
                            <Route  path='/singerPage/:id' component={ singerDetails }  />
                            <Main>
                                <Route  exact path='/' component={ Recommend }  />
                                <Route  exact path='/recommend' component={ Recommend } />  
                                <Route  exact path='/singerPage' component={ SingerPage } /> 
                                <Route  exact path='/ranking' component={ Ranking } />  
                                <Route  exact path='/search' component={ Search } />  
                            </Main>
                        </Switch>
                    
                    </App>
                    {
                        store.getState().SongList.length>0
                        ?<Player/>
                        :null
                    }
                </Provider>
            </BrowserRouter>
        )
    }
}
export default MyRouter;