import React, { Component } from 'react'
import { Typography, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const { Title } = Typography;
interface Props {

}
interface State {

}

export default class index extends Component<Props, State> {
    state = {}
    ontest() {
        Modal.confirm({ title: '测试', content: '哈哈哈哈哈哈哈' })
    }
    render() {
        return (
            <div>
                <Link to='/'>Home</Link>
                <Test></Test>
            </div>
        )
    }
}
@inject('TestStore')
@observer
class Test extends React.Component<{ TestStore?: any }> {
    componentDidMount() {
        console.log(this)
    }
    onToggleTime() {
        this.props.TestStore.onToggleTime()
    }
    public render() {
        // const { MenuTrees } = RootStore.UserStore;
        return (
            <div>
                <div>
                    <span>{this.props.TestStore.currentTime}</span>
                </div>
                <Button type="primary" block onClick={this.onToggleTime.bind(this)}>
                    {this.props.TestStore.startInterval ? '关闭' : '开启'}
                </Button>
            </div>

        )
    }
}