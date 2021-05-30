import React, { Component } from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import fs from 'fs';
import { Switch, Space, Slider, InputNumber, Progress, Modal } from 'antd';
import gamm from '../utils/Gamm';
import { Col, Row, Select, DatePicker, AutoComplete, Cascader } from 'antd';
import classNames from 'classnames';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
var engDown = 'abcdefghijklmnopqrstuvwxyz';
engDown = engDown.split('');
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
rusDown = rusDown.split('');
export default class Gamm extends Component {
  state = {
    value: '',
    keyS: '',
    checked: true,
    inputValue: 0,
    files: '',
    language: '',
    arrAlpha: [],
    a: '',
    b: '',
    loader: false,
    isModalVisible: false,
    setIsModalVisible: false,
    freq: [],
    labels: [],
    arrBuf: [],
    adress: '',
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
  onChangeKey = ({ target: { value } }) => {
    let Reg6 = /^[0-9]+$/i;
    this.setState({ keyS: value });
    if (gamm.checkKey(value) && Reg6.test(value)) {
      this.setState({ keyErr: false });
    } else {
      this.setState({ keyErr: true });
    }
  };
  onChangeValueA = (value) => {
    this.setState({ a: value });
  };
  onChangeValueB = (value) => {
    this.setState({ b: value });
  };
  // onChangeLanguage = (value) => {
  //   this.setState({ language: value });
  //   if (value == 'Русский') this.setState({ arrAlpha: rusDown });
  //   else if (value == 'Английский') this.setState({ arrAlpha: engDown });
  // };
  // onChangeSlider = (value) => {
  //   this.setState({
  //     inputValue: value,
  //   });
  // };
  showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      let binFile = new Uint8Array(text);
      console.log(text);
      console.log(binFile);
      this.setState({
        value: binFile,
      });
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };
  onClickFile = async (e) => {
    let blob = new Blob([this.state.value]);
    this.setState({ adress: URL.createObjectURL(blob) });
  };
  onClick = async () => {
    let { newArrBuf, newArrText } = gamm.coding(this.state.value, this.state.keyS);
    console.log(newArrBuf);
    console.log(newArrText);
    this.setState(
      {
        arrBuf: newArrBuf,
        value: newArrText,
      },
      function () {
        console.log(this.state.arrBuf);
      },
    );
    let newArrUBuf = new Uint8Array(newArrBuf);
    let blob = new Blob([newArrUBuf]);
    this.setState({ adress: URL.createObjectURL(blob) });
  };
  onClickChange = () => {};
  render() {
    const { inputValue } = this.state;
    const { value } = this.state;
    const { language } = this.state;
    const { arrAlpha } = this.state;
    const { a } = this.state;
    const { b } = this.state;
    const { freq } = this.state;
    const { keyS } = this.state;
    const { adress } = this.state;

    return (
      <Space direction="vertical" align="center" className="center-block">
        <div
          className={classNames('loader', {
            loader_hide: this.state.loader === false,
          })}></div>
        <input type="file" onChange={(e) => this.showFile(e)} />
        <h1>Шифрование методом гаммирования</h1>
        <a href={adress} download>
          Скачать файл
        </a>
        <TextArea
          style={{ width: 300, height: 200 }}
          value={value}
          onChange={this.onChange}
          rows={4}
        />
        <Button onClick={this.onClick} type="primary" disabled={this.state.keyErr}>
          Выполнить
        </Button>
        {/* <Button onClick={this.onClickFile} type="primary">
          Сохранить файл
        </Button> */}
        {/* <Switch
          checkedChildren="Очистить"
          unCheckedChildren="Подергать чтобы"
          defaultChecked
          onChange={this.onChangeSwitch}
        /> */}

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
          Ключ должен быть больше 0 и меньше 6075
        </p>

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
