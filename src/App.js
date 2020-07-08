import React , { Component } from 'react';
import { Provider } from "react-redux";
import './App.less';
import store from './store';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render (){
      return(
          <Provider className="App" store={store}>
            { this.props.children }
          </Provider>
      )
  }
}
export default App;
