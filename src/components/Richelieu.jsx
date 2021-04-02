import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space } from 'antd';
import { shifr, keyCheck } from '../utils/Richelieu.js';
import classNames from 'classnames';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default class Richelieu extends Component {
  state = {
    value: '',
    keyS: '',
    checked: true,
    keyErr: false,
  };

  onChange = ({ target: { value } }) => {
    let Reg6 = /^[0-9, ;]+$/i;
    console.log(keyCheck(value, this.state.keyS));
    if (Reg6.test(this.state.keyS) && keyCheck(value, this.state.keyS)) {
      this.setState({ value });
      this.setState({ keyErr: false });
    } else {
      this.setState({ value });
      this.setState({ keyErr: true });
    }
  };
  onChangeKey = ({ target: { value } }) => {
    let Reg6 = /^[0-9, ;]+$/i;
    this.setState({ keyS: value });
    if (Reg6.test(value) && keyCheck(this.state.value, value)) {
      this.setState({ keyErr: false });
    } else {
      this.setState({ keyErr: true });
    }
  };
  onChangeSwitch = (checked) => {
    this.setState({ checked });
  };
  onClick = () => {
    let tmpvalue;
    if (this.state.checked) {
      tmpvalue = shifr(this.state.value, this.state.keyS);
    } else {
      tmpvalue = shifr(this.state.value, this.state.keyS);
    }
    this.setState({ value: tmpvalue });
  };
  render() {
    const { value, keyS } = this.state;
    return (
      <Space direction="vertical" align="center" className="center-block">
        <h1>Шифр Ришелье</h1>
        <TextArea
          style={{ width: 300, height: 200 }}
          value={value}
          onChange={this.onChange}
          rows={4}
        />
        <TextArea
          style={{ width: 300, height: 20 }}
          value={keyS}
          placeholder="Ключ"
          onChange={this.onChangeKey}
          rows={4}
          className={classNames({
            redKey: this.state.keyErr === true,
          })}
        />
        <p
          style={{ display: 'none' }}
          className={classNames({
            labelVis: this.state.keyErr === true,
          })}>
          Ключ должен быть короче сообщения
        </p>
        <Button onClick={this.onClick} type="primary" disabled={this.state.keyErr}>
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
