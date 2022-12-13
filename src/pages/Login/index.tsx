import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { login } from '../../api/auth'
import LoginHeader from '../../components/LoginHeader'
import style from './index.module.scss'

export default function Login () {
  const navigator = useNavigate()
  const onFinish = async (values: any) => {
    const res = await login(values.username, values.password)
    if (res?.stat === 'ok') {
      message.success({ content: '登录成功', key: 'login' })
      navigator('/home')
    }
  }
  const onFinishFailed = () => {
    message.error('请重新输入')
  }
  return (
    <div>
      <LoginHeader></LoginHeader>
      <div className={style.main}>
        <div className={style.main_wrap}>
        <div className={style.main_wrap_tab}>
          <span>账号登录</span>
        </div>
        <Form
        name='login'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={style.form}>
          <Form.Item
          name='username'
          rules={[{ required: true, message: '请输入用户名' },
            { min: 1, max: 20, message: '用户名长度为1-20位' },
            { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '用户名只能包含字母，数字，汉字' }
          ]}>
            <Input placeholder='用户名' className={style.input}></Input>
          </Form.Item>
          <Form.Item
          name='password'
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, max: 16, message: '密码长度为6-16位' }
          ]}>
            <Input.Password
            placeholder='密码'
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            className={style.input}
            ></Input.Password>
          </Form.Item>
          <Form.Item>
            <Link to='/register' className={style.link}>尚未注册？</Link>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type='primary' className={style.button}>登录</Button>
          </Form.Item>
        </Form>
        </div>
      </div>
    </div>
  )
}
