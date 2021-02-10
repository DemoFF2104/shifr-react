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
    items: ['Atbash', 'Scital', 'Polybe', 'Cezar'],
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
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileOutlined />} title="Модуль 1. Лабы 1-4">
            {items.map((name, index) => (
              <Menu.Item key={index + 3}>
                <Link to={`/Shifr/${name}`}>{name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
