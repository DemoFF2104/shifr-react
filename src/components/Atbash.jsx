import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space } from 'antd';
import { shifr } from '../utils';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default class Atbash extends Component {
  state = {
    value: '',
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  onClick = () => {
    console.log(shifr(this.state.value));
    const tmpvalue = shifr(this.state.value);
    this.setState({ value: tmpvalue });
  };
  render() {
    const { value } = this.state;
    return (
      <Space direction="vertical" align="center" className="center-block">
        <TextArea style={{ width: 300 }} value={value} onChange={this.onChange} rows={4} />
        <Button onClick={this.onClick} type="primary">
          Выполнить
        </Button>
        <Switch checkedChildren="Зашифровать" unCheckedChildren="Дешифровать" defaultChecked />
      </Space>
    );
  }
}
