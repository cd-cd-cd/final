import React, { useContext, useState } from 'react'
import { Input } from 'antd'
import { TProblemType } from '../../../libs/model'
import { context } from '../../../hooks/store'
import BaseMultiInput from '../../../components/Form/BaseMultiInput'
import BaseInput from '../../../components/Form/BaseInput'
import QuestionFunc from '../../../components/QuestionFunc'
import AddOptionBtn from '../../../components/Form/AddOptionBtn'
import useQuestions from '../../../hooks/useQuestions'
import useType from '../../../hooks/useType'
import useForm from '../../../hooks/useForm'
import useBtnType from '../../../hooks/useBtnType'
import style from './index.module.scss'

export default function CreateMiddle () {
  const { title, subTitle } = useContext(context)
  const { changeTitle, changeSubTitle } = useForm()
  const { QuestionList } = useQuestions()
  const { classType } = useType()
  const [clickId, setClickId] = useState('')
  const { typeList } = useBtnType()

  // 分别返回对应的组件
  const returnComponents = (_type: TProblemType, _id: string, _serial: number, _required: boolean) => {
    if (classType(_type) === 'BASE_TYPE') {
      return <BaseInput
        id={_id}
        type={_type}
        serial={_serial}
        required={_required}
        onclickId={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { e.stopPropagation(); setClickId(_id) }}
      ></BaseInput>
    }
    if (classType(_type) === 'OPTION_TYPE') {
      return <BaseMultiInput
        type={_type}
        serial={_serial}
        id={_id}
        required={_required}
        onclickId={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { e.stopPropagation(); setClickId(_id) }}
      ></BaseMultiInput>
    }
  }

  return (
    <div className={style.back} onClick={() => setClickId('')}>
      <div className={style.form} >
        <Input
          bordered={false}
          value={title}
          onChange={(e) => { changeTitle(e.target.value) }}
          className={style.title}
        ></Input>
        <div className={style.line}>
          <Input
            placeholder='输入表单副标题'
            value={subTitle}
            bordered={false}
            className={style.placeholder_center}
            onChange={(e) => { changeSubTitle(e.target.value) }}
          ></Input>
        </div>
      </div>
      {
        QuestionList.map((item, index) =>
          <div className={clickId === item.id ? style.click_box : style.box}
            key={item.id}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { e.stopPropagation(); setClickId(item.id) }}>
            {returnComponents(item.type, item.id, index, item.required)}
            {/* 选择+按钮 */}
            {clickId === item.id && classType(item.type) === 'OPTION_TYPE' ? <AddOptionBtn id={item.id}></AddOptionBtn> : null}
            {clickId === item.id ? <QuestionFunc item={item} typeList={typeList}></QuestionFunc> : null}
          </div>
        )
      }
    </div>
  )
}
