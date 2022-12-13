import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, message } from 'antd'
import QRCode from 'qrcode.react'
import copy from 'copy-to-clipboard'
import useLocal from '../../../hooks/useLocal'
import { EFormStatus } from '../../../libs/model'
import logo from '../../../assets/imgs/logo.svg'
import downIcon from '../../../assets/imgs/down.svg'
import style from './index.module.scss'

interface IState {
  id: string,
  title: string,
  status: EFormStatus
}

export default function Share () {
  const { getState } = useLocal()
  const state = useLocation().state as IState

  // 复制url
  const copyUrl = () => {
    copy(`${process.env.REACT_APP_Fill}?id=${getState(state).id}`)
    message.success('复制成功')
  }

  // 下载二维码
  const clickDownload = () => {
    const Qr = document.getElementById('qrCode')! as HTMLCanvasElement
    const a = document.createElement('a')
    a.download = '二维码'// 设置下载的文件名
    a.href = Qr.toDataURL('image/png')
    document.body.appendChild(a)
    a.click()
    a.remove()// 下载之后把创建的元素删除
  }

  return (
    <div className={style.back}>
      <div className={style.qr_box}>
        <div className={style.title}>{getState(state).title}</div>
        <QRCode
          id='qrCode'
          value={getState(state).status === 3 ? `${process.env.REACT_APP_Fill}?id=${getState(state).id}` : '表单已收集结束'}
          imageSettings={{ // 二维码中间的logo图片
            src: logo,
            height: 22,
            width: 22,
            excavate: true // 中间图片所在的位置是否镂空
          }}
        />
        <div className={style.extra}>微信扫码或长按识别，填写内容</div>
      </div>
      <div className={style.down_qr} onClick={() => clickDownload()}>
        <a>下载二维码</a>
      </div>
      <Button className={style.btn_link} onClick={() => copyUrl()}>
        <img src={downIcon} className={style.downIcon}></img>
        复制链接
      </Button>
    </div>
  )
}
