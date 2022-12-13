import { Button, message } from 'antd'
import React, { Fragment } from 'react'
import { IQuestion } from '../../libs/model'
import PreviewQuestion from '../Form/PreviewQuestion'
import style from './index.module.scss'

interface Prop {
  title: string,
  subTitle: string,
  QuestionList: IQuestion[]
}
export default function PreviewForm ({ title, subTitle, QuestionList }: Prop) {
  return (
    <Fragment>
      <h1 className={style.title}>{title}</h1>
      {subTitle ? <div className={style.subTitle}>{subTitle}</div> : null}
      {
        QuestionList.map((item, index) =>
          <div key={item.id} className={style.question}>
            <PreviewQuestion question={item} index={index}></PreviewQuestion>
          </div>
        )
      }
      <div className={style.disable_btn_box}
        onClick={() => message.info('预览状态暂不支持提交')}>
        <Button
          type='primary'
          style={{ width: '90px', backgroundColor: 'rgb(161,207,248)', color: '#fff', border: 'rgb(161,207,248)', cursor: 'not-allowed' }}
        >提交</Button>
      </div>
    </Fragment>
  )
}
