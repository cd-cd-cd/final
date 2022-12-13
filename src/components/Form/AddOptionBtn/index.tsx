import React from 'react'
import style from '../index.module.scss'
import addIcon from '../../../assets/imgs/add.png'
import useQuestions from '../../../hooks/useQuestions'

interface Props {
  id: string
}
export default function AddOptionBtn ({ id }: Props) {
  const { addOption } = useQuestions()
  return (
    <div className={style.add_box} onClick={() => addOption(id)}>
      <img src={addIcon} className={style.addIcon}></img>
      <span className={style.add_text}>选项</span>
    </div>
  )
}
