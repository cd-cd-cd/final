import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { context } from '../../hooks/store'
import HeaderForm from '../../components/HeaderForm'
import style from './index.module.scss'
import './index.css'
import { Button } from 'antd'
import useForm from '../../hooks/useForm'
import PreviewForm from '../../components/PreviewForm'

export default function Preview () {
  const { title, subTitle, QuestionList } = useContext(context)
  const navigate = useNavigate()
  const { createFormBtn } = useForm()

  return (
    <div className={style.newForm}>
      <HeaderForm></HeaderForm>
      <div className={style.form}>
        <PreviewForm title={title} subTitle={subTitle} QuestionList={QuestionList}></PreviewForm>
      </div>
      <div className={style.btn_box}>
        <Button className={style.btn} onClick={() => navigate('/form')}>继续编辑</Button>
        <Button className={style.btn} type='primary' onClick={() => createFormBtn()}>完成创建</Button>
      </div>
    </div>
  )
}
