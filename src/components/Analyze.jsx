import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space } from 'antd';
import { analyze, kasizka, autoCorr } from '../utils/Analyze.js';
import classNames from 'classnames';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Col, Row, Select, DatePicker, AutoComplete, Cascader } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
export default class Analyze extends Component {
  state = {
    value: '',
    keyS: '',
    count: '',
    checked: true,
    keyErr: false,
    language: true,
  };

  onChange = ({ target: { value } }) => {
    let Reg6 = /^[A-zА-яЁё. ?]+$/i;
    this.setState({ value });
  };
  onChangeLanguage = (value) => {
    if (value == 'Русский') this.setState({ language: true });
    else if (value == 'Английский') this.setState({ language: false });
  };
  onChangeKey = ({ target: { value } }) => {
    let Reg6 = /^[0-3]+$/i;
    this.setState({ keyS: value });
    if (analyze.checkKey(value, this.state.count) && Reg6.test(value)) {
      this.setState({ keyErr: false });
    } else {
      this.setState({ keyErr: true });
    }
  };
  onChangeCount = ({ target: { value } }) => {
    let Reg6 = /^[0-9]+$/i;
    this.setState({ count: value });
    if (analyze.checkCount(value) && Reg6.test(value)) {
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
      tmpvalue = autoCorr.encoding(this.state.value, 3);
    } else {
      console.log(this.state.inputValue);
      tmpvalue = analyze.decoding(this.state.value, 4, this.state.keyS, this.state.language);
    }
    this.setState({ value: tmpvalue });
  };
  render() {
    const { value, keyS, language, count } = this.state;
    return (
      <Space direction="vertical" align="center" className="center-block">
        <h1>Шифр Хилла</h1>
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
        <TextArea
          style={{ width: 300, height: 20 }}
          value={count}
          placeholder="Размер"
          onChange={this.onChangeCount}
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
          Длина ключа не является квадратом целого числа
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
        <Select defaultValue="Русский" onChange={this.onChangeLanguage} style={{ width: 100 }}>
          <Option value="Русский">Русский</Option>
          <Option value="Английский">Английский</Option>
        </Select>
      </Space>
    );
  }
}
