import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Menu, message, Modal } from 'antd'
import { logout } from '../../api/auth'
import { getInfo } from '../../api/user'
import style from './index.module.scss'

export default function HeaderUser () {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [nickname, setNickName] = useState('还没有昵称')
  const [avatar, setAvatar] = useState<string>()
  const navigator = useNavigate()
  // 退出
  const clickLogOut = async () => {
    setConfirmLoading(true)
    message.info({ content: '正在退出', key: 'logout' })
    const res = await logout()
    if (res) {
      setVisible(false)
      setConfirmLoading(false)
      navigator('/login')
      message.success({ content: '退出成功', key: 'logout' })
    } else {
      message.error({ content: '退出失败', key: 'logout' })
    }
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <span onClick={() => navigator('/person')}>
              个人中心
            </span>
          )
        },
        {
          key: '2',
          label: (
            <span onClick={() => setVisible(true)}>
              退出账号
            </span>
          )
        }
      ]}
    />
  )
  const getUserInfo = async () => {
    const res = await getInfo()
    const userInfo = res?.data.user
    if (userInfo!.nickname) {
      setNickName(userInfo!.nickname)
    }
    if (userInfo!.avatar) {
      setAvatar(userInfo!.avatar)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <div className={style.header_right}>
      <div className={style.box} onClick={() => navigator('/person')}>
        <img src={avatar} className={style.avatar}></img>
      </div>
      <Dropdown overlay={menu} placement="bottomRight">
        <span className={style.nickname}>{nickname}</span>
      </Dropdown>
      <Modal
        title="退出登录"
        okText='确认'
        cancelText='取消'
        visible={visible}
        onOk={() => clickLogOut()}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <p>下次使用本帐号访问，可以继续访问你的个人数据</p>
      </Modal>
    </div>
  )
}
