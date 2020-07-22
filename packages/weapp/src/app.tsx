import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import './app.scss';
import './clientConfig';
import counterStore from './store/counter';
const store = {
  counterStore
}

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
