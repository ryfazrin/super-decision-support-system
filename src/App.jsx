// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './router.jsx';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{
      minHeight: '100vh'
    }}>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            {/* <Link to="/">Home</Link> */}
          </Breadcrumb.Item>
          {/* <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <RouterProvider router={router} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Super Decision Support System ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}

export default App;
