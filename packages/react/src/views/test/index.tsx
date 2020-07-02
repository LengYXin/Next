import React, { Component } from 'react'
import { Typography, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

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
                <Title>Test </Title>
                <Button type="primary" block onClick={this.ontest.bind(this)}>
                    Primary
    </Button>
            </div>
        )
    }
}
