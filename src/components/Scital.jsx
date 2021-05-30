import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space, Slider, InputNumber } from 'antd';
import { skital, deSkital } from '../utils/Scital';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default class Scital extends Component {
  state = {
    value: '',
    checked: true,
    inputValue: 1,
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
      tmpvalue = skital(this.state.value, this.state.inputValue);
    } else {
      tmpvalue = deSkital(this.state.value, this.state.inputValue);
    }
    this.setState({ value: tmpvalue });
  };
  render() {
    const { inputValue } = this.state;
    const { value } = this.state;
    return (
      <Space direction="vertical" align="center" className="center-block">
        <h1>Шифр Сцитала</h1>
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
          unCheckedChildren="Расшифровать"
          defaultChecked
          onChange={this.onChangeSwitch}
        />
        <Space direction="horizontal">
          <Slider
            className="sliderNumber"
            min={1}
            max={20}
            onChange={this.onChangeSlider}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
          <InputNumber
            min={1}
            max={20}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={this.onChangeSlider}
          />
        </Space>
      </Space>
    );
  }
}
