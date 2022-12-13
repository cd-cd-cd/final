import React from 'react'
import { Button } from 'antd'
import style from './index.module.scss'
import useForm from '../../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
export default function CreateRight () {
  const { createFormBtn, checkForm, createDraft } = useForm()
  // 检验表单然后进入预览页面
  const goToPreview = () => {
    if (checkForm()) navigation('/preview')
  }

  const keepDraft = () => {
    createDraft()
  }
  const navigation = useNavigate()
  return (
    <div className={style.back}>
      <div className={style.btn_box_top}>
        <Button className={style.btn_top} onClick={() => goToPreview()}>预览</Button>
        <Button className={style.btn_top} onClick={() => keepDraft()}>保存为草稿</Button>
      </div>
      <Button type='primary' className={style.btn_bottom} onClick={() => createFormBtn() }>完成创建</Button>
    </div>
  )
}
