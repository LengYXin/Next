import { Spin, Button } from 'antd';
import { Provider, inject, observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from './router';
const RootStore = {}
export default class App extends React.Component<any> {
    componentDidMount() {
        console.log(this)
    }
    public render() {
        return (
            <Provider {...this.props.RootStore}>
                <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/test' : '/'}>
                    <React.Suspense fallback={<div style={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}><Spin size="large" tip="loading..." /></div>}>
                        {RenderRoutes}
                    </React.Suspense>
                </BrowserRouter>
            </Provider >
        );
    }
}