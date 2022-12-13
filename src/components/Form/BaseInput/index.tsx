import React from 'react'
import { Input } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { TProblemType } from '../../../libs/model'
import useQuestions from '../../../hooks/useQuestions'
import style from '../index.module.scss'
const { TextArea } = Input
interface Props {
  id: string,
  onclickId: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  type: TProblemType,
  serial: number,
  required: boolean
}
export default function BaseInput ({ id, onclickId, type, serial, required }: Props) {
  const { addTitle, getTitle } = useQuestions()

  // 初始化对应样式
  const returnHtml = (type: TProblemType) => {
    if (type === 'input') {
      return '填写者回答区'
    }
    if (type === 'date') {
      return <>年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日</>
    }
    if (type === 'time') {
      return <>时&nbsp;&nbsp;分&nbsp;</>
    }
    if (type === 'score') {
      return <><StarFilled className={style.star} />
      <StarFilled className={style.star} />
      <StarFilled className={style.star} />
      <StarFilled className={style.star} />
      <StarFilled className={style.star} /></>
    }
  }

  return (
    <div onClick={(e) => onclickId(e)}>
      <div className={style.input_box}>
        {required ? <span className={style.require}>*</span> : null}
        <span className={style.serial}>{serial + 1}</span>
        <TextArea
        onChange={ (e) => addTitle(e.target.value, id) }
        autoSize
        bordered={false}
        className={style.input}
        value={getTitle(id)}
        ></TextArea>
      </div>
      <span className={style.span}>{returnHtml(type)}</span>
    </div>
  )
}
