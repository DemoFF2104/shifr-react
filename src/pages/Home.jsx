import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpaceCards from '../components/SpaceCards';
import MySider from '../components/MySider';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MySider />
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <SpaceCards />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2021 Created by Fedorov Konstantin</Footer>
        </Layout>
      </Layout>
    );
  }
}
