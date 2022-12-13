import React, { Fragment, useState } from 'react'
import { Checkbox, DatePicker, Input, Radio, Rate, Select, TimePicker } from 'antd'
import style from './index.module.scss'
import { IQuestion, TProblemType } from '../../../libs/model'
const { TextArea } = Input
const { Option } = Select

interface Props {
  question: IQuestion
  index: number
}
export default function PreviewQuestion ({ question, index }: Props) {
  const desc = ['1.0分', '2.0分', '3.0分', '4.0分', '5.0分']
  const [value, setValue] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [requireVisible, setRequireVisible] = useState(false)

  const onBlurInput = () => {
    if (question.required === true && inputValue.length === 0) setRequireVisible(true)
    else setRequireVisible(false)
  }
  const returnPreviewQues = (type: TProblemType) => {
    if (type === 'input') {
      return (
        <Fragment>
          <div className={style.box}>
            <TextArea
            autoSize
            placeholder='请输入'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => onBlurInput()}
            onFocus={() => setRequireVisible(false)}
            bordered={false}
            className={style.input}></TextArea>
          </div>
          {requireVisible ? <span className={style.require_attention}>此题为必填，请输入</span> : null}
        </Fragment>
      )
    }
    if (type === 'score') {
      return (
        <div className={style.basic_box}>
          <Rate tooltips={desc} onChange={setValue} value={value} />
          {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
        </div>
      )
    }
    if (type === 'date') {
      return (
        <div className={style.basic_box}>
          <DatePicker />
        </div>
      )
    }
    if (type === 'time') {
      return (
        <div className={style.basic_box}>
          <TimePicker />
        </div>
      )
    }
    if (type === 'singleSelect') {
      return (
        <div className={style.basic_box}>
          <Radio.Group className={style.group}>
            {
              question.setting?.options.map(item => <Radio key={item.id} value={item.title}>{item.title}</Radio>)
            }
          </Radio.Group>
        </div>
      )
    }
    if (type === 'multiSelect') {
      return (
        <div className={style.basic_box}>
          <Checkbox.Group className={style.group}>
            {
              question.setting?.options.map(item => <Checkbox key={item.id} value={item.title}>{item.title}</Checkbox>)
            }
          </Checkbox.Group>
        </div>
      )
    }
    if (type === 'pullSelect') {
      return (
        <div className={style.basic_box}><Select placeholder='填写者选择区' style={{ width: 350 }} >
          {
            question.setting?.options.map(item => <Option key={item.id} value={item.title}>{item.title}</Option>)
          }
        </Select>
        </div>
      )
    }
  }

  return (
    <Fragment>
      {question.required ? <span className={style.require}>*</span> : null}
      <span className={style.rank}>{index + 1}.</span>
      <span className={style.question_title}>{question.title}</span>
      {returnPreviewQues(question.type)}
    </Fragment>
  )
}
