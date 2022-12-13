import React, { useEffect, useState } from 'react'
import useLocal from '../../../hooks/useLocal'
import { getList } from '../../../api/form'
import PreviewForm from '../../../components/PreviewForm'
import style from './index.module.scss'
import { IQuestion, singleList } from '../../../libs/model'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

export default function Question () {
  const { getState } = useLocal()
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [QuestionList, setQuestionList] = useState<IQuestion[]>([])
  // 存储表单状态
  const navigator = useNavigate()

  // 获取表单数据
  const getForm = async (id: string) => {
    const res = await getList(id)
    if (res) {
      const data: singleList = res.data.item
      setTitle(data.title)
      setSubTitle(data.subTitle)
      setQuestionList(data.problems)
    }
  }

  useEffect(() => {
    getForm(getState().id)
  }, [])

  // 点击填写表单
  const clickFill = () => {
    const status = getState().status
    if (status === 3) {
      navigator(`/fill?id=${getState().id}`)
    } else if (status === 4) {
      message.info('当前表单已停止收集')
    }
  }

  return (
    <div className={style.back}>
      <PreviewForm title={title} subTitle={subTitle} QuestionList={QuestionList}></PreviewForm>
      <div className={style.fill_form}>
        <span className={style.fill}
          onClick={() => clickFill()
          }>填写表单</span>
      </div>
    </div>
  )
}
