import React from 'react'
import HeaderForm from '../../components/HeaderForm'
import CreateLeft from './CreateLeft'
import CreateMiddle from './CreateMiddle'
import CreateRight from './CreateRight'
import logo from '../../assets/imgs/logo.svg'
import style from './index.module.scss'

export default function NewForm () {
  return (
    <div className={style.newForm}>
      <HeaderForm></HeaderForm>
      <div className={style.main}>
        <CreateLeft></CreateLeft>
        <CreateMiddle></CreateMiddle>
        <CreateRight></CreateRight>
      </div>
      <div className={style.footer}>
      <div className={style.footer_top}>
        <img src={logo} className={style.logo}></img>
        <span>金山表单</span>
      </div>
      <div className={style.footer_bottom}>
        <span>百万数据收集量</span>
        <span>|</span>
        <span>可视化结果分析</span>
      </div>
    </div>
    </div>
  )
}
