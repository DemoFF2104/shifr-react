import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space } from 'antd';
import { PolybiusFunc, dePolybius } from '../utils/Polybius';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default class Polybius extends Component {
  state = {
    value: '',
    checked: true,
    indSpace: [],
    indChar: [],
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  onChangeSwitch = (checked) => {
    this.setState({ checked });
  };
  onClick = () => {
    let tmpvalue;
    let indSpace;
    if (this.state.checked) {
      tmpvalue = PolybiusFunc(this.state.value);
      this.setState({ indChar: tmpvalue[2] });
      this.setState({ indSpace: tmpvalue[1] });
      this.setState({ value: tmpvalue[0] });
    } else {
      tmpvalue = dePolybius(this.state.value, this.state.indSpace, this.state.indChar);
      this.setState({ value: tmpvalue });
    }
  };
  render() {
    const { value } = this.state;
    return (
      <Space direction="vertical" align="center" className="center-block">
        <h1>Квадрат полибия</h1>
        <TextArea style={{ width: 300, height: 200 }} value={value} onChange={this.onChange} rows={4} />
        <Button onClick={this.onClick} type="primary">
          Выполнить
        </Button>
        <Switch
          checkedChildren="Зашифровать"
          unCheckedChildren="Дешифровать"
          defaultChecked
          onChange={this.onChangeSwitch}
        />
      </Space>
    );
  }
}
