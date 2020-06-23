import { Spin } from 'antd';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRoutes from './router';
const RootStore = {}
export default class App extends React.Component<any> {
    public render() {
        return (
            <Provider {...RootStore}>
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
            </Provider>
        );
    }
}
