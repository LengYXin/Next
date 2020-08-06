import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import './app.scss';
import './img.config';
import store from './store';

class App extends Component {
  componentDidMount() { 
    
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
