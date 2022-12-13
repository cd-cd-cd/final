import { LeftOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { context } from '../../hooks/store'
import useForm from '../../hooks/useForm'
import HeaderUser from '../HeaderUser'
import style from './index.module.scss'

export default function HeaderForm () {
  const [visible, setVisible] = useState(false)
  const navigator = useNavigate()
  const { createDraft, resetData, checkForm } = useForm()
  const { title, subTitle, QuestionList, draftId } = useContext(context)

  const path = useLocation().pathname

  const handleOk = () => {
    if (path === '/form') {
      if (checkForm()) {
        createDraft()
        navigator(-1)
        resetData()
      } else {
        setVisible(false)
      }
    }
  }

  const clickBack = () => {
    // 如果是在新建表单页面
    if (path === '/form') {
      // 如果没有编辑内容 或者 已经保存了草稿
      if ((title === '未命名标题' && !subTitle && !QuestionList.length) || draftId) {
        navigator(-1)
      } else {
        setVisible(true)
      }
    } else {
      // 如果不在新建表单页面
      navigator(-1)
    }
  }

  return (
    <header className={style.header}>
      <div className={style.header_left} onClick={() => clickBack()}>
        <LeftOutlined />
        <span className={style.span}>新建表单</span>
      </div>
      <HeaderUser></HeaderUser>
      <Modal
        title="是否保存为草稿?"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => setVisible(false)}
        footer={[
          <div key='addProjectModalfooter' >
            <Button key="back" onClick={() => setVisible(false)}>
              取消
            </Button><Button key="submit" type="primary" onClick={() => handleOk()}>
              保存
            </Button><Button
              key="link"
              type="primary"
              onClick={() => { resetData(); navigator(-1) }}
            >
              不保存
            </Button></div>
        ]}
      >
        <p>保存的草稿将会显示在首页列表，方便下次编辑</p>
      </Modal>
    </header>
  )
}
