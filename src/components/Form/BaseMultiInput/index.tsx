import React from 'react'
import { Input } from 'antd'
import style from '../index.module.scss'
import useQuestions from '../../../hooks/useQuestions'
import deleteIcon from '../../../assets/imgs/delete.png'
import circleIcon from '../../../assets/imgs/circle.png'
import { TProblemType } from '../../../libs/model'
const { TextArea } = Input

interface Props {
  id: string,
  onclickId: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  type: TProblemType,
  serial: number,
  required: boolean
}
export default function BaseMultiInput ({ id, onclickId, serial, required }: Props) {
  const { addTitle, getOptions, deleteOption, getTitle, addOptionTitle } = useQuestions()

  return (
    <div onClick={(e) => onclickId(e)}>
      <div className={style.input_box}>
        {required ? <span className={style.require}>*</span> : null}
        <span className={style.serial}>{serial + 1}</span>
        <TextArea
          onChange={(e) => addTitle(e.target.value, id)}
          autoSize
          bordered={false}
          className={style.input}
          value={getTitle(id)}
        ></TextArea>
      </div>
      {
        getOptions(id)?.map((item, index) =>
          <div key={item.id} className={style.option_box}>
            <img src={circleIcon} className={style.icon}></img>
            <div className={style.option_input_box}>
              <Input
                value={item.title}
                bordered={false}
                className={style.option_input}
                placeholder={`选项${index + 1}`}
                onChange={(e) => addOptionTitle(id, e.target.value, item.id as string)}
              ></Input>
            </div>
            <img src={deleteIcon} className={style.deleteIcon} onClick={() => deleteOption(id, item.id as string)}></img>
          </div>
        )
      }
    </div>
  )
}
