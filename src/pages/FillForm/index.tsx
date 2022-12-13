import React, { useEffect, useState } from 'react'
import { getList } from '../../api/form'
import logoIcon from '../../assets/imgs/logo.svg'
import { IQuestion, singleList } from '../../libs/model'
import { Button, message, Modal } from 'antd'
import style from './index.module.scss'
import FillQuestion from '../../components/Form/FillQuestion'
import useQuesRes from '../../hooks/useQuesRes'
import { useSearchParams } from 'react-router-dom'

export default function FillForm () {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [QuestionList, setQuestionList] = useState<IQuestion[]>([])
  const { initQuesRes, checkFillForm, submitForm } = useQuesRes()
  const [warns, setWarns] = useState<string[]>()
  const [searchParams] = useSearchParams()

  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    submitForm(searchParams.get('id') as string)
    setVisible(false)
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  // 获取表单数据
  const getForm = async (id: string) => {
    const res = await getList(id)
    if (res) {
      const data: singleList = res.data.item
      setTitle(data.title)
      setSubTitle(data.subTitle)
      setQuestionList(data.problems)
      initQuesRes(data.problems)
    }
  }
  useEffect(() => {
    getForm(searchParams.get('id') as string)
  }, [])

  const submitFillForm = () => {
    // 存入需要提醒的题目id
    if (checkFillForm().length) {
      setWarns(checkFillForm())
      message.info('请填写必填内容')
    } else {
      setVisible(true)
    }
  }

  const propsWarn = (id: string) => {
    if (warns?.findIndex(item => id === item) === -1 || !warns) {
      return false
    } else {
      return true
    }
  }

  return (
    <div className={style.box}>
      <header className={style.header}>
        <div className={style.header_left}>
          <img src={logoIcon} className={style.logoIcon}></img>
          <span className={style.span}>{title}</span>
        </div>
      </header>
      <div className={style.fillForm_back}>
        <div className={style.page}>
          <h1 className={style.title}>{title}</h1>
          {subTitle ? <div className={style.subTitle}>{subTitle}</div> : null}
          {
            QuestionList.map((item, index) =>
              <div key={item.id} className={style.question}>
                <FillQuestion warn={propsWarn(item.id)} question={item} index={index}></FillQuestion>
              </div>
            )
          }
          <div className={style.btn_box}>
            <Button type='primary' style={{ width: '100px' }} onClick={() => submitFillForm()}>提交</Button>
            <Modal
              title="提交内容"
              visible={visible}
              okText='确认'
              cancelText='取消'
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>提交后不可修改，确定提交?</p>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
