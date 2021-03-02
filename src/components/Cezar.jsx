import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space, Slider, InputNumber } from 'antd';
import { cezarFunc, deCezar } from '../utils/Cezar';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default class Cezar extends Component {
  state = {
    value: '',
    checked: true,
    inputValue: 0,
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  onChangeSwitch = (checked) => {
    this.setState({ checked });
  };
  onChangeSlider = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  onClick = () => {
    let tmpvalue;
    if (this.state.checked) {
      tmpvalue = cezarFunc(this.state.value, this.state.inputValue);
    } else {
      console.log(this.state.inputValue);
      tmpvalue = deCezar(this.state.value, this.state.inputValue);
    }
    this.setState({ value: tmpvalue });
  };
  render() {
    const { inputValue } = this.state;
    const { value } = this.state;
    return (
      <Space direction="vertical" align="center" className="center-block">
        <h1>Шифр Цезаря</h1>
        <TextArea
          style={{ width: 300, height: 200 }}
          value={value}
          onChange={this.onChange}
          rows={4}
        />
        <Button onClick={this.onClick} type="primary">
          Выполнить
        </Button>
        <Switch
          checkedChildren="Зашифровать"
          unCheckedChildren="Дешифровать"
          defaultChecked
          onChange={this.onChangeSwitch}
        />
        <Space direction="horizontal">
          <Slider
            className="sliderNumber"
            min={-32}
            max={32}
            onChange={this.onChangeSlider}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
          <InputNumber
            min={-32}
            max={32}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={this.onChangeSlider}
          />
        </Space>
      </Space>
    );
  }
}
