import React from 'react'
import style from './index.module.scss'
export default function LoginHeader () {
  return (
    <div className={style.wrap}>
      <div className={style.head}>
        <div className={style.head_logo}>
          <span className={style.logo}></span>
        </div>
      </div>
    </div>
  )
}
