import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MySider from '../components/MySider';
import Atbash from '../components/Atbash';
import Scital from '../components/Scital';
import Polybius from '../components/Polybius';
import Cezar from '../components/Cezar';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MySider />
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Route exact path="/Shifr/Atbash" component={Atbash} />
            <Route exact path="/Shifr/Scital" component={Scital} />
            <Route exact path="/Shifr/Polybius" component={Polybius} />
            <Route exact path="/Shifr/Cezar" component={Cezar} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2021 Created by Fedorov Konstantin</Footer>
        </Layout>
      </Layout>
    );
  }
}
