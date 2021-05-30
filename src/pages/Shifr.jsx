import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MySider from '../components/MySider';
import Atbash from '../components/Atbash';
import Scital from '../components/Scital';
import Polybius from '../components/Polybius';
import Cezar from '../components/Cezar';
import Vizhener from '../components/Vizhener';
import Gronsfeld from '../components/Gronsfeld';
import Alberty from '../components/Alberty';
import Richelieu from '../components/Richelieu';
import Freq from '../components/Freq';
import Vernam from '../components/Vernam';
import Playfair from '../components/Playfair';
import Hill from '../components/Hill';
import Gamm from '../components/Gamm';
import Cardanus from '../components/Cardanus';
import Analyze from '../components/Analyze';
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
            <Route exact path="/Shifr/Vizhener" component={Vizhener} />
            <Route exact path="/Shifr/Gronsfeld" component={Gronsfeld} />
            <Route exact path="/Shifr/Alberty" component={Alberty} />
            <Route exact path="/Shifr/Richelieu" component={Richelieu} />
            <Route exact path="/Shifr/Freq" component={Freq} />
            <Route exact path="/Shifr/Vernam" component={Vernam} />
            <Route exact path="/Shifr/Playfair" component={Playfair} />
            <Route exact path="/Shifr/Hill" component={Hill} />
            <Route exact path="/Shifr/Gamm" component={Gamm} />
            <Route exact path="/Shifr/Cardanus" component={Cardanus} />
            <Route exact path="/Shifr/Analyze" component={Analyze} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2021 Created by Fedorov Konstantin</Footer>
        </Layout>
      </Layout>
    );
  }
}
