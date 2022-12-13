import React, { Fragment, useState } from 'react'
import { TProblemType } from '../../../libs/model'
import style from '../index.module.scss'
import './index.css'
import { Button, Popover, Modal, message } from 'antd'
import { deleteStar } from '../../../api/problem'
import useStar from '../../../hooks/useStar'
import useStarList from '../../../hooks/useListStar'

interface Props {
  title: string
  type: TProblemType
  id: string
}

export default function StarBtn ({ title, type, id }: Props) {
  const { addStarQuestion } = useStar()
  const { refreshStar } = useStarList()
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const deleteContent = (
    <div className={style.deleteStar} onClick={showModal}>删除</div>
  )

  const deleteStarQues = async () => {
    const res = await deleteStar(id)
    if (res) {
      message.success('删除成功')
    }
  }

  const handleOk = () => {
    setConfirmLoading(true)
    deleteStarQues()
    setVisible(false)
    message.info('删除成功')
    refreshStar()
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <Fragment>
      <Popover content={deleteContent} placement="right" trigger="hover">
        <Button className={style.star_btn} onClick={() => addStarQuestion(id)}>
          {title}
        </Button>
      </Popover>
      <Modal
        title="删除常用题"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>删除后，创建表单时无法再使用该题进行快速创建，是否删除</p>
      </Modal>
    </Fragment>
  )
}
