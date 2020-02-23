import "antd/dist/antd.css";

import { Breadcrumb, Icon, Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";

import ConNavegacion from "./components/ConNavegacion";
import Dashboard from "./components/Dashboard";
import GraficoDolarObs from "./components/GraficoDolarObs";
import MyProvider from "./apollo/MyProvider";
import TablaDolares from "./components/TablaDolares";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <MyProvider>
        <Router>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1">
                  <Icon type="home" />
                  <span>Inicio</span>
                  <Link to="/" />
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="table" />
                  <span>Tabla</span>
                  <Link to="/tabla" />
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="line-chart" />
                  <span>Dolar observado</span>
                  <Link to="/dolar-obs" />
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }} />
              <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  style={{ padding: 24, background: "#fff", minHeight: 360 }}
                >
                  <Switch>
                    <Route path="/dolar-obs">
                      <ConNavegacion comp={GraficoDolarObs} />
                    </Route>
                    <Route path="/tabla" component={TablaDolares} />
                    <Route path="/">
                      <Dashboard />
                    </Route>
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Welinux SpA ©2020 Created by Hans
              </Footer>
            </Layout>
          </Layout>
        </Router>
      </MyProvider>
    );
  }
}
