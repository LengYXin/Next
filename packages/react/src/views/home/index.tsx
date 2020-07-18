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
                <Link to='/test'>Text</Link>
                <Title>h1. Ant Design</Title>
                <Title level={2}>h2. Ant Design</Title>
                <Title level={3}>h3. Ant Design</Title>
                <Title level={4}>h4. Ant Design</Title>
                <Button type="primary" block onClick={this.ontest.bind(this)}>
                    Primary
    </Button>
            </div>
        )
    }
}
