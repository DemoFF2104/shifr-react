import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space } from 'antd';
import playfair from '../utils/Playfair.js';
import classNames from 'classnames';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default class Playfair extends Component {
  state = {
    value: '',
    keyS: '',
    checked: true,
    keyErr: false,
  };

  onChange = ({ target: { value } }) => {
    let Reg6 = /^[A-zА-яЁё]+$/i;
    if (value.length >= this.state.keyS.length && Reg6.test(this.state.keyS)) {
      this.setState({ value });
      this.setState({ keyErr: false });
    } else {
      this.setState({ value });
      this.setState({ keyErr: true });
    }
  };
  onChangeKey = ({ target: { value } }) => {
    let Reg6 = /^[A-zА-яЁё]+$/i;
    this.setState({ keyS: value });
    if (Reg6.test(value)) {
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
      tmpvalue = playfair.encoding(this.state.value, this.state.keyS, 'Английский');
    } else {
      console.log(this.state.inputValue);
      tmpvalue = playfair.decoding(this.state.value, this.state.keyS, 'Английский');
    }
    this.setState({ value: tmpvalue });
  };
  render() {
    const { value, keyS } = this.state;
    return (
      <Space direction="vertical" align="center" className="center-block">
        <h1>Шифр Плейфера</h1>
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
          unCheckedChildren="Расшифровать"
          defaultChecked
          onChange={this.onChangeSwitch}
        />
      </Space>
    );
  }
}
