import React, { Fragment, useState } from 'react'
import { Checkbox, DatePicker, Input, Radio, Rate, Select, TimePicker } from 'antd'
import style from './index.module.scss'
import { IQuestion, TProblemType } from '../../../libs/model'
import useQuesRes from '../../../hooks/useQuesRes'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { nanoid } from 'nanoid'
const { TextArea } = Input
const { Option } = Select

interface Props {
  question: IQuestion
  index: number,
  warn: boolean
}

// 一开始不渲染提示
let first = true
export default function FillQuestion ({ question, index, warn }: Props) {
  const desc = ['1.0分', '2.0分', '3.0分', '4.0分', '5.0分']

  const [value, setValue] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [requireVisible, setRequireVisible] = useState(true)

  const { addValue, changeValueFormat, checkRequire } = useQuesRes()

  const onBlurInput = () => {
    first = false
    if (question.required === true && !inputValue) {
      setRequireVisible(true)
    } else {
      setRequireVisible(false)
    }
  }
  // 返回不同样式
  const returnPreviewQues = (type: TProblemType) => {
    if (type === 'input') {
      return (
        <Fragment>
          <div className={style.box}>
            <TextArea
              autoSize
              placeholder='请输入'
              onChange={(e) => { addValue(question.id, { value: e.target.value }); setInputValue(e.target.value) }}
              value={inputValue}
              onBlur={() => onBlurInput()}
              onFocus={() => setRequireVisible(false)}
              bordered={false}
              className={style.input}></TextArea>
          </div>
          {question.required && !first && requireVisible ? <span className={style.require_attention}>此题为必填，请输入</span> : null}
        </Fragment>
      )
    }
    if (type === 'score') {
      return (
        <Fragment>
          <div className={style.basic_box}>
            <Rate tooltips={desc} onChange={(e) => {
              setValue(e)
              addValue(question.id, { value: e })
            }} value={value} />
            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
          </div>
        </Fragment>
      )
    }
    if (type === 'date') {
      return (
        <div className={style.basic_box}>
          <DatePicker onChange={(_, dateString) => {
            addValue(question.id, { value: dateString })
          }} />
        </div>
      )
    }
    if (type === 'time') {
      return (
        <div className={style.basic_box}>
          <TimePicker
            onChange={(_, dateString: string) => {
              addValue(question.id, { value: dateString })
            }} />
        </div>
      )
    }
    if (type === 'singleSelect') {
      return (
        <div className={style.basic_box}>
          <Radio.Group className={style.group}>
            {
              question.setting?.options.map(item =>
                <Radio key={item.id}
                  value={item.title}
                  onChange={(e) => addValue(question.id, { value: { id: nanoid(), title: e.target.value } })}
                >{item.title}</Radio>)
            }
          </Radio.Group>
        </div>
      )
    }
    if (type === 'multiSelect') {
      return (
        <div className={style.basic_box}>
          <Checkbox.Group
            className={style.group}
            onChange={(checkedValues: CheckboxValueType[]) => {
              addValue(question.id, changeValueFormat(checkedValues))
            }}
          >
            {
              question.setting?.options.map(item =>
                <Checkbox key={item.id}
                  value={item.title}
                >{item.title}</Checkbox>)
            }
          </Checkbox.Group>
        </div>
      )
    }
    if (type === 'pullSelect') {
      return (
        <div className={style.basic_box}>
          <Select placeholder='填写者选择区'
            className={style.input_type}
            onChange={(value: string) => {
              addValue(question.id, { value: { id: nanoid(), title: value } })
            }}
          >
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
      {
        question.required &&
          !checkRequire(question.id) &&
          warn &&
          question.type !== 'input'
          ? <span className={style.require_attention}>此题为必填，请输入</span>
          : null
      }
    </Fragment>
  )
}
