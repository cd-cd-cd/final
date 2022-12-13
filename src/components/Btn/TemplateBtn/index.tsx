import React from 'react'
import name from '../../../assets/imgs/name.svg'
import sex from '../../../assets/imgs/sex.svg'
import style from '../index.module.scss'
import { Button } from 'antd'
import useTemplateQuestion from '../../../hooks/useTemplateQuestion'

interface Props {
  id?: string
}

export default function TemplateBtn ({ id }: Props) {
  const { addBasic } = useTemplateQuestion()
  const getIcon = (id?: string) => {
    switch (id) {
      case 'basicSingSelectGender': {
        return sex
      }
      case 'basicInputName': {
        return name
      }
      default: {
        return ''
      }
    }
  }

  const getTitle = (id?: string) => {
    switch (id) {
      case 'basicSingSelectGender': {
        return '性别'
      }
      case 'basicInputName': {
        return '姓名'
      }
      default: {
        return ''
      }
    }
  }

  return (
    <Button className={style.btn} onClick={() => addBasic(id)}>
      <img src={getIcon(id)} className={style.questionImg}></img>
      {getTitle(id)}
    </Button>
  )
}
