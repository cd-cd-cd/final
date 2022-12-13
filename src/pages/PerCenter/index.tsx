import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload'
import { logout } from '../../api/auth'
import { changePwd, getInfo, setInfo } from '../../api/user'
import { IUser } from '../../libs/model'
import basicAvatar from '../../assets/imgs/avatar_basic.webp'
import style from './index.module.scss'

export default function PerCenter () {
  const [user, setUser] = useState<IUser | undefined>()
  const [visible, setVisible] = useState(false)
  const [initAvatar, setInitAvatar] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  // 控制昵称修改
  const [nick, setNick] = useState(false)
  const [name, setName] = useState<string>()
  // 控制修改密码
  const [pwdVisible, setPwdVisible] = useState(false)
  const navigator = useNavigate()

  // 控制修改头像
  const [avatarVisible, setAvatarVisible] = useState(false)

  const [form] = Form.useForm()

  // 退出
  const clickLogOut = async () => {
    message.info({ content: '正在退出', key: 'logout' })
    const res = await logout()
    if (res) {
      setVisible(false)
      navigator('/login')
      message.success({ content: '退出成功', key: 'logout' })
    } else {
      message.error({ content: '退出失败', key: 'logout' })
    }
  }

  // 检查密码
  const checkPwd = (pwd: string | undefined) => {
    if (!pwd) {
      return false
    }
    if (pwd.length > 16 || pwd.length < 6) {
      return false
    }
    return true
  }

  // 修改密码
  const clickChangePwd = async () => {
    const pwds = form.getFieldsValue()
    const oldPwd = pwds.oldPwd
    const pwd = pwds.pwd
    const confirmPwd = pwds.confirmPwd
    if (checkPwd(pwd) && checkPwd(oldPwd) && checkPwd(confirmPwd)) {
      const res = await changePwd(oldPwd, pwd, confirmPwd)
      if (res?.stat !== 'ok') {
        message.error('密码修改失败')
      } else {
        setPwdVisible(false)
        form.resetFields()
        message.success('密码修改成功, 请重新登录,正跳转至登录页面')
        navigator('/login')
      }
    }
  }

  // 修改头像
  const clickChangeAvatar = async () => {
    if (!imageUrl) {
      message.info('请上传图片')
    } else {
      const res = await setInfo(user?.nickname as string, imageUrl)
      if (res) {
        message.success('头像设置成功')
        setImageUrl('')
        getUserInfo()
        setAvatarVisible(false)
      } else {
        message.info('头像设置失败')
      }
    }
  }

  // 获得初始信息
  const getUserInfo = async () => {
    const res = await getInfo()
    // 如果没有头像加上默认头像
    if (!res?.data.user.avatar) {
      await setInfo(res?.data.user.nickname as string, basicAvatar)
      setInitAvatar(basicAvatar)
    } else {
      setInitAvatar(res.data.user.avatar)
    }
    setUser(res?.data.user)
    setName(res?.data.user.nickname)
  }

  // 检验名字 返回信息
  const returnNameInfo = () => {
    if (!name) {
      return '名字不能为空'
    }
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
    if (!reg.test(name)) {
      return '用户名只能包含字母，数字，汉字'
    }
    return ''
  }

  // 修改姓名
  const changeName = async () => {
    if (returnNameInfo().length === 0) {
      const res = await setInfo(name as string, user?.avatar ? user?.avatar as string : basicAvatar)
      if (res) {
        message.success('名字修改成功')
        getUserInfo()
        setNick(false)
      }
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  // 检查图片格式和大小
  const beforeUpload = (file: RcFile) => {
    const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isPNG) {
      message.error(`${file.name} 不是一个png或jpeg格式的文件`)
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片要小于2MB!')
    }
    return isPNG && isLt2M
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div>
      <header className={style.header}>
        <span className={style.wps_span} onClick={() => navigator(-1)}>WPS</span>
        <span onClick={() => navigator(-1)}>个人中心</span>
      </header>
      <div className={style.topBar}>
        <span className={style.logout} onClick={() => setVisible(true)}>退出账号</span>
      </div>
      <div className={style.info}>
        <div className={style.avatar_box} onClick={() => setAvatarVisible(true)}>
          <img src={user?.avatar ? user.avatar : basicAvatar} className={style.avatarIcon}></img>
          <div className={style.mask}>
            <span className={style.change_text}>修改头像</span>
          </div>
        </div>
        <span className={style.nickName}>{user?.nickname}</span>
        <span className={style.user_id}>ID {user?.id}</span>
      </div>
      <div className={style.container}>
        <span className={style.text}>使用真实姓名，让工作伙伴认识你</span>
        {nick
          ? <div>
            <div className={style.change_nickName}>
              <Input className={style.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Button className={style.btn} onClick={() => setNick(false)}>取消</Button>
              <Button type='primary' className={style.btn} onClick={() => changeName()}>确认</Button>
            </div>
            <div className={style.span}>{returnNameInfo()}</div>
          </div>
          : <div className={style.static}>
            <span className={style.name}>{user?.nickname}</span>
            <a className={style.change} onClick={() => setNick(true)}>修改</a>
          </div>
        }
      </div>
      <div className={style.container}>
        <span className={style.text}>安全设置</span>
        <div className={style.static}>
          <span className={style.name}>设置密码</span>
          <a className={style.change} onClick={() => setPwdVisible(true)}>修改</a>
        </div>
      </div>
      <Modal
        title="退出登录"
        visible={visible}
        onOk={clickLogOut}
        cancelText='取消'
        okText='确定'
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <p>下次使用本帐号访问，可以继续访问你的个人数据</p>
      </Modal>
      <Modal
        title="修改密码"
        visible={pwdVisible}
        onOk={clickChangePwd}
        cancelText='取消'
        okText='确定'
        onCancel={() => { form.resetFields(); setPwdVisible(false) }}
      >
        <Form
          form={form}
          name='form'
        >
          <Form.Item
            name='oldPwd'
            rules={[
              { required: true, message: '原密码不为空' },
              { min: 6, max: 16, message: '密码长度为6-16位' }
            ]}
          >
            <Input.Password
              placeholder='请输入原密码' className={style.pswInput}>
            </Input.Password>
          </Form.Item>
          <Form.Item
            name='pwd'
            rules={[
              { required: true, message: '原密码不为空' },
              { min: 6, max: 16, message: '密码长度为6-16位' }
            ]}
          >
            <Input.Password
              placeholder='请输入新密码' className={style.pswInput}></Input.Password>
          </Form.Item>
          <Form.Item
            name='confirmPwd'
            rules={[
              { required: true, message: '原密码不为空' },
              { min: 6, max: 16, message: '密码长度为6-16位' }
            ]}
          >
            <Input.Password
              placeholder='请再次输入新密码' className={style.pswInput}></Input.Password>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="上传新头像"
        visible={avatarVisible}
        onOk={clickChangeAvatar}
        cancelText='取消'
        okText='确定'
        onCancel={() => { setAvatarVisible(false); setImageUrl('') }}
        destroyOnClose
      ><div className={style.bigBox}>
          <div className={style.upload_box}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
              customRequest={(option) => {
                const before = beforeUpload(option.file as RcFile)
                if (before) {
                  const reader = new FileReader()
                  reader.readAsDataURL(option.file as RcFile)
                  reader.onloadend = function (e) {
                    setImageUrl(e.target!.result as string)
                    setLoading(false)
                  }
                } else {
                  setLoading(false)
                }
              }}
              RcCustomRequestOptions
            >
              <div>{imageUrl ? <img src={imageUrl} style={{ width: '100%' }} /> : uploadButton}</div>
            </Upload>
          </div>
          <div className={style.init_box}>
            <img src={initAvatar} className={style.init_img}></img>
          </div>
        </div>
      </Modal>
    </div>
  )
}
