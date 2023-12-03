import React, { useEffect, useState } from 'react';
import {
  CalendarFilled,
  CarryOutOutlined,
  FileAddOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import App from '../../App';
import '../../index.css';
import '../../App.css';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setUser } from '../../Redux/userSlice';
import config from '../config ';


const { Sider, Content } = Layout;

const Appss: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  console.log('user', user);
  dispatch(setUser());
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (user.email === config.admin.email) {
        setAdmin(true);
    }
}, []);

  const {
    token: {  },
  } = theme.useToken();

  return (

    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Logon</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarFilled />}>
            <Link to="/addTurn">Add Turn</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CarryOutOutlined />}>
            <Link to="/turns">My Turns</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<QuestionCircleOutlined
          />}>
            <Link to="/blog">About</Link>
          </Menu.Item>
          {user.email === config.admin.email &&<>
            <Menu.Item key="5" icon={<PlusCircleOutlined />}>
              <Link to="/types">addTyps</Link>
            </Menu.Item>

             <Menu.Item key="6" icon={<SettingOutlined
            />}>
              <Link to="/build">setting</Link>
            </Menu.Item></>

          }
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '3px 3px',
            padding: 2,
            minHeight: 1000,
            background: '#fffff',
          }}
        >
          <App />
        </Content>
      </Layout>
    </Layout>

  );
};

export default Appss;