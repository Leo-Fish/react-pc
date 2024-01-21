import { Form, Input, Button, Checkbox } from "antd"
import { Card } from 'antd'
import './index.scss'
import { useStore } from "@/store"
import { useNavigate } from "react-router-dom"
import { message } from 'antd'

function Login () {


  const { loginStore } = useStore()
  const navigate = useNavigate()
  const onFinish = async values => {
    const { mobile, code } = values
    try {
      await loginStore.login({ mobile, code })
      navigate('/')
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  return (
    <div className="login">
      <Card title="Login" bordered={true}>
        <Form validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish} >
          <Form.Item name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'wrong format',
                validateTrigger: 'onBlur'
              },
              { required: true, message: 'please input your telephone number' }
            ]}>
            <Input size="large" placeholder="please input your phone number" />
          </Form.Item>
          <Form.Item name="code"
            rules={[
              { len: 6, message: 'verification code have 6 digits', validateTrigger: 'onBlur' },
              { required: true, message: 'please input your verification code' }
            ]}>
            <Input size="large" placeholder="please input your password" />
          </Form.Item>
          <Form.Item>
            <Checkbox>I have already read the agreement and blah blah blah</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit' size="large">Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login