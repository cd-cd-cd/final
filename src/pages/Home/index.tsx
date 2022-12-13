import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Table, Tag } from 'antd'
import dayjs from 'dayjs'
import HeaderUser from '../../components/HeaderUser'
import useForm from '../../hooks/useForm'
import { EFormStatus, singleList, IDataSource } from '../../libs/model'
import { list } from '../../api/form'
import StarIcon from '../../assets/imgs/star.png'
import CollectStarIcon from '../../assets/imgs/collectStar.png'
import logo from '../../assets/imgs/logo.svg'
import style from './index.module.scss'
const { Column } = Table

export default function Home () {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(9)
  const [total, setTotal] = useState(100)
  const [isStar, setIsStar] = useState(false)
  const [dataSource, setDataSource] = useState<singleList[]>()
  const [loading, setLoading] = useState(false)
  const { release, deleteSingle, star, deleteStar, editForm, endList } = useForm()
  const navigator = useNavigate()

  const paginationConfig = () => {
    return {
      simple: true,
      current: pageIndex,
      pageSize,
      total,
      onChange: (page: number) => {
        setPageIndex(page)
      },
      hideOnSinglePage: false,
      showSizeChanger: false
    }
  }

  // 获取数据
  const getList = async (pageIndex: number, pageSize: number, isStar?: boolean) => {
    setLoading(true)
    const res = await list(pageIndex - 1, pageSize, isStar)
    if (res) {
      setTotal(res.data.total)
      setLoading(false)
      // 更改数据
      const data = JSON.parse(JSON.stringify(res.data.items)) as IDataSource[]
      const newData: IDataSource[] = data.map(item => {
        item.key = item.id
        item.time = dayjs(item.ctime).format('YYYY-MM-DD HH:mm:ss')
        return item
      }
      )
      setDataSource(newData)
    }
  }
  // 刷新数据
  const refresh = (star?: boolean) => {
    getList(pageIndex, pageSize, star)
  }

  useEffect(() => {
    if (isStar === true) {
      getList(pageIndex, pageSize, isStar)
    } else {
      getList(pageIndex, pageSize)
    }
  }, [pageIndex])

  // 显示状态
  const getStatus = (status: EFormStatus) => {
    switch (status) {
      case 2:
        return (
          <Tag color='green'>
            草稿
          </Tag>)
      case 3:
        return (
          <Tag color='blue'>
            收集
          </Tag>)
      case 4:
        return (
          <Tag color='red'>
            结束
          </Tag>)
    }
  }
  // 显示操作
  const returnAction = (status: EFormStatus, id: string, title: string) => {
    switch (status) {
      case 2:
        return (
          <Fragment>
            <Button size='small' className={style.action_btn} onClick={() => { release(id); refresh() }}>发布</Button>
            <Button size='small' className={style.action_btn} onClick={() => editForm(id)}>编辑</Button>
            <Button size='small' className={style.action_btn} onClick={() => { deleteSingle(id); refresh() }}>删除</Button>
          </Fragment>
        )
      case 3:
        return (
          <Fragment>
            <Button size='small' className={style.action_btn}
              onClick={() =>
                navigator('/detail/share',
                  {
                    replace: false,
                    state: {
                      id,
                      title,
                      status
                    }
                  }
                )}
            >分享</Button>
            <Button size='small' className={style.action_btn}
              onClick={() =>
                navigator('/detail/analysis',
                  {
                    replace: false,
                    state: {
                      id,
                      title,
                      status
                    }
                  }
                )}
            >查看结果</Button>
            <Button size='small' className={style.action_btn} onClick={() => { endList(id); refresh() }}>停止</Button>
            <Button size='small' className={style.action_btn} onClick={() => { deleteSingle(id); refresh() }}>删除</Button>
          </Fragment>
        )
      case 4:
        return (
          <Fragment>
            <Button size='small'
              className={style.action_btn}
              onClick={() =>
                navigator('/detail/analysis',
                  {
                    replace: false,
                    state: {
                      id,
                      title,
                      status
                    }
                  }
                )}
            >查看结果</Button>
            <Button size='small' className={style.action_btn} onClick={() => { deleteSingle(id); refresh() }}>删除</Button>
          </Fragment>
        )
    }
  }
  // 显示收藏
  const returnCollect = (isStar: boolean, id: string) => {
    if (isStar === true) {
      return <img src={CollectStarIcon} className={style.starIcon} onClick={() => { deleteStar(id); refresh() }}></img>
    } else {
      return <img src={StarIcon} className={style.starIcon} onClick={() => { star(id); refresh() }}></img>
    }
  }

  const returnShowStar = () => {
    if (isStar) {
      return <div className={style.star_box_isStar} onClick={() => { setIsStar(false); setPageIndex(1); getList(pageIndex, pageSize) }}>仅展示星标</div>
    } else {
      return <div className={style.star_box_unStar} onClick={() => { setIsStar(true); setPageIndex(1); getList(pageIndex, pageSize, true) }}>仅展示星标</div>
    }
  }

  return (
    <div className={style.home}>
      <header className={style.header}>
        <div className={style.header_left}>
          <img src={logo} className={style.logo}></img>
          <span className={style.span}>金山表单</span>
        </div>
        <HeaderUser></HeaderUser>
      </header>
      <div className={style.aside_main}>
        <aside className={style.aside}>
          <Button
            type='primary'
            className={style.add_list_btn}
          >
            <Link to='/form' >新建表单</Link>
          </Button>
          <div className={style.list}>表单列表</div>
        </aside>
        <main>
          <div className={style.star_box}>
            {returnShowStar()}
          </div>
          <Table
            loading={loading}
            style={{ cursor: 'pointer' }}
            dataSource={dataSource}
            pagination={paginationConfig()}>
            <Column width={200} align='center' title='表单名称' dataIndex='title' key='data'></Column>
            <Column width={200} align='center' title='创建时间' dataIndex='time' key='ctime'></Column>
            <Column width={150} align='center' title='状态' dataIndex='reStatus' key='reStatus'
              render={(_, record: IDataSource) =>
                getStatus(record.status)
              }
            ></Column>
            <Column width={150} align='center' dataIndex='star' key='star'
              render={(_, record: IDataSource) =>
                returnCollect(record.isStar, record.id)
              }
            ></Column>
            <Column title='操作' dataIndex='action' key='action'
              align='center'
              render={(_, record: IDataSource) =>
                returnAction(record.status, record.id, record.title)
              }
            ></Column>
          </Table>
        </main>
      </div>
    </div >
  )
}
