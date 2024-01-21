import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const { pathname } = useLocation()
  const { userStore, loginStore, channelStore } = useStore()
  useEffect(() => {
    userStore.getUserInfo()
    channelStore.getChannel()
  }, [userStore, channelStore])

  const navigate = useNavigate()
  const onConfirm = () => {
    loginStore.logOut()
    navigate('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="confirm log out" okText="log out" cancelText="cancel" onConfirm={onConfirm}>
              <LogoutOutlined /> log out
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={pathname}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to='/'>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to='/article'>内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to='/publish'>发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        {/* <Layout className="layout-content" style={{ padding: 20 }}></Layout> */}
        <Outlet />
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)