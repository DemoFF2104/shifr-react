import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { Switch, Space, Slider, InputNumber, Progress, Modal } from 'antd';
import {
  findCountSymbols,
  findFrequencySymbols,
  buildBarInfo,
  replaceText,
  replaceLetter,
  replaceLetterTmp,
  clearStart,
} from '../utils/Freq';
import { Col, Row, Select, DatePicker, AutoComplete, Cascader } from 'antd';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
var engDown = 'abcdefghijklmnopqrstuvwxyz';
engDown = engDown.split('');
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
rusDown = rusDown.split('');
export default class Freq extends Component {
  state = {
    value: '',
    checked: true,
    inputValue: 0,
    files: '',
    language: '',
    arrAlpha: [],
    a: '',
    b: '',
    isModalVisible: false,
    setIsModalVisible: false,
    freq: [],
    labels: [],
  };

  showModal = () => {
    this.setState({ isModalVisible: true });

    let { tmpLabels, tmpFreq } = buildBarInfo(
      findFrequencySymbols(findCountSymbols(this.state.value), this.state.value.length),
    );
    tmpFreq = Object.assign(...tmpLabels.map((n, i) => ({ [n]: tmpFreq[i] })));
    console.log(tmpFreq);
    this.setState({
      freq: tmpFreq,
    });
  };

  handleOk = () => {
    this.setState({ setIsModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  onChangeSwitch = (checked) => {
    clearStart();
  };
  onChangeValueA = (value) => {
    this.setState({ a: value });
  };
  onChangeValueB = (value) => {
    this.setState({ b: value });
  };
  onChangeLanguage = (value) => {
    this.setState({ language: value });
    if (value == 'Русский') this.setState({ arrAlpha: rusDown });
    else if (value == 'Английский') this.setState({ arrAlpha: engDown });
  };
  onChangeSlider = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      this.setState({
        value: text,
      });
    };
    reader.readAsText(e.target.files[0]);
  };
  onClick = () => {
    const text = replaceText(
      findFrequencySymbols(findCountSymbols(this.state.value), this.state.value.length),
      this.state.value,
    );
    this.setState({ value: text });
    let freqLetter;
    freqLetter = buildBarInfo(
      findFrequencySymbols(findCountSymbols(this.state.value), this.state.value.length),
    );
  };
  onClickChange = () => {
    const text = replaceLetterTmp(
      this.state.value,
      this.state.a,
      this.state.b,
      findFrequencySymbols(findCountSymbols(this.state.value), this.state.value.length),
    );
    this.setState({ value: text });
  };
  render() {
    const { inputValue } = this.state;
    const { value } = this.state;
    const { language } = this.state;
    const { arrAlpha } = this.state;
    const { a } = this.state;
    const { b } = this.state;
    const { freq } = this.state;

    return (
      <Space direction="vertical" align="center" className="center-block">
        <input type="file" onChange={(e) => this.showFile(e)} />
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
          checkedChildren="Очистить"
          unCheckedChildren="Подергать чтобы"
          defaultChecked
          onChange={this.onChangeSwitch}
        />

        <Input.Group>
          <Select
            defaultValue="Русский"
            value={language}
            onChange={this.onChangeLanguage}
            style={{ width: 100 }}>
            <Option value="Русский">Русский</Option>
            <Option value="Английский">Английский</Option>
          </Select>
          <Select defaultValue={arrAlpha[0]} value={a} onChange={this.onChangeValueA}>
            {arrAlpha.map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
          <Select defaultValue={arrAlpha[0]} value={b} onChange={this.onChangeValueB}>
            {arrAlpha.map((item) => (
              <Option value={item}>{item}</Option>
            ))}
          </Select>
        </Input.Group>
        <Button onClick={this.onClickChange} type="primary">
          Заменить
        </Button>
        <Button type="primary" onClick={this.showModal}>
          Гистограмма
        </Button>
        <Modal
          style={{ width: 300, height: 300 }}
          title="Basic Modal"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          {Object.entries(freq).map(([key, value]) => (
            <Space>
              <label>{key}</label>
              <Progress percent={value * 100} style={{ width: 300, height: 10 }} />
            </Space>
          ))}
        </Modal>
      </Space>
    );
  }
}
