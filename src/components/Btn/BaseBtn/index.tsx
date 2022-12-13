import React from 'react'
import date from '../../../assets/imgs/date.svg'
import clockIcon from '../../../assets/imgs/clockIcon.png'
import square from '../../../assets/imgs/square.svg'
import triangle from '../../../assets/imgs/triangle.svg'
import starIcon from '../../../assets/imgs/star.svg'
import circle from '../../../assets/imgs/circle.svg'
import gapFill from '../../../assets/imgs/choice.svg'
import singleChoice from '../../../assets/imgs/singlechoice.svg'
import multiple from '../../../assets/imgs/mutiple.svg'
import dropdown from '../../../assets/imgs/dropdown.svg'
import time from '../../../assets/imgs/time.svg'
import { Button, Popover } from 'antd'
import { TProblemType } from '../../../libs/model'
import useQuestions from '../../../hooks/useQuestions'
import style from '../index.module.scss'

// 日期题
const DateContent = (
  <div className={style.content}>
      <h1 className={style.question_title}>日期题</h1>
      <p className={style.p}>用于收集日期，最多精确到年-月-日-时-分-秒。</p>
      <h1 className={style.question_title}>1. 请选择日期</h1>
      <p className={style.gapfill_input}>
        <img src={clockIcon} className={style.input_icon}></img>
        请输入
      </p>
  </div>
)

// 填空题
const InputContent = (
  <div className={style.content}>
    <h1 className={style.question_title}>填空题</h1>
    <p className={style.p}>用于收集填写者自己输入的一段内容，你也可以通过格式限制来指定内容的格式，如手机号、身份证号、银行卡号等，避免有人不按规范填写。</p>
    <h1 className={style.question_title}>1. 请输入内容</h1>
    <p className={style.gapfill_input}>请输入</p>
  </div>
)

// 多选题
const MultipleContent = (
  <div className={style.content}>
    <h1 className={style.question_title}>多选题</h1>
    <p className={style.p}>从—组选项中选择一个或多个选项，常用于问卷调研、考试教学、满意度调查等场景。</p>
    <div className={style.span}>
      <span className={style.question_title}>1．</span>
      <span className={style.title_extra}>[多选]</span>
      <span className={style.question_title}>请选择一个或多个选项</span>
    </div>
    <div className={style.circle_wrap}>
      <div className={style.circle_box}>
        <img src={square} className={style.circle}></img>
        <span>选项1</span>
      </div>
      <div className={style.circle_box}>
        <img src={square} className={style.circle}></img>
        <span>选项2</span>
      </div>
    </div>
  </div>
)

// 下拉题
const pullContent = (
  <div className={style.content}>
    <h1 className={style.question_title}>下拉题</h1>
    <p className={style.p}>选项较多时可用此题，下拉菜单默认收起，点击时展开，避免选项较多占用过多空间，简洁美观。</p>
    <h1 className={style.question_title}>1. 请选择一个选项</h1>
    <div className={style.dropdown}>
      <span>填写者选择区</span>
      <img src={triangle} className={style.dropdown_icon}></img>
    </div>
  </div>
)

// 评分题
const scoreContent = (
  <div className={style.content}>
    <h1 className={style.question_title}>评分题</h1>
    <p className={style.p}>常用于打分，用户可以选择1分~5分。</p>
    <h1 className={style.question_title}>1. 请打分</h1>
    <p className={style.gapfill_input}>
      <img src={starIcon} className={style.input_icon}></img>
      <img src={starIcon} className={style.input_icon}></img>
      <img src={starIcon} className={style.input_icon}></img>
      <img src={starIcon} className={style.input_icon}></img>
      <img src={starIcon} className={style.input_icon}></img>
    </p>
  </div>
)

// 单选题
const singleContent = (
  <div className={style.content}>
    <h1 className={style.question_title}>单选题</h1>
    <p className={style.p}>从—组选项中选择一个，常用于活动投票、考试教学、信息采集等场景。</p>
    <h1 className={style.question_title}>1．请选择一个选项</h1>
    <div className={style.circle_wrap}>
      <div className={style.circle_box}>
        <img src={circle} className={style.circle}></img>
        <span>选项1</span>
      </div>
      <div className={style.circle_box}>
        <img src={circle} className={style.circle}></img>
        <span>选项2</span>
      </div>
    </div>
  </div>
)

// 时间题
const timeContent = (
  <div className={style.content}>
      <h1 className={style.question_title}>时间题</h1>
      <p className={style.p}>用于收集时刻或时长，如预约时间、工作时长收集等。</p>
      <h1 className={style.question_title}>1. 请选择时间</h1>
      <p className={style.gapfill_input}>
        <img src={clockIcon} className={style.input_icon}></img>
        请输入
      </p>
  </div>
)

const getContent = (type: TProblemType) => {
  switch (type) {
    case 'input': {
      return InputContent
    }
    case 'singleSelect': {
      return singleContent
    }
    case 'multiSelect': {
      return MultipleContent
    }
    case 'pullSelect': {
      return pullContent
    }
    case 'date': {
      return DateContent
    }
    case 'time': {
      return timeContent
    }
    case 'score': {
      return scoreContent
    }
    default:{
      return ''
    }
  }
}

const getImg = (type: TProblemType) => {
  switch (type) {
    case 'input': {
      return gapFill
    }
    case 'singleSelect': {
      return singleChoice
    }
    case 'multiSelect': {
      return multiple
    }
    case 'pullSelect': {
      return dropdown
    }
    case 'date': {
      return date
    }
    case 'time': {
      return time
    }
    case 'score': {
      return starIcon
    }
    default: {
      return ''
    }
  }
}

const createTitle = (type: TProblemType) => {
  switch (type) {
    case 'input': {
      return '请输入内容'
    }
    case 'date': {
      return '请选择日期'
    }
    case 'time': {
      return '请选择时间'
    }
    case 'score': {
      return '请打分'
    }
    case 'singleSelect': {
      return '请选择一个选项'
    }
    case 'multiSelect': {
      return '请选择一个或多个选项'
    }
    case 'pullSelect': {
      return '请选择一个选项'
    }
    default: {
      return ''
    }
  }
}

interface Props {
  type: TProblemType,
  title: string
}
export default function BaseBtn ({ type, title }: Props) {
  const { addQuestion } = useQuestions()
  return (
    <Popover content={getContent(type)} placement="right" trigger="hover">
      <Button className={style.btn} onClick={() => addQuestion(type, createTitle(type))}>
        <img src={getImg(type)} className={style.questionImg}></img>
        {title}
      </Button>
    </Popover>
  )
}
