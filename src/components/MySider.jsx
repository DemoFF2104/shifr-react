import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;
export default class MySider extends Component {
  state = {
    collapsed: false,
    items: ['Atbash', 'Scital', 'Polybius', 'Cezar'],
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { collapsed } = this.state;
    const { items } = this.state;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to={'/'}>Главная</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileOutlined />} title="Модуль 1. Лабы 1-4">
            {items.map((name, index) => (
              <Menu.Item key={index + 3}>
                <Link to={`/Shifr/${name}`}>{name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
