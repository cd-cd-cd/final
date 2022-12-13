import React from 'react'
import LoginHeader from '../../components/LoginHeader'
import { Form, Input, Button, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { register } from '../../api/auth'
import style from '../Login/index.module.scss'
import { useNavigate } from 'react-router-dom'
export default function Register () {
  const navigator = useNavigate()

  const onFinish = async (values: any) => {
    if (values.password !== values.re_password) {
      return message.error('两次密码不一致，请重新输入')
    }
    const res = await register(values.username, values.password, values.re_password)
    if (res?.stat === 'ok') {
      message.success('注册成功，请登录')
      navigator('/login')
    }
  }

  const onFinishFailed = () => {
    message.error('请重新输入')
  }
  return (
    <div><LoginHeader></LoginHeader>
      <div className={style.main}>
        <div className={style.main_wrap}>
          <div className={style.main_wrap_tab}>
            <span className={style.tab_item}>账号注册</span>
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
            <Form.Item
              name='re_password'
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, max: 16, message: '密码长度为6-16位' }
              ]}>
              <Input.Password
                placeholder='确认密码'
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className={style.input}
              ></Input.Password>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type='primary' className={style.button}>注册</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
