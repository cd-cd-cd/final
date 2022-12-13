import dayjs from 'dayjs'
import React, { Fragment } from 'react'
import { item } from '../../libs/model'
import FilledItem from '../Form/FilledItem'
import style from './index.module.scss'
interface Props {
  title: string | undefined,
  form?: item,
  time?: number
}
export default function ResForm ({ title, form, time }: Props) {
  return (
    <Fragment>
      <div className={style.line}></div>
      <div className={style.time}>提交时间: {dayjs(time).format('YYYY/MM/DD HH:mm:ss')}</div>
      <div className={style.title}>{title}</div>
      {
        form?.result.map((item, index) =>
          <div className={style.question} key={item.id}>
            <FilledItem result={item} index={index}></FilledItem>
          </div>
        )
      }
    </Fragment>
  )
}
