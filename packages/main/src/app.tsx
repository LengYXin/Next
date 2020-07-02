import { BasicLayout, SettingDrawer } from '@ant-design/pro-layout';
import { Layout, Spin } from 'antd';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Register from './register';
const { Header, Content, Footer, Sider } = Layout;
const RootStore = {
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
    Content = React.createRef<HTMLDivElement>();
    state = {
        loading: true
    }
    componentDidMount() {
        Register(this.Content.current, (loading) => {
            this.setState({ loading })
        })
    }
    public render() {
        return (
            <Provider {...RootStore}>
                <BrowserRouter>
                    <AppLayout >
                        <Spin spinning={this.state.loading}>
                            <div ref={this.Content} style={{ minHeight: 500 }}>
                            </div>
                        </Spin>
                    </AppLayout>
                </BrowserRouter>
            </Provider>
        );
    }
}
@observer
class AppLayout extends React.Component<any> {
    componentDidMount() {
        console.log(this)
    }
    public render() {
        // const { MenuTrees } = RootStore.UserStore;
        return (
            <>
                <BasicLayout
                    menuDataRender={() => [
                        {
                            key: '1',
                            path: '/vue',
                            name: 'Vue',
                            icon: "",
                        },
                        {
                            key: '2',
                            path: '/test',
                            name: 'test',
                            icon: "",
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
