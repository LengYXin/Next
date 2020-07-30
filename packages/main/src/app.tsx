import { UnorderedListOutlined } from '@ant-design/icons';
import { BasicLayout, SettingDrawer } from '@ant-design/pro-layout';
import { Spin } from 'antd';
import { inject, observer, Provider } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Register from './register';
import { EntitiesTimeStore } from './time';
import { divide } from 'lodash';

const RootStore = {
    TestStore: new EntitiesTimeStore()
    // UserStore: new EntitiesUserStore(),
    // TimeStore: new EntitiesTimeStore(),
    // PageStore: new EntitiesPageStore({
    //     target: '/api',
    //     Search: { url: '/_FrameworkUserBase/Search', },
    //     Details: { url: '/_FrameworkUserBase/{id}' },
    //     Insert: { url: '/_FrameworkGroup/Add' },
    //     Update: { url: '/_FrameworkGroup/Edit' },
    //     Delete: { url: '/_FrameworkGroup/BatchDelete' },
    //     Export: { url: '/_FrameworkGroup/ExportExcel', body: {} },
    // }),
}
// RootStore.UserStore.onCheckLogin()
export default class App extends React.Component<any> {
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log("LENG: App -> componentDidCatch -> error", error, errorInfo)
        this.setState({ error: true })
    }
    public render() {
        return (
            <Provider {...RootStore}>
                <BrowserRouter>
                    <AppLayout >
                        <Content />
                    </AppLayout>
                </BrowserRouter>
            </Provider>
        );
    }
}
class Content extends React.Component<any> {
    Content = React.createRef<HTMLDivElement>();
    state = {
        loading: true,
        error: false
    }
    static getDerivedStateFromError(error) {
        console.warn("LENG: Content -> getDerivedStateFromError -> error", error)
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { error: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log("LENG: App -> componentDidCatch -> error", error, errorInfo)
        this.setState({ error: true })
    }
    componentDidMount() {
        try {
            RootStore.TestStore.onToggleTime(true)
            Register({ RootStore }, this.Content.current, (loading) => {
                this.setState({ loading })
            })
        } catch (error) {
            console.log("LENG: Content -> componentDidMount -> error", error)
        }
    }
    render() {
        // throw 'aaaa'
        if (this.state.error) {
            return <div>出错</div>
        }
        return (
            <Spin spinning={this.state.loading}>
                <div ref={this.Content} style={{ minHeight: 500 }}>
                </div>
            </Spin>
        )
    }
}
@inject('TestStore')
@observer
class Test extends React.Component<{ TestStore?: EntitiesTimeStore }> {
    // componentDidMount() {
    //    this.props.TestStore.onToggleTime()
    // }
    public render() {
        // const { MenuTrees } = RootStore.UserStore;
        return (
            <div>
                <div>{this.props.TestStore.currentTime} {String(this.props.TestStore.startInterval)}</div>
            </div>
        )
    }
}
@observer
class AppLayout extends React.Component<any> {
    componentDidMount() {
    }
    public render() {
        // const { MenuTrees } = RootStore.UserStore;
        return (
            <>
                <BasicLayout
                    headerRender={() => <Test />}
                    menuDataRender={() => [
                        {
                            key: '1',
                            path: '/vue',
                            name: 'Vue',
                            icon: <UnorderedListOutlined />,
                        },
                        {
                            key: '2',
                            path: '/test',
                            name: 'test',
                            icon: <UnorderedListOutlined />,
                        }
                    ]}
                    menuItemRender={(item, node) => {
                        return <Link to={item.path}>{node}</Link>
                    }}
                >
                    {/* <React.Suspense fallback={<div style={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}><Spin size="large" tip="loading..." /></div>}>
                        {RenderRoutes}
                    </React.Suspense> */}
                    {this.props.children}
                </BasicLayout>
                <SettingDrawer settings={{}} />
            </>
        )
    }
}
