import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { login } from '@/store/modules/session.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const onFinish = async (values: Record<string, string>) => {
    try {
      await dispatch(login(values.username, values.password))
      navigate('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        messageApi.error(err.message)
      } else {
        console.error(err)
      }
    }
  }
  return (
    <>
      {contextHolder}
      <LoginForm title="vgtime-imitation" subTitle="vgtime-imitation后台" onFinish={onFinish}>
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined />,
          }}
          placeholder={'手机号: 110'}
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          placeholder={'密码: admin'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginForm>
    </>
  )
}
