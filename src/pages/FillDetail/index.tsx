import { LeftOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import HeaderUser from '../../components/HeaderUser'
import useLocal from '../../hooks/useLocal'
import { EFormStatus } from '../../libs/model'
import style from './index.module.scss'

interface IState {
  id: string,
  title: string,
  status: EFormStatus
}
export default function FillDetail () {
  const navigator = useNavigate()
  const { getState } = useLocal()
  const path = useLocation().pathname
  const state = useLocation().state as IState

  useEffect(() => {
    getState(state)
  }, [])
  return (
    <div className={style.back}>
      <header className={style.header}>
        <div className={style.header_left} onClick={() => navigator('/home')}>
          <LeftOutlined />
          <span className={style.span}>{getState(state).title}</span>
        </div>
        <HeaderUser></HeaderUser>
      </header>
      <nav className={style.nav}>
        <div className={style.nav_box}>
          <NavLink to='/detail/analysis' className={path === '/detail/analysis' ? style.link_click : style.link}>表单统计&分析</NavLink>
          <NavLink to='/detail/question' className={path === '/detail/question' ? style.link_click : style.link}>表单问题</NavLink>
          <NavLink to='/detail/share' className={path === '/detail/share' ? style.link_click : style.link}>分享</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
