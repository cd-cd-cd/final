import { Input } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useLocal from '../../../hooks/useLocal'
import leftIcon from '../../../assets/imgs/left.svg'
import rightIcon from '../../../assets/imgs/right.svg'
import nodataIcon from '../../../assets/imgs/nodata.png'
import style from './index.module.scss'
import { formResult } from '../../../api/form'
import { singleList, item, EFormStatus } from '../../../libs/model'
import ResForm from '../../../components/ResForm'
interface IState {
  id: string,
  title: string,
  status: EFormStatus
}
export default function Analysis () {
  const { getState } = useLocal()
  const [infos, setInfos] = useState<singleList>()
  const [items, setItems] = useState<item[]>()
  const [form, setForm] = useState<item>()
  // 记录页数
  const [value, setValue] = useState(1)
  // 获取表单填写情况
  const getFormFill = async (formId: string) => {
    const res = await formResult(formId)
    if (res) {
      setInfos(res.data.info)
      setItems(res.data.items)
      setForm(res.data.items[0])
    }
  }

  // 页数变化
  const pageChange = (value: string) => {
    // 如果不是数字自动返回第一页
    if (isNaN(Number(value))) {
      setValue(1)
    } else if (Number(value) < 0) {
      setValue(1)
    } else if (Number(value) >= ((items as item[]).length)) {
      setValue((items as item[]).length)
    } else {
      setValue(Number(value))
    }
  }

  // backspace
  const back = (code: number) => {
    if (code === 8) {
      setValue(0)
    }
  }
  // 失去焦点
  const blur = () => {
    if (value === 0) {
      setValue(1)
      setForm(items![0])
    } else {
      setForm(items![value - 1])
    }
  }
  // 向左翻页
  const toLeft = () => {
    if (value > 1) {
      setValue(value - 1)
      setForm(items![value - 2])
    }
  }
  // 向右翻页
  const toRight = () => {
    if (value < (items as item[]).length) {
      setValue(value + 1)
      setForm(items![value])
    }
  }

  // 得到数据/刷新
  const getData = () => {
    const id = getState(state).id
    if (id) {
      getFormFill(id)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const state = useLocation().state as IState

  return (
    <div className={style.back}>
      {!items?.length
        ? <div className={style.data_box}>
          <img src={nodataIcon} className={style.nodata}></img>
          <div className={style.span}>暂无收集结果</div>
          <Link to='/detail/share' className={style.link}>邀请填写</Link>
        </div>
        : <Fragment>
          <h1 className={style.h1}>共收集{items?.length}份数据(正在收集)</h1>
          {/* 分页 */}
          <div className={style.pagination_box}>
            <div className={style.page} onClick={() => toLeft()}>
              <img src={leftIcon} className={style.icon}></img>
            </div>
            <span>第</span>
            <Input
              className={style.input}
              bordered={false}
              value={value}
              onKeyDown={(e) => back(e.keyCode) }
              onChange={(e) => pageChange(e.target.value) }
              onBlur={() => blur()}
            ></Input>
            <div>份</div>
            <div className={style.page} onClick={() => toRight()}>
              <img src={rightIcon} className={style.icon}></img>
            </div>
          </div>
          <ResForm form={form} time={infos?.ctime} title={infos?.title}></ResForm>
        </Fragment>
      }
    </div>
  )
}
